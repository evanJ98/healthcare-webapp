import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { setUserSession } from "../service/AuthService";
import { useNavigate } from 'react-router-dom';

const loginUrl = 'https://7n0b1juemf.execute-api.us-east-1.amazonaws.com/prod_patient/login';


const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(null);
    const [show, setShow] = useState(true);

    const loginHandler = event => {
        event.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            setAlert('Missing username or Password');
            return;
        }
        const requestConfig = {
            headers: {
                'x-api-key': 'xsYqKYScEw4ECsiRllIY152scKXjLhk1at0zjkjS'
            }
        }

        const requestBody = {
            username: username,
            password: password
        }

        axios.post(loginUrl, requestBody, requestConfig).then(response => {
            setUserSession(response.data.user, response.data.token);
            // setAlert('Login Successful');
            navigate('/patient');
        }).catch(error => {
            if (error.response.status === 401 || error.response.status === 403) {
                setAlert(error.response.data.message);
            }
            else {
                setAlert('Sorry, Server is Down. Please Try Again Later');
            }
        })
    }


    return (
        <div>
            <Form onSubmit={loginHandler}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        onChange={event => setUsername(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={event => setPassword(event.target.value)} />
                </Form.Group>

                <Button className="button" variant="primary" type="submit">
                    Log In
                </Button>

                <Button className="button" onClick={() => setShow(true)}>Show Alert</Button>
            </Form>
            {alert && show && <Alert className="alert" variant="warning" onClose={() => setShow(false)} dismissible>{alert}</Alert>}
        </div>
    )
}

export default Login;