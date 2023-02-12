import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import './profile.css';

const Profile = () => {
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
                            <h3>Shaik Sirajuddin</h3>
                            {/* <h4><FontAwesomeIcon icon="fa-solid fa-envelope" /></h4> */}
                            <h4><i class="fa-solid fa-envelope"></i></h4>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default Profile;