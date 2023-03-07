// import React, { useState } from 'react';

// function EventTable() {
//     const [hour, setHour] = useState(0);
//     const [minute, setMinute] = useState(0);
//     const [isActive, setIsActive] = useState(false);

//     const handleHourScroll = (event) => {
//         const delta = Math.max(-1, Math.min(1, event.deltaY));
//         setHour((prevHour) => prevHour + delta);
//     };

//     const handleMinuteScroll = (event) => {
//         const delta = Math.max(-1, Math.min(1, event.deltaY));
//         setMinute((prevMinute) => prevMinute + delta);
//     };

//     const handleSetAlarm = () => {
//         setIsActive(true);
//     };

//     const handleStopAlarm = () => {
//         setIsActive(false);
//         setHour(0);
//         setMinute(0);
//     };

//     const padNumber = (number) => {
//         return number < 10 ? `0${number}` : `${number}`;
//     };

//     const formatTime = (hour, minute) => {
//         const formattedHour = padNumber(hour);
//         const formattedMinute = padNumber(minute);
//         return `${formattedHour}:${formattedMinute}`;
//     };

//     const currentTime = formatTime(new Date().getHours(), new Date().getMinutes());

//     return (
//         <div>
//             <h2>Set Alarm</h2>
//             <div>
//                 <label htmlFor="hour">Hour:</label>
//                 <span onWheel={handleHourScroll}>{padNumber(hour)}</span>
//             </div>
//             <div>
//                 <label htmlFor="minute">Minute:</label>
//                 <span onWheel={handleMinuteScroll}>{padNumber(minute)}</span>
//             </div>
//             <button onClick={handleSetAlarm}>
//                 Set Alarm for {formatTime(hour, minute)}
//             </button>
//             {isActive && (
//                 <div>
//                     <p>Alarm set for {formatTime(hour, minute)}</p>
//                     <button onClick={handleStopAlarm}>Stop Alarm</button>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default EventTable;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const EventTable = () => {
//     const [schools, setSchools] = useState([]);

//     useEffect(() => {
//         const schoolsData = [{
//             name: "School 1", events: [{ name: "Event 1", start: "9:00 AM", end: "10:00 AM" }, { name: "Event 2", start: "11:00 AM", end: "12:00 PM" }]
//         },
//         {
//             name: "School 2",
//             events: [
//                 { name: "Event 3", start: "10:00 AM", end: "11:00 AM" },
//                 { name: "Event 4", start: "1:00 PM", end: "2:00 PM" }
//             ]
//         },
//         {
//             name: "School 3",
//             events: [
//                 { name: "Event 5", start: "8:00 AM", end: "9:00 AM" },
//                 { name: "Event 6", start: "12:00 PM", end: "1:00 PM" }
//             ]
//         },
//         {
//             name: "School 4",
//             events: [
//                 { name: "Event 7", start: "9:30 AM", end: "10:30 AM" },
//                 { name: "Event 8", start: "2:00 PM", end: "3:00 PM" }
//             ]
//         },
//         {
//             name: "School 5",
//             events: [
//                 { name: "Event 9", start: "11:00 AM", end: "12:00 PM" },
//                 { name: "Event 10", start: "3:00 PM", end: "4:00 PM" }
//             ]
//         }
//         ];

//         setSchools(schoolsData)
//     }, []);

//     const handleUpdateTimings = (schoolId, eventId, newStartTime, newEndTime) => {
//         // Send a PUT request to update the timings in the database
//         axios
//             .put(`api/schools/${schoolId}/events/${eventId}`, {
//                 startTime: newStartTime,
//                 endTime: newEndTime,
//             })
//             .then((res) => {
//                 // If the update is successful, update the state with the new data
//                 const updatedSchools = schools.map((school) => {
//                     if (school.id === schoolId) {
//                         const updatedEvents = school.events.map((event) => {
//                             if (event.id === eventId) {
//                                 return { ...event, startTime: newStartTime, endTime: newEndTime };
//                             } else {
//                                 return event;
//                             }
//                         });
//                         return { ...school, events: updatedEvents };
//                     } else {
//                         return school;
//                     }
//                 });
//                 setSchools(updatedSchools);
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//     };

//     return (
//         <div>
//             {schools.map((school) => (
//                 <div key={school.id}>
//                     <h2>{school.name}</h2>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Event</th>
//                                 <th>Start Time</th>
//                                 <th>End Time</th>
//                                 <th></th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {school.events.map((event) => (
//                                 <tr key={event.id}>
//                                     <td>{event.name}</td>
//                                     <td>{event.startTime}</td>
//                                     <td>{event.endTime}</td>
//                                     <td>
//                                         <TimePicker
//                                             onUpdateTimings={(newStartTime, newEndTime) =>
//                                                 handleUpdateTimings(school.id, event.id, newStartTime, newEndTime)
//                                             }
//                                         />
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ))}
//         </div>
//     );
// };

// const TimePicker = ({ onUpdateTimings }) => {
//     const [startTime, setStartTime] = useState("");
//     const [endTime, setEndTime] = useState("");

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onUpdateTimings(startTime, endTime);
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="time"
//                 value={startTime}
//                 onChange={(e) => setStartTime(e.target.value)}
//             />
//             <input
//                 type="time"
//                 value={endTime}
//                 onChange={(e) => setEndTime(e.target.value)}
//             />
//             <button type="submit">Update</button>
//         </form>
//     );
// };

// export default EventTable;

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Form, Table } from 'react-bootstrap';
import RegisterMasjid from '../Register/RegisterMasjid';

const EventTable = () => {
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
                const timings = data.data.events;
                // console.log(timings, "timings")
                setMasjidData(dataOfMasjid);
                setEvents(data.data.events);

                const totalData = dataOfMasjid.map(masjid => {
                    return {
                        masjid: masjid,
                        ...timings.find(event => event.timings[0].masjid_id === masjid.masjid_id)
                    }
                });

                // console.log(totalData)
                setMasjidData(totalData);

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

    const handleEventTimeChange = (eventId, eventName, timeType, hour, minute, masjid_id) => {
        const updateTimingsData = { eventId, eventName, timeType, hour, minute, masjid_id };

        axios.put(`http://localhost:4000/api/masjidPrayerTimings`, { updateTimingsData })
            .then(res => { })
            .catch(err => { });

        // window.location.reload();

        // const updatedEvents = events.map((event) => {
        //     if (event.id === eventId) {
        //         const updatedTime = { hour, minute };
        //         return { ...event, [timeType]: updatedTime };
        //     }
        //     return event;
        // });

        // setEvents(updatedEvents);
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
                {masjidData.map((masjid, index) => (
                    <div style={{ margin: '10px' }} key={masjid.masjid.masjid_id}>
                        <UserCard masjid={masjid.masjid} events={events[index].timings} />
                    </div>
                ))}
            </div>) : (<div style={{ margin: '10px', padding: '100px', fontSize: '50px' }} key="user.id">
                <p style={{ textAlign: 'center', cursor: 'pointer' }} onClick={handleShowMasjidModal}>Please add Masjid</p>
                {showMasjidModal && <RegisterMasjid onHide={handleHideMasjidModal} />}
            </div>)
    )
}

const TimePicker = (props) => {
    const [selectedHour, setSelectedHour] = useState(props.hour);
    const [selectedMinute, setSelectedMinute] = useState(props.minute);
    const [eventTime, setEventTime] = useState('');

    const hours = Array.from(Array(24).keys()); // creates an array of hours from 0 to 23
    const minutes = Array.from(Array(60).keys()); // creates an array of minutes from 0 to 59

    const handleHourChange = (e) => {
        e.target.value.length == 1 ? setSelectedHour('0' + e.target.value) : setSelectedHour(e.target.value)
    };

    const handleMinuteChange = (e) => {
        e.target.value.length == 1 ? setSelectedMinute('0' + e.target.value) : setSelectedMinute(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        props.onChange(selectedHour, selectedMinute);
    }

    // useEffect(() => {
    //     // props.onChange(selectedHour, selectedMinute);
    //     setSelectedHour(props.hour)
    //     setSelectedMinute(props.minute)
    // }, []);

    // useEffect(() => {
    //     console.log(props.masjid)
    // }, [selectedHour, selectedMinute]);

    return (
        <Form onSubmit={handleSubmit}>
            <select id="hour" onChange={handleHourChange} value={selectedHour} style={{ width: '40px' }}>
                <option value="">{selectedHour}</option>
                {hours.map((hour) => (
                    <option key={hour} value={hour}>
                        {hour}
                    </option>
                ))}
            </select>
            <select id="minute" onChange={handleMinuteChange} value={selectedMinute} style={{ width: '40px' }}>
                <option value="">{selectedMinute}</option>
                {minutes.map((minute) => (
                    <option key={minute} value={minute}>
                        {minute}
                    </option>
                ))}
            </select>
            <button type="submit">Update</button>
        </Form>
    )
}

export default EventTable;