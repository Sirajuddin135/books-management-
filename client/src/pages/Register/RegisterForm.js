import { useEffect, useState } from 'react';
import { Form, Button, Row, Card, ToastContainer } from 'react-bootstrap';
import Select from 'react-select';
import { toast } from 'react-toastify';

function RegisterForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRegister = (event) => {
        event.preventDefault();
        // handle register logic
    };

    // return (
    //     <Form onSubmit={handleRegister}>
    //         <Form.Group controlId="formEmail">
    //             <Form.Label>Email address</Form.Label>
    //             <Form.Control
    //                 type="email"
    //                 placeholder="Enter email"
    //                 value={email}
    //                 onChange={handleEmailChange}
    //             />
    //         </Form.Group>
    //         <Form.Group controlId="formPassword">
    //             <Form.Label>Password</Form.Label>
    //             <Form.Control
    //                 type="password"
    //                 placeholder="Password"
    //                 value={password}

    //                 onChange={handlePasswordChange}
    //             />
    //         </Form.Group>
    //         <Button variant="primary" type="submit">
    //             Register
    //         </Button>
    //         <p>
    //             Already have an account?{' '}
    //             <a href="#" onClick={props.onHide}>
    //                 Login
    //             </a>
    //         </p>
    //     </Form>
    // );
    const registerData = JSON.parse(localStorage.getItem('registerData')) || [];

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
    const [userName, setUserName] = useState('');

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
    const setImageData = async (e) => {
        setImage(e.target.files[0]);
    }

    useEffect(() => {
        if (image) {
            setPreview(URL.createObjectURL(image));
        }
    }, [image]);

    // submit user data
    const handleSubmit = (e) => {
        e.preventDefault();

        const { fname, lname, email, mobile, location, password } = userData;

        if (fname.length < 4) {
            toast.error('First name length should be more than 4 characters !');
        } else if (lname === '') {
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
                setUserName(`${fname} ${lname}`);
                // handleLoginSignup(userName);
                toast.error('User already registered');
                return;
            }

            registerData.push(userData);

            localStorage.setItem('registerData', JSON.stringify(registerData));
            setUserName(`${fname} ${lname}`);
            // handleLoginSignup(userName);
            toast.success('Registration successful');
        }
    }

    // return (
    //     <>
    //         {/* <div className="container"> */}
    //         <h2 className="text-center mt-1">Register your details</h2>
    //         {/* <Card className='shadow mt-3 p-3'>
    //                 <div className="profile_div text-center">
    //                     <img src={preview ? preview : "/person.jpg"} alt="Profile" />
    //                 </div> */}
    //         {/* <Form> */}
    //         {/* <Row> */}
    //         <Form.Group className="mb-3 col-lg-6">
    //             <Form.Label>First Name</Form.Label>
    //             <Form.Control type="fname" id='fname' name="fname" value={userData.fname} placeholder="Enter first name" onChange={setInputValue} />
    //         </Form.Group>
    //         <Form.Group className="mb-3 col-lg-6">
    //             <Form.Label>Last Name</Form.Label>
    //             <Form.Control type="lname" name="lname" id="lname" value={userData.lname} placeholder="Enter last name" onChange={setInputValue} />
    //         </Form.Group>
    //         <Form.Group className="mb-3 col-lg-6">
    //             <Form.Label>Email address</Form.Label>
    //             <Form.Control type="email" name="email" id="email" value={userData.email} placeholder="Enter email" onChange={setInputValue} />
    //         </Form.Group>
    //         <Form.Group className="mb-3 col-lg-6">
    //             <Form.Label>Mobile Number</Form.Label>
    //             <Form.Control type="mobilenumber" name="mobile" id="mobile" value={userData.mobile} placeholder="Enter mobile number" onChange={setInputValue} />
    //         </Form.Group>
    //         <Form.Group className="mb-3 col-lg-6">
    //             <Form.Label>Select Role</Form.Label>
    //             <Select options={role_options} onChange={setRoleValue} />
    //         </Form.Group>
    //         <Form.Group className="mb-3 col-lg-6">
    //             <Form.Label>Select Your Profile</Form.Label>
    //             <Form.Control type='file' name='user_profile' id='user_profile' placeholder='Select Your Profile' onChange={setImageData} />
    //         </Form.Group>
    //         <Form.Group className="mb-3 col-lg-6">
    //             <Form.Label>Enter your location</Form.Label>
    //             <Form.Control type='location' name='location' id='location' value={userData.location} placeholder='Enter your location' onChange={setInputValue} />
    //         </Form.Group>
    //         {/* <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
    //                                 <Form.Label>Select your role</Form.Label>
    //                                 <Form.Check
    //                                     type={'radio'}
    //                                     label={'Male'}
    //                                     name='gender'
    //                                     value={'Male'}
    //                                 />
    //                                 <Form.Check
    //                                     type={'radio'}
    //                                     label={'Female'}
    //                                     name='gender'
    //                                     value={'Female'}
    //                                 />
    //                             </Form.Group> */}
    //         <Form.Group className="mb-3 col-lg-6">
    //             <Form.Label>Password</Form.Label>
    //             <Form.Control type="password" name='password' id='password' value={userData.password} placeholder="Enter password" onChange={setInputValue} />
    //         </Form.Group>
    //         <Button variant="primary" type="submit" onClick={handleSubmit}>
    //             Submit
    //         </Button>
    //         {/* </Row> */}
    //         {/* </Form> */}
    //         {/* </Card> */}
    //         <ToastContainer position='top-center' />
    //         {/* </div> */}
    //     </>
    // )

    return (
        <Form onSubmit={props.onSubmit}>
            <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={props.email}
                    onChange={props.onEmailChange}
                />
            </Form.Group>
            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={props.password}
                    onChange={props.onPasswordChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
            <p>
                Already have an account?{' '}
                <a href="/login" onClick={props.onShowRegisterForm}>
                    Login
                </a>
            </p>
        </Form>
    );
}

export default RegisterForm;
