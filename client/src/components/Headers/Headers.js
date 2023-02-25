import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import LoginModal from '../../pages/Register/LoginModal';
import RegisterMasjid from '../../pages/Register/RegisterMasjid';
// import { Button } from 'react-bootstrap';
import './headers.css';

const Headers = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showMasjidModal, setShowMasjidModal] = useState(false);
    let isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
    const jwtToken = localStorage.getItem('jwtToken');

    const handleShowLoginModal = () => {
        setShowLoginModal(true);
    };

    const handleHideLoginModal = () => {
        setShowLoginModal(false);
    };

    const handleShowMasjidModal = () => {
        setShowMasjidModal(true);
    };

    const handleHideMasjidModal = () => {
        setShowMasjidModal(false);
    };

    return (
        <nav>
            <Link to='/'>Home</Link>
            <Link to='/masajid'>Masajid</Link>
            {jwtToken ?
                (<>
                    <Link to='/myMasajid'>My Masajid</Link>
                    <Link to='/profile/1'>My Profile</Link>
                    {/* <Link to='/registerMasjid' onClick={handleMasjidRegisterForm}>Add Masjid</Link> */}
                    <>
                        <a className='log' variant="primary" onClick={handleShowMasjidModal}>
                            Add Masjid
                        </a>
                        {showMasjidModal && <RegisterMasjid onHide={handleHideMasjidModal} />}
                    </>
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