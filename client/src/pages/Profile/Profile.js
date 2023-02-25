import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/esm/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faEnvelope, faLocationDot, faMobile } from '@fortawesome/free-solid-svg-icons';
import './profile.css';
import axios from 'axios';

const Profile = () => {
    const email = <FontAwesomeIcon icon={faEnvelope} />
    const mobile = <FontAwesomeIcon icon={faMobile} />
    const location = <FontAwesomeIcon icon={faLocationDot} />
    const calendar = <FontAwesomeIcon icon={faCalendarAlt} />
    const registerData = JSON.parse(localStorage.getItem('registerData')) || [];
    const loginData = JSON.parse(localStorage.getItem('loginData')) || [];
    const [userData, setUserData] = useState([]);
    let isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));

    useEffect(() => {
        const jwtToken = JSON.parse(localStorage.getItem('jwtToken'));

        const fetchUser = async () => {
            try {
                const data = await axios.get('http://localhost:4000/api/authenticate', { headers: { 'Authorization': `Bearer ${jwtToken}` } })
                const { user } = data.data;
                console.log(user[0], "user")
                setUserData(user[0]);
            } catch (error) {
                console.log(error.response);
            }
        }

        fetchUser();

    }, []);

    const handleLogout = () => {
        localStorage.setItem('isAuthenticated', false);
        localStorage.clear('jwtToken');
        isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
        window.location.href = '/';
        window.localStorage.removeItem('loginData');
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