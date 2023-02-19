import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

function RegisterForm(props) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [mobile, setMobile] = useState('');
    const [location, setLocation] = useState('');
    const [userName, setUserName] = useState('');
    const registerData = JSON.parse(localStorage.getItem('registerData')) || [];

    const [userData, setUserData] = useState({
        fname: '',
        lname: '',
        email: '',
        mobile: '',
        location: '',
        password: ''
    });

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

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Store the registration data in local storage
    //     const data = {
    //         firstName,
    //         lastName,
    //         email,
    //         password,
    //         role,
    //         mobile,
    //         location,
    //     };
    //     localStorage.setItem('registrationData', JSON.stringify(data));
    //     alert('You have successfully registered!');
    //     props.onSwitchToLogin();
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = { firstName, lastName, email, password, role, mobile, location };

        if (firstName.length < 4) {
            toast.error('First name length should be more than 4 characters !');
        } else if (lastName === '') {
            toast.error('Last name is required !');
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            toast.error('Enter a valid email !');
        } else if (!/^[6-9][0-9]{9}$/.test(mobile)) {
            toast.error('Invalid mobile number, it should start with 6, 7, 8 or 9 and have 10 digits');
        } else if (role === '') {
            toast.error('Select a role !');
        } else if (location === '') {
            toast.error('Location is required !');
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(password)) {
            toast.error('Password must be min 8 and max 16 chars long and contain at least one letter, one number, and one special character');
        } else {

            if (registerData.find(user => user.email === userData.email || user.mobile === userData.mobile)) {
                setUserName(`${firstName} ${lastName}`);
                // handleLoginSignup(userName);
                toast.error('User already registered');
                return;
            }

            registerData.push(userData);

            localStorage.setItem('registerData', JSON.stringify(registerData));
            setUserName(`${firstName} ${lastName}`);
            // handleLoginSignup(userName);
            toast.success('Registration successful');
            props.onSwitchToLogin();
        }
    }

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
            <ToastContainer position='top-center' />
        </Form>
    );
}

export default RegisterForm;
