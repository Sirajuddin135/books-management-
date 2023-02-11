import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import './register.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';

const Register = () => {

    // user details
    const [userData, setUserData] = useState({
        fname: '',
        lname: '',
        email: '',
        mobile: '',
        gender: '',
        location: ''
    });

    const [role, setRole] = useState('Committee Member');
    const [userImage, setUserImage] = useState('');

    // set input value
    const setInputValue = (e) => {
        name: `${e.target.value}`
    }

    // role options
    const role_options = [
        { value: 'Imam', label: 'Imam' },
        { value: 'Muazzin', label: 'Muazzin' },
        { value: 'Committee Member', label: 'Committee Member' },
        { value: 'Muqtadi', label: 'Muqtadi' }
    ]

    return (
        <>
            <div className="container">
                <h2 className="text-center mt-1">Register your details</h2>
                <Card className='shadow mt-3 p-3'>
                    <div className="profile_div text-center">
                        <img src="/person.jpg" alt="Profile" />
                    </div>
                    <Form>
                        <Row>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="fname" placeholder="Enter first name" onChange={setInputValue} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="lname" placeholder="Enter last name" onChange={setInputValue} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={setInputValue} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control type="mobilenumber" placeholder="Enter mobile number" onChange={setInputValue} />
                            </Form.Group>
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Select Role</Form.Label>
                                <Select options={role_options} />
                            </Form.Group>
                            {/* <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Select Your Profile</Form.Label>
                                <Form.Control type='file' name='user_profile' placeholder='Select Your Profile'></Form.Control>
                            </Form.Group> */}
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Enter your location</Form.Label>
                                <Form.Control type='location' name='location' placeholder='Enter your location' onChange={setInputValue} />
                            </Form.Group>
                            {/* <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Select your role</Form.Label>
                                <Form.Check
                                    type={'radio'}
                                    label={'Male'}
                                    name='gender'
                                    value={'Male'}
                                />
                                <Form.Check
                                    type={'radio'}
                                    label={'Female'}
                                    name='gender'
                                    value={'Female'}
                                />
                            </Form.Group> */}
                            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" onChange={setInputValue} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Row>
                    </Form>

                </Card>
            </div>
        </>
    )
}

export default Register