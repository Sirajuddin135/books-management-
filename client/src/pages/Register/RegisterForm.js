import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';

function RegisterForm(props) {
    // const [role, setRole] = useState('');
    // const [image, setImage] = useState('');
    // const [preview, setPreview] = useState('');
    // const [userName, setUserName] = useState('');
    let registerData = JSON.parse(localStorage.getItem('registerData')) || [];

    // role options
    const role_options = [
        { value: 'Imam', label: 'Imam' },
        { value: 'Muazzin', label: 'Muazzin' },
        { value: 'Committee Member', label: 'Committee Member' },
        { value: 'Musalli', label: 'Musalli' }
    ]

    let [userData, setUserData] = useState({
        fname: '',
        lname: '',
        email: '',
        mobile: '',
        location: '',
        password: '',
        role: ''
    });

    // set user data
    const setInputValue = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    // set role value
    const setRoleValue = (e) => {
        // setRole(e.value);
        setUserData({ ...userData, 'role': e.value });
    }

    // set image
    // const setImageData = async (e) => {
    //     setImage(e.target.files[0]);
    // }

    // useEffect(() => {
    //     if (image) {
    //         setPreview(URL.createObjectURL(image));
    //     }
    // }, [image]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const { fname, lname, email, mobile, location, password, role } = userData;

        if (fname.length < 4) {
            toast.error('First name length should be more than 4 characters !');
        } else if (lname === '') {
            toast.error('Last name is required !');
        } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            toast.error('Enter a valid email !');
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/.test(password)) {
            toast.error('Password must be min 8 and max 16 chars long and contain at least one letter, one number, and one special character');
        } else if (role === '') {
            toast.error('Select a role !');
        } else if (!/^[6-9][0-9]{9}$/.test(mobile)) {
            toast.error('Invalid mobile number, it should start with 6, 7, 8 or 9 and have 10 digits');
        } else if (location === '') {
            toast.error('Location is required !');
        } else {

            if (registerData.find(user => user.email === userData.email || user.mobile === userData.mobile)) {
                // setUserName(`${fname} ${lname}`);
                toast.error('User already registered');
                return;
            }

            registerData.push(userData);
            localStorage.setItem('registerData', JSON.stringify(registerData));
            // setUserName(`${fname} ${lname}`);
            toast.success('Registration successful');
            props.onHide();
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    id='fname'
                    name='fname'
                    placeholder="Enter first name"
                    value={userData.fname}
                    onChange={setInputValue}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    id='lname'
                    name='lname'
                    placeholder="Enter last name"
                    value={userData.lname}
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
                    id='mobile'
                    name='mobile'
                    placeholder="Enter mobile number"
                    value={userData.mobile}
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
                <a href="" onClick={props.onHide}>
                    Login
                </a>
            </p>
            <ToastContainer position='top-center' />
        </Form>
    );
}

export default RegisterForm;
