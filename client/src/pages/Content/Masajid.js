import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';

const Masajid = () => {
    const location = <FontAwesomeIcon icon={faMapLocationDot} />
    // const [masjidData, setMasjidData] = useState([]);
    // const [searchKeyword, setSearchKeyword] = useState('');
    // const [searchData, setSearchData] = useState([]);

    // useEffect(() => {
    //     fetchMasjid(searchKeyword);
    // }, []);

    // const fetchMasjid = async (searchKeyword) => {
    //     try {
    //         let endPoint = `masjids`;

    //         if (searchKeyword) {
    //             endPoint = `masjidsByKeyword/${searchKeyword}`;
    //         }

    //         const data = await axios.get(`http://localhost:4000/api/${endPoint}`);
    //         const dataOfMasjid = data.data.data;
    //         const timings = data.data.events;

    //         setMasjidData(dataOfMasjid);

    //         const totalData = dataOfMasjid.map(masjid => {
    //             const current_date = new Date();
    //             const updated_date = new Date(masjid.updated_date);
    //             const color = Math.round((current_date - updated_date) / (1000 * 60 * 60 * 24)) < 2 ? 'green' : 'red';

    //             return {
    //                 masjid: masjid,
    //                 ...timings.find(event => event.timings[0].masjid_id === masjid.masjid_id),
    //                 color: color
    //             }
    //         });

    //         setMasjidData(totalData);
    //     } catch (error) {
    //         console.log(error.response);
    //     }
    // }

    // const submitSearch = async (event) => {
    //     const input = event.target.innerText;
    //     setSearchData([]);
    //     setSearchKeyword('');
    //     fetchMasjid(input);
    // }

    // // const handleKeyDown = async (event) => {
    // //     if (event.key === 'Enter') {
    // //         submitSearch(event);
    // //     }
    // // }

    // const handleSearch = async (event) => {
    //     const input = event.target.value;
    //     setSearchKeyword(input);

    //     if (input.length > 0) {
    //         try {
    //             const data = await axios.get(`http://localhost:4000/api/masjidsAreaNames/${input}`);

    //             setSearchData(data.data.data);
    //         } catch (error) {
    //             console.log(error.response);
    //         }
    //     } else {
    //         setSearchData([]);
    //     }
    // }

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

    // return (
    //     <>
    //         <div>
    //             <input type="text"
    //                 id='searchBox'
    //                 placeholder="Enter area name"
    //                 value={searchKeyword}
    //                 onChange={handleSearch} />
    //             <div style={{ position: 'relative', cursor: 'pointer' }}>
    //                 {searchData.map((item, id) => (
    //                     <p key={id} onClick={submitSearch}>{item.area}</p>
    //                 ))}
    //             </div>
    //         </div>
    //         {
    //             masjidData ? (
    //                 <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
    //                     {masjidData.map((masjid) => (
    //                         <div style={{ margin: '10px' }} key={masjid.masjid.masjid_id}>
    //                             <UserCard masjid={masjid.masjid} events={masjid.timings} color={masjid.color} />
    //                         </div>
    //                     ))}
    //                 </div>) : (<div style={{ margin: '10px', padding: '100px', fontSize: '50px' }} key="user.id">
    //                     <p style={{ textAlign: 'center', cursor: 'pointer' }}>No masjid added yet.</p>
    //                 </div>)
    //         }
    //     </>
    // )
    const [selectedOption, setSelectedOption] = useState('country');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [selectedMasjid, setSelectedMasjid] = useState('');
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [masjids, setMasjids] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        let parameters = { queryType: "", query: "", keyword: "" };
        const fetchCountries = async () => {
            await axios.get(`http://localhost:4000/api/masjidsCountryNames`)
                .then(response => {
                    setCountries(response.data.countries);
                }).catch((err) => {
                    console.error(err);
                })
        }

        fetchCountries();

        // const fetchStates = async () => {
        //     const country = { queryType: "country", query: selectedCountry, keyword: "state" };

        //     await axios.post(`http://localhost:4000/api/searchOptions`, country)
        //         .then(response => {
        //             setStates(response.data.options);
        //         }).catch((err) => {
        //             console.error(err);
        //         })
        // }

        const fetchOptions = async (parameters) => {
            const response = await axios.post(`http://localhost:4000/api/searchOptions`, parameters)
            const data = await response.data.options;

            return data;
        }

        const fetchMasajid = async (parameters) => {
            const response = await axios.post(`http://localhost:4000/api/masjidByOptions`, parameters)
            const dataOfMasjid = response.data.data;
            const timings = response.data.events;

            // setMasjids(dataOfMasjid);

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

            return totalData;
        }

        if (selectedCountry && selectedState && selectedCity && selectedArea) {
            parameters = { queryType: "area", query: selectedArea, keyword: "masjid" };
            fetchMasajid(parameters)
                .then(result => setMasjids(result))
                .catch(error => console.error(error))
        } else if (selectedCountry && selectedState && selectedCity) {
            parameters = { queryType: "city", query: selectedCity, keyword: "area" };
            fetchOptions(parameters)
                .then(result => setAreas(result))
                .catch(error => console.error(error))
        } else if (selectedCountry && selectedState) {
            parameters = { queryType: "state", query: selectedState, keyword: "city" };
            fetchOptions(parameters)
                .then(result => setCities(result))
                .catch(error => console.error(error))
        } else if (selectedCountry) {
            parameters = { queryType: "country", query: selectedCountry, keyword: "state" };
            fetchOptions(parameters)
                .then(result => setStates(result))
                .catch(error => console.error(error))
        } else {
            setStates([]);
            setCities([]);
            setAreas([]);
            setMasjids([]);
        }

    }, [selectedCountry, selectedState, selectedCity, selectedArea, selectedMasjid]);

    // useEffect(() => {
    //     // fetchMasjid(searchTerm);
    //     axios
    //         .get(`https://api.example.com/${selectedOption}s`)
    //         .then((response) => {
    //             switch (selectedOption) {
    //                 case 'country':
    //                     setCountries(response.data);
    //                     break;
    //                 case 'state':
    //                     setStates(response.data);
    //                     break;
    //                 case 'city':
    //                     setCities(response.data);
    //                     break;
    //                 case 'area':
    //                     setAreas(response.data);
    //                     break;
    //                 default:
    //                     break;
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, [selectedOption]);

    // useEffect(() => {
    //     if (searchTerm !== '') {
    //         axios
    //             .get(`https://api.example.com/search?q=${searchTerm}`)
    //             .then((response) => {
    //                 setSuggestions(response.data);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     } else {
    //         setSuggestions([]);
    //     }
    // }, [searchTerm]);

    const fetchMasjid = async (searchTerm) => {
        try {
            let endPoint = `masjids`;

            if (searchTerm) {
                endPoint = `masjidsByKeyword/${searchTerm}`;
            }

            const data = await axios.get(`http://localhost:4000/api/${endPoint}`);
            const dataOfMasjid = data.data.data;
            const timings = data.data.events;

            // setMasjids(dataOfMasjid);

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

            setMasjids(totalData);
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setSelectedCountry('');
        setCountries([]);
        setSelectedState('');
        setStates([]);
        setSelectedCity('');
        setCities([]);
        setSelectedArea('');
        setAreas([]);
        setSelectedMasjid('');
        setMasjids([]);
    };

    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
        setSelectedState('');
        setStates([]);
        setSelectedCity('');
        setCities([]);
        setSelectedArea('');
        setAreas([]);
        setSelectedMasjid('');
        setMasjids([]);
    };

    const handleStateChange = (event) => {
        setSelectedState(event.target.value);
        setSelectedCity('');
        setCities([]);
        setSelectedArea('');
        setAreas([]);
        setSelectedMasjid('');
        setMasjids([]);
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        setSelectedArea('');
        setAreas([]);
        setSelectedMasjid('');
        setMasjids([]);
    };

    const handleAreaChange = (event) => {
        setSelectedArea(event.target.value);
        setSelectedMasjid('');
        setMasjids([]);
    };

    const handleMasjidChange = (event) => {
        setSelectedMasjid(event.target.value);
    };

    const handleBlur = (event) => {
        event.target.blur();
    };

    // const handleSearchChange = (event) => {
    //     setSearchTerm(event.target.value);
    // };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <label>
                    Search by:
                    <select value={selectedOption} onChange={handleOptionChange}>
                        <option value="area">Area Name</option>
                        <option value="masjid">Masjid Name</option>
                    </select>
                </label>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <>
                    <label>
                        Select a country:
                        <select value={selectedCountry} onChange={handleCountryChange} style={{ outline: 'none' }} onBlur={handleBlur}>
                            <option value="">-- Select a country --</option>
                            {countries.map((country, index) => (
                                <option key={index} value={country.id}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Select a state:
                        <select value={selectedState} onChange={handleStateChange} style={{ outline: 'none' }} onBlur={handleBlur}>
                            <option value="">-- Select a state --</option>
                            {states.map((state, index) => (
                                <option key={index} value={state.id}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Select a city:
                        <select value={selectedCity} onChange={handleCityChange} style={{ outline: 'none' }} onBlur={handleBlur}>
                            <option value="">-- Select a city --</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city.id}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Select a area:
                        <select value={selectedArea} onChange={handleAreaChange} style={{ outline: 'none' }} onBlur={handleBlur}>
                            <option value="">-- Select a area --</option>
                            {areas.map((area, index) => (
                                <option key={index} value={area.id}>
                                    {area}
                                </option>
                            ))}
                        </select>
                    </label>
                </>
                {selectedOption === 'masjid' && (
                    <label>
                        Select a masjid name:
                        <select value={selectedMasjid} onChange={handleMasjidChange} style={{ outline: 'none' }} onBlur={handleBlur}>
                            <option value="">-- Select a masjid --</option>
                            {masjids.map((masjid, index) => (
                                <option key={index} value={masjid.id}>
                                    {masjid}
                                </option>
                            ))}
                        </select>
                    </label>
                )}
            </div>
            {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                <label>
                    Search:
                    <input type="text" value={searchTerm} onChange={handleSearchChange} />
                </label>
            </div> */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {suggestions.length > 0 && (
                    <ul>
                        {suggestions.map((suggestion) => (
                            <li key={suggestion.id}>{suggestion.name}</li>
                        ))}
                    </ul>
                )}
            </div>
            {
                masjids ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {masjids.map((masjid) => (
                            <div style={{ margin: '10px' }} key={masjid.masjid.masjid_id}>
                                <UserCard masjid={masjid.masjid} events={masjid.timings} color={masjid.color} />
                            </div>
                        ))}
                    </div>) : (<div style={{ margin: '10px', padding: '100px', fontSize: '50px' }} key="user.id">
                        <p style={{ textAlign: 'center', cursor: 'pointer' }}>No masjid added yet.</p>
                    </div>)
            }
        </div>
    )
}


export default Masajid;