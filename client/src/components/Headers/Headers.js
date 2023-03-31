import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import LoginModal from '../../pages/Register/LoginModal';
import RegisterMasjid from '../../pages/Register/RegisterMasjid';
import './headers.css';
import jwt_decode from 'jwt-decode';

const Headers = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showMasjidModal, setShowMasjidModal] = useState(false);
    const jwtToken = localStorage.getItem('jwtToken');
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const jwtToken = JSON.parse(localStorage.getItem('jwtToken'));

        if (jwtToken) {
            const { user: [user] } = jwt_decode(jwtToken);
            setUserData(user);
        }
    }, []);

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
            {userData !== null && jwtToken ?
                (<>
                    <Link to='/myMasajid'>My Masajid</Link>
                    <Link to='/profile/1'>My Profile</Link>
                    <>
                        <Link className='log' variant="primary" onClick={handleShowMasjidModal}>
                            Add Masjid
                        </Link>
                        {showMasjidModal && <RegisterMasjid onHide={handleHideMasjidModal} />}
                    </>

                </>) : (<>
                    <Link className='log' variant="primary" onClick={handleShowLoginModal}>
                        Login
                    </Link>
                    {showLoginModal && <LoginModal onHide={handleHideLoginModal} />}
                </>)
            }
        </nav>
    )
}

export default Headers;