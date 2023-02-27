import React, { useState } from "react";
import TimePicker from "../Register/UpdateTimingsDD";

const EventTable = () => {
    const [events, setEvents] = useState([
        { id: 1, name: "Event 1", startTime: { hour: 8, minute: 0 }, endTime: { hour: 10, minute: 0 } },
        { id: 2, name: "Event 2", startTime: { hour: 11, minute: 0 }, endTime: { hour: 13, minute: 0 } },
        { id: 3, name: "Event 3", startTime: { hour: 14, minute: 0 }, endTime: { hour: 16, minute: 0 } },
        { id: 4, name: "Event 4", startTime: { hour: 17, minute: 0 }, endTime: { hour: 19, minute: 0 } },
        { id: 5, name: "Event 5", startTime: { hour: 20, minute: 0 }, endTime: { hour: 22, minute: 0 } },
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

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td>{event.name}</td>
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
            </table>
        </div>
    );
};

export default EventTable;
