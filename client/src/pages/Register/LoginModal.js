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

    const handleShowRegisterForm = () => {
        setShowRegisterForm(true);
    };

    const handleHideRegisterForm = () => {
        setShowRegisterForm(false);
    };

    const handleLogin = (event) => {
        event.preventDefault();

        if (registerData.find(user => user.email === email && user.password === password)) {
            toast.success('Login successful');
            localStorage.setItem('loginData', JSON.stringify({ email, password }));
            localStorage.setItem('isAuthenticated', true);
            window.location.href = '/';
        } else if (registerData.find(user => user.email === email && user.password !== password)) {
            toast.error('Invalid password');
        } else {
            toast.error('Please create an account!!!');
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
