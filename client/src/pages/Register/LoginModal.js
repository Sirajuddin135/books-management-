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
        try {
            const response = await axios.post('http://localhost:4000/api/login', userData);
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
