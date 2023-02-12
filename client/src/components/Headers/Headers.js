import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Headers = ({ userName }) => {

    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href={'http://localhost:3000/'}>Salah Time</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href={'http://localhost:3000/register'} style={{ color: 'white' }}>{userName ? (`${userName}`) : ("Login/Register")}</Nav.Link>
                        <Nav.Link href={'http://localhost:3000/home1'} style={{ color: 'white' }}>Home1</Nav.Link>
                        <Nav.Link href={'http://localhost:3000/profile/1'} style={{ color: 'white' }}>Profile</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Headers;