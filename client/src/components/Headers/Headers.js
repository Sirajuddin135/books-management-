import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import LoginModal from '../../pages/Register/LoginModal';
import { Button } from 'react-bootstrap';

const Headers = ({ isAuthenticated }) => {

    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleShowLoginModal = () => {
        setShowLoginModal(true);
    };

    const handleHideLoginModal = () => {
        setShowLoginModal(false);
    };

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
                    <Link to='/home'>Home</Link>
                    <Link to='/home'>My Masajid</Link>
                    <Link to='/home'>Masajid</Link>
                </>) : (<>
                    {/* <Link to='/login'>Login</Link> */}
                    {/* <Link onClick={handleShowLoginModal}>Login</Link>
                    {showLoginModal ? <Login onHide={handleHideLoginModal} /> : null} */}
                    {/* <Link to='/register'>Register</Link> */}

                    <Button variant="primary" onClick={handleShowLoginModal}>
                        Login
                    </Button>
                    {showLoginModal && <LoginModal onHide={handleHideLoginModal} />}
                </>)
            }
        </nav>
    )
}

export default Headers;