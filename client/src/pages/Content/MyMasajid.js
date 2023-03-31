import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Form, Table } from 'react-bootstrap';
import RegisterMasjid from '../Register/RegisterMasjid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import jwt_decode from 'jwt-decode';

const MyMasajid = () => {
    const [masjidData, setMasjidData] = useState([]);
    const [userId, setUserId] = useState();

    useEffect(() => {
        const jwtToken = JSON.parse(localStorage.getItem('jwtToken'));
        const { user: [user] } = jwt_decode(jwtToken);
        console.log(user)
        setUserId(user.user_id);

        const fetchMasjid = async () => {
            try {
                const data = await axios.get(`http://localhost:4000/api/masjidsByIds/${userId}`);
                const dataOfMasjid = data.data.data;
                const timings = data.data.events;
                const totalData = dataOfMasjid.map(masjid => {
                    return {
                        masjid: masjid,
                        ...timings.find(event => event.timings[0].masjid_id === masjid.masjid_id)
                    }
                });

                setMasjidData(totalData);
            } catch (error) {
                console.log(error.response);
            }
        }

        fetchMasjid();
    }, [userId]);

    const handleEventTimeChange = (eventId, eventName, timeType, hour, minute, masjid_id) => {
        const updateTimingsData = { eventId, eventName, timeType, hour, minute, masjid_id };

        axios.put(`http://localhost:4000/api/masjidPrayerTimings`, { updateTimingsData })
            .then(res => { })
            .catch(err => { });
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
                    <h2>{masjid.masjid_name}</h2>
                </Card.Title>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Namaz</th>
                            <th>Azaan</th>
                            <th>Jamaat</th>
                        </tr>
                    </thead>
                    <tbody onSubmit={handleEventTimeChange}>
                        {events.map((event) => (
                            <tr key={event.prayer_id}>
                                <th>{event.prayer_name}</th>
                                <td>
                                    <TimePicker
                                        hour={event.azaan_time.split(":")[0]}
                                        minute={event.azaan_time.split(":")[1]}
                                        onChange={(hour, minute) => handleEventTimeChange(event.prayer_id, event.prayer_name, "azaan_time", hour, minute, masjid.masjid_id)}
                                    />
                                </td>
                                <td>
                                    <TimePicker
                                        hour={event.jamaat_time.split(":")[0]}
                                        minute={event.jamaat_time.split(":")[1]}
                                        onChange={(hour, minute) => handleEventTimeChange(event.prayer_id, event.prayer_name, "jamaat_time", hour, minute, masjid.masjid_id)}
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
                {masjidData.map((masjid) => (
                    <div style={{ margin: '10px' }} key={masjid.masjid.masjid_id}>
                        <UserCard masjid={masjid.masjid} events={masjid.timings} />
                    </div>
                ))}
            </div>) : (<div style={{ margin: '10px', padding: '100px', fontSize: '50px' }} key="user.id">
                <p style={{ textAlign: 'center', cursor: 'pointer' }} onClick={handleShowMasjidModal}>Please add Masjid</p>
                {showMasjidModal && <RegisterMasjid onHide={handleHideMasjidModal} />}
            </div>)
    )
}

const TimePicker = (props) => {
    const check = <FontAwesomeIcon icon={faCheck} />
    const pen = <FontAwesomeIcon icon={faPenToSquare} />
    const [selectedHour, setSelectedHour] = useState(props.hour);
    const [selectedMinute, setSelectedMinute] = useState(props.minute);
    const [updateMode, setUpdateMode] = useState(false);

    const hours = Array.from(Array(24).keys()); // creates an array of hours from 0 to 23
    const minutes = Array.from(Array(60).keys()); // creates an array of minutes from 0 to 59

    const handleHourChange = (e) => {
        e.target.value.length === 1 ? setSelectedHour('0' + e.target.value) : setSelectedHour(e.target.value)
    };

    const handleMinuteChange = (e) => {
        e.target.value.length === 1 ? setSelectedMinute('0' + e.target.value) : setSelectedMinute(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleUpdate();

        if (updateMode) {
            props.onChange(selectedHour, selectedMinute);
        }
    }

    const handleUpdate = () => {
        setUpdateMode(!updateMode);
    }

    return (
        <Form onSubmit={handleSubmit}>
            {updateMode ? (<><select id="hour" onChange={handleHourChange} value={selectedHour} style={{ width: '40px' }}>
                <option value="">{selectedHour}</option>
                {hours.map((hour) => (
                    <option key={hour} value={hour}>
                        {hour}
                    </option>
                ))}
            </select><select id="minute" onChange={handleMinuteChange} value={selectedMinute} style={{ width: '40px' }} autoFocus>
                    <option value="">{selectedMinute}</option>
                    {minutes.map((minute) => (
                        <option key={minute} value={minute}>
                            {minute}
                        </option>
                    ))}
                </select>
                <button type="submit" style={{ color: "green" }} > {check}</button>
            </>)
                :
                (<>
                    {selectedHour}:{selectedMinute}{'     '}
                    <button type="submit" style={{ color: "red" }}>{pen}</button>
                </>)
            }
        </Form >
    )
}

export default MyMasajid;