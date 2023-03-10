import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';

const Masajid = () => {
    const location = <FontAwesomeIcon icon={faMapLocationDot} />
    const [masjidData, setMasjidData] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        fetchMasjid(searchKeyword);
    }, []);

    const fetchMasjid = async (searchKeyword) => {
        try {
            let endPoint = `masjids`;

            if (searchKeyword) {
                endPoint = `masjidsByKeyword/${searchKeyword}`;
            }

            const data = await axios.get(`http://localhost:4000/api/${endPoint}`);
            const dataOfMasjid = data.data.data;
            const timings = data.data.events;

            setMasjidData(dataOfMasjid);

            const totalData = dataOfMasjid.map(masjid => {
                const current_date = new Date();
                const updated_date = new Date(masjid.updated_date);
                const color = Math.round((current_date - updated_date) / (1000 * 60 * 60 * 24)) < 2 ? 'green' : 'red';

                return {
                    masjid: masjid,
                    ...timings.find(event => event.timings[0].masjid_id === masjid.masjid_id),
                    color: color
                }
            });

            setMasjidData(totalData);
        } catch (error) {
            console.log(error.response);
        }
    }

    const submitSearch = async (event) => {
        const input = event.target.innerText;
        setSearchData([]);
        setSearchKeyword('');
        fetchMasjid(input);
    }

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            submitSearch(event);
        }
    }

    const handleSearch = async (event) => {
        const input = event.target.value;
        setSearchKeyword(input);

        if (input.length > 0) {
            try {
                const data = await axios.get(`http://localhost:4000/api/masjidsAreaNames/${input}`);

                setSearchData(data.data.data);
            } catch (error) {
                console.log(error.response);
            }
        } else {
            setSearchData([]);
        }
    }

    const UserCard = ({ masjid, events, color }) => (
        <Card style={{ width: 'auto' }}>
            <Card.Body>
                <Card.Title>
                    <h4 style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {masjid.masjid_name}
                        <a href={masjid.location} target={'_blank'} rel={"noreferrer"}>{location}</a>
                        {/* <p>{masjid.masjid_name}</p> */}
                    </h4>
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
                                    {event.azaan_time.split(":")[0]}:{event.azaan_time.split(":")[1]}
                                </td>
                                <td>
                                    {event.jamaat_time.split(":")[0]}:{event.jamaat_time.split(":")[1]}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Last Updated</th>
                            <th colSpan={2} style={{ color: color }}>{masjid.updated_date}</th>
                        </tr>
                    </tfoot>
                </Table>
            </Card.Body>
        </Card>
    );

    return (
        <>
            <div>
                <input type="text"
                    id='searchBox'
                    placeholder="Enter area name"
                    value={searchKeyword}
                    onChange={handleSearch}
                    onKeyDown={handleKeyDown} />
                <div style={{ position: 'relative', cursor: 'pointer' }}>
                    {searchData.map((item, id) => (
                        <p key={id} onClick={submitSearch}>{item.area}</p>
                    ))}
                </div>
            </div>
            {
                masjidData ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {masjidData.map((masjid) => (
                            <div style={{ margin: '10px' }} key={masjid.masjid.masjid_id}>
                                <UserCard masjid={masjid.masjid} events={masjid.timings} color={masjid.color} />
                            </div>
                        ))}
                    </div>) : (<div style={{ margin: '10px', padding: '100px', fontSize: '50px' }} key="user.id">
                        <p style={{ textAlign: 'center', cursor: 'pointer' }}>No masjid added yet.</p>
                    </div>)
            }
        </>
    )
}

export default Masajid;