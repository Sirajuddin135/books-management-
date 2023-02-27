import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap';
import RegisterMasjid from '../Register/RegisterMasjid';
import UpdateTimings from '../Register/UpdateTimings';
import UpdateTimingsDD from '../Register/UpdateTimingsDD';

const MyMasajid = () => {
    const [showMasjidModal, setShowMasjidModal] = useState(false);

    const handleShowMasjidModal = () => {
        setShowMasjidModal(true);
    };

    const handleHideMasjidModal = () => {
        setShowMasjidModal(false);
    };

    const UserCard = ({ masjid }) => (
        <Card style={{ width: 'auto' }}>
            <Card.Body>
                <Card.Title>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h2>{masjid.masjid_name}</h2>
                        <h2><a className='log' variant="primary" onClick={handleShowMasjidModal}>
                            Edit
                        </a>
                            {showMasjidModal && <UpdateTimings onHide={handleHideMasjidModal} masjidData={masjid} />}</h2>
                    </div>
                </Card.Title>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Namaz</th>
                            <th>Fajr</th>
                            <th>Zuhar</th>
                            <th>Asar</th>
                            <th>Maghrib</th>
                            <th>Ishaan</th>
                            <th>Juma</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Azaan</td>
                            <td><UpdateTimingsDD /></td>
                            <td><UpdateTimingsDD /></td>
                            <td><UpdateTimingsDD /></td>
                            <td><UpdateTimingsDD /></td>
                            <td><UpdateTimingsDD /></td>
                            <td><UpdateTimingsDD /></td>
                            {/* <td>05:40</td>
                            <td>01:00</td>
                            <td>04:45</td>
                            <td>06:25</td>
                            <td>07:45</td>
                            <td>12:30</td> */}
                        </tr>
                        <tr>
                            <td>Jamaat</td>
                            <td><UpdateTimingsDD /></td>
                            <td><UpdateTimingsDD /></td>
                            <td><UpdateTimingsDD /></td>
                            <td><UpdateTimingsDD /></td>
                            <td><UpdateTimingsDD /></td>
                            <td><UpdateTimingsDD /></td>
                            {/* <td>06:10</td>
                            <td>01:30</td>
                            <td>05:00</td>
                            <td>06:30</td>
                            <td>08:00</td>
                            <td>01:30</td> */}
                        </tr>
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );

    // const userData = JSON.parse(localStorage.getItem('userData')) || [];
    const [masjidData, setMasjidData] = useState([]);
    // const user_id = userData.user_id;

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData')) || [];
        const user_id = userData.user_id;

        const fetchMasjid = async () => {
            try {
                const data = await axios.get(`http://localhost:4000/api/masjidsByIds/${user_id}`);
                const dataOfMasjid = data.data.data

                setMasjidData(dataOfMasjid);

            } catch (error) {
                console.log(error.response);
            }
        }

        fetchMasjid();
    }, []);

    return (
        masjidData.length ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {masjidData.map((masjid) => (
                    <div style={{ margin: '10px' }} key={masjid.masjid_id}>
                        <UserCard masjid={masjid} />
                    </div>
                ))}
            </div>) : (<div style={{ margin: '10px', padding: '100px', fontSize: '50px' }} key="user.id">
                <p style={{ textAlign: 'center', cursor: 'pointer' }} onClick={handleShowMasjidModal}>Please add Masjid</p>
                {showMasjidModal && <RegisterMasjid onHide={handleHideMasjidModal} />}
            </div>)
    )
}

export default MyMasajid;