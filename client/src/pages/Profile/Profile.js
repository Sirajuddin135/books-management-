import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/esm/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faEnvelope, faLocationDot, faMobile } from '@fortawesome/free-solid-svg-icons';
import './profile.css';

const Profile = () => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || []);
    const email = <FontAwesomeIcon icon={faEnvelope} />
    const mobile = <FontAwesomeIcon icon={faMobile} />
    const location = <FontAwesomeIcon icon={faLocationDot} />
    const calendar = <FontAwesomeIcon icon={faCalendarAlt} />

    const handleLogout = () => {
        // localStorage.removeItem('jwtToken');
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        <>
            <div className="container">
                <Card>
                    <Card.Body>
                        <Row>
                            <div className="col">
                                <div className="card-profile-stats d-flex justify-content-center">
                                    <img src='/person.jpg' alt='' />
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <div className="text-center">
                                <h3>{userData.user_name}</h3>
                                <h5>{email} &nbsp; {userData.email}</h5>
                                <h5>{mobile} &nbsp; {userData.mobile_number}</h5>
                                <h5>{location} &nbsp; {userData.location}</h5>
                                <h5>Role : {userData.role}</h5>
                                <h5>{calendar} &nbsp; Registered Date: {userData.registered_date} </h5>
                                <h5>{calendar} &nbsp; Updated Date: </h5>
                                <Button variant="primary" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </div>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default Profile;