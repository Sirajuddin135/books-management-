import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap';
import RegisterMasjid from '../Register/RegisterMasjid';
import TimePicker from '../Register/UpdateTimingsDD';

const MyMasajidNew = () => {
    const [events, setEvents] = useState([]);
    const [masjidData, setMasjidData] = useState([]);
    const [userId, setUserId] = useState();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData')) || [];
        setUserId(userData.user_id);

        const fetchMasjid = async () => {
            try {
                const data = await axios.get(`http://localhost:4000/api/masjidsByIds/${userId}`);
                const dataOfMasjid = data.data.data;
                // console.log(data.data.data)
                // console.log(data.data.events)
                setMasjidData(dataOfMasjid);
                setEvents(data.data.events);

                // dataOfMasjid.map(async (masjid) => {
                //     const response = await axios.get(`http://localhost:4000/api/masjidPrayerTimings/${masjid.masjid_id}`);
                //     const eventsData = response.data.timings;
                //     // setEvents(events => [...events, ...eventsData]);
                //     setEvents(eventsData);
                // })
            } catch (error) {
                console.log(error.response);
            }
        }

        fetchMasjid();
    }, [userId]);

    // console.log(masjidData)
    console.log(events[0])

    const handleEventTimeChange = (eventId, timeType, hour, minute, masjid) => {
        console.log(eventId, timeType, hour, minute, masjid);

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

    const UserCard = ({ masjid, events }) => (
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
                            <tr key={event.prayer_id}>
                                <th>{event.prayer_name}</th>
                                <td>
                                    <TimePicker
                                        hour={event.azaan_time.split(":")[0]}
                                        minute={event.azaan_time.split(":")[1]}
                                        onChange={(hour, minute) => handleEventTimeChange(event.id, "startTime", hour, minute, masjid)}
                                    />
                                </td>
                                <td>
                                    <TimePicker
                                        hour={event.jamaat_time.split(":")[0]}
                                        minute={event.jamaat_time.split(":")[1]}
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

    return (
        masjidData ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {masjidData.map((masjid, index) => (
                    <div style={{ margin: '10px' }} key={masjid.masjid_id}>
                        <UserCard masjid={masjid} events={events[index].timings} />
                    </div>
                ))}
            </div>) : (<div style={{ margin: '10px', padding: '100px', fontSize: '50px' }} key="user.id">
                <p style={{ textAlign: 'center', cursor: 'pointer' }} onClick={handleShowMasjidModal}>Please add Masjid</p>
                {showMasjidModal && <RegisterMasjid onHide={handleHideMasjidModal} />}
            </div>)
    )
}

export default MyMasajidNew;