import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap';
import RegisterMasjid from '../Register/RegisterMasjid';
import UpdateTimings from '../Register/UpdateTimings';
import UpdateTimingsDD from '../Register/UpdateTimingsDD';
import TimePicker from '../Register/UpdateTimingsDD';

const MyMasajidNew = () => {
    const [events, setEvents] = useState([
        { id: 1, name: "Fajar", startTime: { hour: 8, minute: 0 }, endTime: { hour: 10, minute: 0 } },
        { id: 2, name: "Zuhar", startTime: { hour: 11, minute: 0 }, endTime: { hour: 13, minute: 0 } },
        { id: 3, name: "Asar", startTime: { hour: 14, minute: 0 }, endTime: { hour: 16, minute: 0 } },
        { id: 4, name: "Magrib", startTime: { hour: 17, minute: 0 }, endTime: { hour: 19, minute: 0 } },
        { id: 5, name: "Ishaan", startTime: { hour: 20, minute: 0 }, endTime: { hour: 22, minute: 0 } },
    ]);

    const handleEventTimeChange = (eventId, timeType, hour, minute) => {
        const updatedEvents = events.map((event) => {
            if (event.id === eventId) {
                const updatedTime = { hour, minute };
                return { ...event, [timeType]: updatedTime };
            }
            return event;
        });
        setEvents(updatedEvents);
    };
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
                    {/* <div style={{ display: 'flex', justifyContent: 'space-between' }}> */}
                    <h2>{masjid.masjid_name}</h2>
                    {/* <h2><a className='log' variant="primary" onClick={handleShowMasjidModal}>
                            Edit
                        </a>
                            {showMasjidModal && <UpdateTimings onHide={handleHideMasjidModal} masjidData={masjid} />}</h2> */}
                    {/* </div> */}
                </Card.Title>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Namaz</th>
                            <th>Azaan</th>
                            <th>Jamaat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>
                                <th>{event.name}</th>
                                <td>
                                    <TimePicker
                                        hour={event.startTime.hour}
                                        minute={event.startTime.minute}
                                        onChange={(hour, minute) => handleEventTimeChange(event.id, "startTime", hour, minute)}
                                    />
                                </td>
                                <td>
                                    <TimePicker
                                        hour={event.endTime.hour}
                                        minute={event.endTime.minute}
                                        onChange={(hour, minute) => handleEventTimeChange(event.id, "endTime", hour, minute)}
                                    />
                                </td>
                            </tr>
                        ))}
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

export default MyMasajidNew;