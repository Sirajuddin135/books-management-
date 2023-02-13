import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faEnvelope, faLocationDot, faMobile } from '@fortawesome/free-solid-svg-icons';
import './profile.css';

const Profile = () => {
    const email = <FontAwesomeIcon icon={faEnvelope} />
    const mobile = <FontAwesomeIcon icon={faMobile} />
    const location = <FontAwesomeIcon icon={faLocationDot} />
    const calendar = <FontAwesomeIcon icon={faCalendarAlt} />

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
                                <h3>Shaik Sirajuddin</h3>
                                {/* <h4><FontAwesomeIcon icon={faEnvelope} /></h4> */}
                                <h5>{email} &nbsp; shaiksirajuddin135@gmail.com</h5>
                                <h5>{mobile} &nbsp; +91 8523096699</h5>
                                <h5>{location} &nbsp; Kadapa</h5>
                                <h5>Role : Imam</h5>
                                <h5>{calendar} &nbsp; Registered Date: </h5>
                                <h5>{calendar} &nbsp; Updated Date: </h5>
                            </div>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default Profile;