import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function LoginModal(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const registerData = JSON.parse(localStorage.getItem('registerData')) || [];

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleShowRegisterForm = () => {
        setShowRegisterForm(true);
    };

    const handleHideRegisterForm = () => {
        setShowRegisterForm(false);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const userData = { "email": email, "password": password };

        // fetch(`http://localhost:4000/get-users?email=${email}&password=${password}`)
        // fetch('/http://localhost:4000/authenticate-user', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         email: email,
        //         password: password
        //     })
        // })
        //     .then(response => response.json())
        //     .then(data => console.log(data.data[0]))
        //     .catch(error => {
        //         console.error(error);
        //     });

        try {
            const response = await axios.post('http://localhost:4000/api/login', userData);
            // const user = response.data;

            // if (registerData.find(user => user.email === email && user.password === password)) {
            // if (user) {
            // console.log(response.data.data[0])
            // toast.success('Login successful');
            // localStorage.setItem('loginData', JSON.stringify({ email, password }));
            // localStorage.setItem('isAuthenticated', true);
            // window.location.href = '/';
            // } else if (registerData.find(user => user.email === email && user.password !== password)) {
            //     toast.error('Invalid password');
            // } else {
            //     toast.error('Please create an account!!!');
            // }
            const { jwtToken } = response.data;
            localStorage.setItem('jwtToken', JSON.stringify(jwtToken));
            toast.success('Login successful');
            window.location.href = '/';
        } catch (error) {
            toast.error("Invalid email or password")
        }


    };

    return (
        <Modal show={true} onHide={props.onHide}>
            {/* <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header> */}
            <Modal.Body>
                {showRegisterForm ? (
                    <RegisterForm onHide={handleHideRegisterForm} />
                ) : (
                    <LoginForm
                        email={email}
                        password={password}
                        onEmailChange={handleEmailChange}
                        onPasswordChange={handlePasswordChange}
                        onSubmit={handleLogin}
                        onShowRegisterForm={handleShowRegisterForm}
                    />
                )}
            </Modal.Body>
            <ToastContainer position='top-center' />
        </Modal>
    );
}

export default LoginModal;
