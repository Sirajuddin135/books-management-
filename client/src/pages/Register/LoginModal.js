import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { ToastContainer, toast } from 'react-toastify';

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

    const handleLogin = (event) => {
        event.preventDefault();
        // handle login logic
        if (registerData.find(user => user.email === email && user.password === password)) {
            // setUserName(`${firstName} ${lastName}`);
            // handleLoginSignup(userName);
            toast.success('Login successful');
            return;
        }

        toast.error('Invalid details');
    };

    const handleShowRegisterForm = () => {
        setShowRegisterForm(true);
    };

    const handleHideRegisterForm = () => {
        setShowRegisterForm(false);
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
