import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = (event) => {
        event.preventDefault();
        // handle login logic

        const registerData = JSON.parse(localStorage.getItem('registerData')) || [];

        // if (registerData.length > 0) {
        //     if (registerData.find(user => user.email === ))
        // }
    };

    return (
        <Modal show={true} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <Form onSubmit={handleLogin}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form> */}
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
                        Don't have an account?{' '}
                        <a href="/register" onClick={props.onShowRegisterForm}>
                            Register
                        </a>
                    </p>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <p>Don't have an account? <Link to='/register'>Register</Link></p>
            </Modal.Footer>
        </Modal>
    );

    // return (
    //     <Form onSubmit={props.onSubmit}>
    //         <Form.Group controlId="formEmail">
    //             <Form.Label>Email address</Form.Label>
    //             <Form.Control
    //                 type="email"
    //                 placeholder="Enter email"
    //                 value={props.email}
    //                 onChange={props.onEmailChange}
    //             />
    //         </Form.Group>
    //         <Form.Group controlId="formPassword">
    //             <Form.Label>Password</Form.Label>
    //             <Form.Control
    //                 type="password"
    //                 placeholder="Password"
    //                 value={props.password}
    //                 onChange={props.onPasswordChange}
    //             />
    //         </Form.Group>
    //         <Button variant="primary" type="submit">
    //             Login
    //         </Button>
    //         <p>
    //             Don't have an account?{' '}
    //             <a href="/register" onClick={props.onShowRegisterForm}>
    //                 Register
    //             </a>
    //         </p>
    //     </Form>
    // );
}

export default Login;