import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

const signupUrl = 'https://7n0b1juemf.execute-api.us-east-1.amazonaws.com/prod_patient/signup';

const Signup = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [gender, setGender] = useState('');
    const [type, setType] = useState('');
    const [phone, setPhone] = useState('');
    const [alert, setAlert] = useState(null);
    const [show, setShow] = useState(true);

    const submitHandler = (event) => {
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
            password: password,
            name: name,
            type: type,
            phone: phone,
            gender: gender
        }

        axios.post(signupUrl, requestBody, requestConfig).then(response => {
            setAlert('Registration Successful');
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
            <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        onChange={event => setUsername(event.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={event => setPassword(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        onChange={event => setName(event.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Account Type</Form.Label>
                    <Form.Control
                        as="select"
                        custom
                        onChange={event => setType(event.target.value)}>
                        <option>Please Select Type of Account You Want to Register</option>
                        <option value="Patient">Patient</option>
                        <option value="Doctor">Doctor</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                        as="select"
                        custom
                        onChange={event => setGender(event.target.value)}>
                        <option>Please Select Your Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your phone number"
                        onChange={event => setPhone(event.target.value)} />
                </Form.Group>

                <Button className="button" variant="primary" type="submit">
                    Signup
                </Button>

                <Button className="button" onClick={() => setShow(true)}>Show Alert</Button>
            </Form>
            {alert && show && <Alert className="alert" variant="warning" onClose={() => setShow(false)} dismissible>{alert}</Alert>}
        </div>

    )
}

export default Signup;