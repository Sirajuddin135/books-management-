import React, { useState } from 'react';

function EventTable() {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const handleHourScroll = (event) => {
        const delta = Math.max(-1, Math.min(1, event.deltaY));
        setHour((prevHour) => prevHour + delta);
    };

    const handleMinuteScroll = (event) => {
        const delta = Math.max(-1, Math.min(1, event.deltaY));
        setMinute((prevMinute) => prevMinute + delta);
    };

    const handleSetAlarm = () => {
        setIsActive(true);
    };

    const handleStopAlarm = () => {
        setIsActive(false);
        setHour(0);
        setMinute(0);
    };

    const padNumber = (number) => {
        return number < 10 ? `0${number}` : `${number}`;
    };

    const formatTime = (hour, minute) => {
        const formattedHour = padNumber(hour);
        const formattedMinute = padNumber(minute);
        return `${formattedHour}:${formattedMinute}`;
    };

    const currentTime = formatTime(new Date().getHours(), new Date().getMinutes());

    return (
        <div>
            <h2>Set Alarm</h2>
            <div>
                <label htmlFor="hour">Hour:</label>
                <span onWheel={handleHourScroll}>{padNumber(hour)}</span>
            </div>
            <div>
                <label htmlFor="minute">Minute:</label>
                <span onWheel={handleMinuteScroll}>{padNumber(minute)}</span>
            </div>
            <button onClick={handleSetAlarm}>
                Set Alarm for {formatTime(hour, minute)}
            </button>
            {isActive && (
                <div>
                    <p>Alarm set for {formatTime(hour, minute)}</p>
                    <button onClick={handleStopAlarm}>Stop Alarm</button>
                </div>
            )}
        </div>
    );
}

export default EventTable;
