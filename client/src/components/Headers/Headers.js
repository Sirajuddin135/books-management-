import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Headers = ({ isAuthenticated }) => {

    // const loginData = JSON.parse(localStorage.getItem('loginData')) || [];
    // const handleLogout = () => {
    //     handleLoggedIn();
    // }
    // const navigate = useNavigate();
    // const logout = (
    //     <div>
    //         {/* {loginData.length != 0 ? loginData[0].email : 'userName'} */}
    //         {userName}
    //         <Nav.Link style={{ color: 'white' }} onClick={handleLogout}>Logout</Nav.Link>
    //     </div>
    // );

    // return (
    //     <>
    //         <Navbar bg="primary" variant="dark">
    //             <Container>
    //                 <Navbar.Brand href={'http://localhost:3000/'}>Salah Time</Navbar.Brand>
    //                 <Nav className="me-auto">
    //                     <Nav.Link href={'http://localhost:3000/register'} style={{ color: 'white' }}>{isLoggedIn ? (logout) : ("Register")}</Nav.Link>
    //                     <Nav.Link href={'http://localhost:3000/login'} style={{ color: 'white' }}>{isLoggedIn ? (logout) : ("Login")}</Nav.Link>
    //                     <Nav.Link href={'http://localhost:3000/home1'} style={{ color: 'white' }}>Home1</Nav.Link>
    //                     <Nav.Link href={'http://localhost:3000/profile/1'} style={{ color: 'white' }}>Profile</Nav.Link>
    //                 </Nav>
    //             </Container>
    //         </Navbar>
    //     </>
    // )

    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/home1'>Masjid</Link>
            {isAuthenticated ?
                (<>
                    <Link to='/home1'>Masjid</Link>
                </>) : (<>
                    <Link to='/login'>Login</Link>
                    <Link to='/register'>Register</Link>
                </>)
            }
        </nav>
    )
}

export default Headers;