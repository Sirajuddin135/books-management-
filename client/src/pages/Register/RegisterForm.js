import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';

function RegisterForm(props) {
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState('');
    // role options
    const role_options = [
        { value: 'Imam', label: 'Imam' },
        { value: 'Muazzin', label: 'Muazzin' },
        { value: 'Committee Member', label: 'Committee Member' },
        { value: 'Musalli', label: 'Musalli' }
    ];

    let [userData, setUserData] = useState({
        user_name: '',
        email: '',
        mobile_number: '',
        location: '',
        password: '',
        role: '',
        image: ''
    });

    // set user data
    const setInputValue = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    // set role value
    const setRoleValue = (e) => {
        setUserData({ ...userData, 'role': e.value });
    }

    // set image
    const setImageData = async (e) => {
        setImage(e.target.files[0]);
    }

    useEffect(() => {
        if (image) {
            setPreview(URL.createObjectURL(image));
        }
    }, [image]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const { user_name, email, mobile_number, location, password, role } = userData;

        if (user_name.length < 4) {
            toast.error('First name length should be more than 4 characters !');
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            toast.error('Enter a valid email !');
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(password)) {
            toast.error('Password must be min 8 and max 16 chars long and contain at least one letter, one number, and one special character');
        } else if (role === '') {
            toast.error('Select a role !');
        } else if (!/^[6-9][0-9]{9}$/.test(mobile_number)) {
            toast.error('Invalid mobile number, it should start with 6, 7, 8 or 9 and have 10 digits');
        } else if (location === '') {
            toast.error('Location is required !');
        } else {
            axios.post('http://localhost:4000/api/signup', userData)
                .then(res => {
                    toast.success('Registration successful');
                    props.onHide();
                })
                .catch(error => {
                    toast.error('User already registered');
                })
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    id='user_name'
                    name='user_name'
                    placeholder="Enter your name"
                    value={userData.user_name}
                    onChange={setInputValue}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    id='email'
                    name='email'
                    placeholder="Enter email"
                    value={userData.email}
                    onChange={setInputValue}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    id='password'
                    name='password'
                    placeholder="Password"
                    value={userData.password}
                    onChange={setInputValue}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Role</Form.Label>
                <Select options={role_options} onChange={setRoleValue} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                    type="tel"
                    id='mobile_number'
                    name='mobile_number'
                    placeholder="Enter mobile number"
                    value={userData.mobile_number}
                    onChange={setInputValue}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control
                    type="text"
                    id='location'
                    name='location'
                    placeholder="Enter location"
                    value={userData.location}
                    onChange={setInputValue}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Register
            </Button>
            <p>
                Don't have an account?{' '}
                <Link onClick={props.onHide}>
                    Login
                </Link>
            </p>
            <ToastContainer position='top-center' />
        </Form>
    );
}

export default RegisterForm;
