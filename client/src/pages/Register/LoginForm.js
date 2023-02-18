import { Form, Button, Modal } from 'react-bootstrap';

function LoginForm(props) {
    return (
        <Form onSubmit={props.onSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
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
                <a href="#" onClick={props.onShowRegisterForm}>
                    Register
                </a>
            </p>
        </Form>
    );
}

export default LoginForm;
