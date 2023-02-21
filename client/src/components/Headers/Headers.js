import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import LoginModal from '../../pages/Register/LoginModal';
// import { Button } from 'react-bootstrap';
import './headers.css';

const Headers = () => {

    const [showLoginModal, setShowLoginModal] = useState(false);
    let isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));

    const handleShowLoginModal = () => {
        setShowLoginModal(true);
    };

    const handleHideLoginModal = () => {
        setShowLoginModal(false);
    };

    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/home1'>Masajid</Link>
            {isAuthenticated ?
                (<>
                    <Link to='/myMasajid'>My Masajid</Link>
                    <Link to='/profile/1'>My Profile</Link>
                </>) : (<>
                    <a className='log' variant="primary" onClick={handleShowLoginModal}>
                        Login
                    </a>
                    {showLoginModal && <LoginModal onHide={handleHideLoginModal} />}
                </>)
            }
        </nav>
    )
}

export default Headers;