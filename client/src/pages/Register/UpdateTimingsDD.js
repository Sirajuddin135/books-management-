import React, { useEffect, useState } from 'react';

const UpdateTimingsDD = (props) => {
    const [selectedHour, setSelectedHour] = useState(props.hour);
    const [selectedMinute, setSelectedMinute] = useState(props.minute);

    const hours = Array.from(Array(24).keys()); // creates an array of hours from 0 to 23
    const minutes = Array.from(Array(60).keys()); // creates an array of minutes from 0 to 59

    const handleHourChange = (event) => {
        setSelectedHour(event.target.value);
    };

    const handleMinuteChange = (event) => {
        setSelectedMinute(event.target.value);
    };

    // useEffect(() => {
    //     if (selectedHour && selectedMinute) {
    //         props.onChange(selectedHour, selectedMinute);
    //         // setSelectedHour(props.hour)
    //         // setSelectedMinute(props.selectedMinute)
    //     }
    // }, [])

    return (
        <>
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
        </>
    )
}

export default UpdateTimingsDD;
