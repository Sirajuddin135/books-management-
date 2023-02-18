import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

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

    const handleLogin = (event) => {
        event.preventDefault();
        // handle login logic
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
        </Modal>
    );
}

export default LoginModal;
