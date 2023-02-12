import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './edit.css';

const Edit = () => {

    // role options
    const role_options = [
        { value: 'Imam', label: 'Imam' },
        { value: 'Muazzin', label: 'Muazzin' },
        { value: 'Committee Member', label: 'Committee Member' },
        { value: 'Muqtadi', label: 'Muqtadi' }
    ]

    // user details
    const [userData, setUserData] = useState({
        fname: '',
        lname: '',
        email: '',
        mobile: '',
        location: '',
        password: ''
    });

    const [role, setRole] = useState('');
    const [image, setImage] = useState('');
    const [preview, setPreview] = useState('');

    // set user data
    const setInputValue = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    // set role value
    const setRoleValue = (e) => {
        setRole(e.value);
    }

    // set image
    const setImageData = (e) => {
        setImage(e.target.files[0]);
    }

    useEffect(() => {
        if (image) {
            setPreview(URL.createObjectURL(image));
        }
    }, [image]);

    // submit user data
    const submitUserData = (e) => {
        e.preventDefault();

        console.log(userData);
        const { fname, lname, email, mobile, location, password } = userData;

        if (fname.length < 4) {
            toast.error('First name is required !');
        } else if (lname === '') {
            toast.error('Last name is required !');
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            toast.error('Enter a valid email !');
        } else if (!/^[6-9][0-9]{9}$/.test(mobile)) {
            toast.error('Enter a valid mobile number !');
        } else if (role === '') {
            toast.error('Select a role !');
        } else if (location === '') {
            toast.error('Location is required !');
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
            toast.error('Password must be 8 digits long and contain at least one letter, one number, and one special character');
        } else {
            toast.success('Registration successful');
        }
    }

    return (
        <>
            <div className="container">
                <h2 className="text-center mt-1">Register your details</h2>
                <Card className='shadow mt-3 p-3'>
                    <div className="profile_div text-center">
                        <img src={preview ? preview : "/person.jpg"} alt="Profile" />
                    </div>
                    <Form>
                        <Row>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="fname" name="fname" value={userData.fname} placeholder="Enter first name" onChange={setInputValue} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="lname" name="lname" value={userData.lname} placeholder="Enter last name" onChange={setInputValue} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name="email" value={userData.email} placeholder="Enter email" onChange={setInputValue} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control type="mobilenumber" name="mobile" value={userData.mobile} placeholder="Enter mobile number" onChange={setInputValue} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Select Role</Form.Label>
                                <Select options={role_options} onChange={setRoleValue} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Select Your Profile</Form.Label>
                                <Form.Control type='file' name='user_profile' placeholder='Select Your Profile' onChange={setImageData} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Enter your location</Form.Label>
                                <Form.Control type='location' name='location' value={userData.location} placeholder='Enter your location' onChange={setInputValue} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name='password' value={userData.password} placeholder="Enter password" onChange={setInputValue} />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={submitUserData}>
                                Submit
                            </Button>
                        </Row>
                    </Form>
                </Card>
                <ToastContainer position='top-center' />
            </div>
        </>
    )
}

export default Edit