import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function RegisterForm(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [mobile, setMobile] = useState('');
    const [location, setLocation] = useState('');

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleMobileChange = (event) => {
        setMobile(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Store the registration data in local storage
        const data = {
            firstName,
            lastName,
            email,
            password,
            role,
            mobile,
            location,
        };
        localStorage.setItem('registrationData', JSON.stringify(data));
        alert('You have successfully registered!');
        props.onSwitchToLogin();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={handleFirstNameChange}
                />
            </Form.Group>

            <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={handleLastNameChange}
                />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </Form.Group>

            <Form.Group controlId="formBasicRole">
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" value={role} onChange={handleRoleChange}>
                    <option value="">Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicMobile">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter mobile number"
                    value={mobile}
                    onChange={handleMobileChange}
                />
            </Form.Group>

            <Form.Group controlId="formBasicLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={handleLocationChange}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Register
            </Button>
            <p>
                Don't have an account?{' '}
                <a href="#" onClick={props.onHide}>
                    Login
                </a>
            </p>
        </Form>
    );
}

export default RegisterForm;
