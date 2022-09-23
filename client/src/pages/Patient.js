import React, { useState } from "react";
import { getUser, resetUserSession } from '../service/AuthService';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

const patientUrl = 'https://7n0b1juemf.execute-api.us-east-1.amazonaws.com/prod_patient/patient';

const Patient = () => {
    const navigate = useNavigate();
    const user = getUser();
    const name = user !== 'undefined' && user ? user.name : '';
    const [ppg, setPpg] = useState('');
    const [alert, setAlert] = useState(null);
    const [show, setShow] = useState(true);
    const logoutHandler = () => {
        resetUserSession();
        navigate('/login');
    }


    const predictHandler = (event) => {
        event.preventDefault();
        if (ppg.trim() === '') {
            setAlert('Please Enter Your PPG for Blood Pressure Prediction');
            return;
        }

        const requestConfig = {
            headers: {
                'x-api-key': 'xsYqKYScEw4ECsiRllIY152scKXjLhk1at0zjkjS'
            }
        }

        const requestBody = {
            username: user.username,
            ppg: ppg
        }

        axios.put(patientUrl, requestBody, requestConfig).then(response => {
            setAlert('Your Blood Pressure is: ');
        }).catch(error => {
            if (error.response.status === 401 || error.response.status === 403) {
                setAlert(error.response.data.message);
            }
            else {
                //setAlert(error.response.data.message);
                setAlert('Sorry, Server is Down. Please Try Again Later');
            }
        })
    }
    return (
        <div>
            Logged in as {name}.
            <Button className="button" onClick={logoutHandler}>
                Log Out
            </Button>
            <br />
            <Form onSubmit={predictHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>PPG</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Please Enter Your PPG"
                        onChange={event => setPpg(event.target.value)}
                    />
                </Form.Group>

                <Button className="button" variant="primary" type="submit">
                    Predict
                </Button>

                <Button className="button" onClick={() => setShow(true)}>Show Alert</Button>
            </Form>
            {alert && show && <Alert className="alert" variant="warning" onClose={() => setShow(false)} dismissible>{alert}</Alert>}
        </div>
    )
}

export default Patient;