import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const RegisterMasjid = (props) => {
    const loginData = JSON.parse(localStorage.getItem('loginData')) || [];
    const [masjid, setMasjid] = useState('');
    const [data, setData] = useState({});
    const email = loginData.email;

    useEffect(() => {
        const storedStringData = localStorage.getItem('registeredMasjidData');

        if (storedStringData) {
            const storedData = JSON.parse(storedStringData);
            setData(storedData);
        }
    }, [])

    const registeredMasjidData = JSON.parse(localStorage.getItem('registeredMasjidData')) || [];

    const [masjidData, setMasjidData] = useState({
        masjidName: '',
        streetName: '',
        areaName: '',
        cityName: '',
        stateName: '',
        countryName: '',
        locationName: ''
    });

    const setInputValue = (e) => {
        const { name, value } = e.target;
        setMasjidData({ ...masjidData, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataOfMasjid = { ...data };

        if (registeredMasjidData.find(masjid => masjid.masjidName === masjidData.masjidName &&
            masjid.streetName === masjidData.streetName && masjid.areaName === masjidData.areaName &&
            masjid.cityName === masjidData.cityName)) {

            toast.error('User already registered');
            return;
        }

        if (!dataOfMasjid[masjid]) {
            dataOfMasjid[masjid] = {};
        }

        if (!dataOfMasjid[masjid][email]) {
            dataOfMasjid[masjid][email] = [];
        }

        dataOfMasjid[masjid][email].push(masjidData);

        setData(dataOfMasjid);

        localStorage.setItem('registeredMasjidData', JSON.stringify(dataOfMasjid));

        // const { masjidName, streetName, areaName, cityName, stateName, countryName, locationName } = masjidData;



        // registeredMasjidData.push(masjidData);
        // let data = JSON.stringify(registeredMasjidData);
        // localStorage.setItem('registeredMasjidData', { "shaik": JSON.stringify(data) });
        // toast.success('Registration successful');
        // props.onHide();
    }

    return (
        <Modal show={true} onHide={props.onHide} >
            <Modal.Header closeButton>
                <Modal.Title>Add Masjid</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>

                    <Form.Group>
                        <Form.Label>Masjid Name</Form.Label>
                        <Form.Control
                            type="text"
                            id='mname'
                            name='masjidName'
                            value={masjidData.masjidName}
                            placeholder="Enter masjid name"
                            onChange={setInputValue}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Street Name</Form.Label>
                        <Form.Control
                            type="text"
                            id='sname'
                            name='streetName'
                            value={masjidData.streetName}
                            placeholder="Enter street name"
                            onChange={setInputValue}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Area</Form.Label>
                        <Form.Control
                            type="text"
                            id='aname'
                            name='areaName'
                            value={masjidData.areaName}
                            placeholder="Enter area name"
                            onChange={setInputValue}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            id='cname'
                            name='cityName'
                            value={masjidData.cityName}
                            placeholder="Enter city name"
                            onChange={setInputValue}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            id='statename'
                            name='stateName'
                            value={masjidData.stateName}
                            placeholder="Enter state name"
                            onChange={setInputValue}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            type="text"
                            id='countryname'
                            name='countryName'
                            value={masjidData.countryName}
                            placeholder="Enter country name"
                            onChange={setInputValue}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Masjid Location</Form.Label>
                        <Form.Control
                            type="text"
                            id='locationname'
                            name='locationName'
                            value={masjidData.locationName}
                            placeholder="Enter location name"
                            onChange={setInputValue}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" >
                        Add
                    </Button>
                </Modal.Body>
            </Form>
        </Modal>
    )
}

export default RegisterMasjid;
