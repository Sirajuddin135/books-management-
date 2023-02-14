import React, { useState } from "react";
import { Button, Modal, Card, Table } from "react-bootstrap";


const Login = () => {
    const [show, setShow] = useState(false);
    const [selectedName, setSelectedName] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (name) => {
        setSelectedName(name);
        setShow(true);
    };

    const users = [
        {
            id: 1,
            name: 'Masjid-E-Khizar',
            email: 'john.doe@example.com',
            phone: '555-555-1212'
        },
        {
            id: 2,
            name: 'Masjid-E-Fatimatuzzuhra',
            email: 'jane.doe@example.com',
            phone: '555-555-1213'
        },
        {
            id: 3,
            name: 'Masjid-E-Rizwan',
            email: 'jim.smith@example.com',
            phone: '555-555-1214'
        },
        {
            id: 4,
            name: 'Masjid-E-Ibraheem Khaleelullaah',
            email: 'john.doe@example.com',
            phone: '555-555-1212'
        },
        {
            id: 5,
            name: 'Masjid-E-Habeebiya',
            email: 'jane.doe@example.com',
            phone: '555-555-1213'
        },
        {
            id: 6,
            name: 'Masjid-E-Hafsa',
            email: 'jim.smith@example.com',
            phone: '555-555-1214'
        }
    ];

    return (
        <>
            {/* {users.map((user) => (
                <div class="d-flex align-items-center justify-content-center form-group">

                    <Button key={user.name} onClick={() => handleShow(user.name)}>
                        {user.name}
                    </Button>
                </div>
            ))
            } */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This is the information for {selectedName}.
                </Modal.Body>
                <Card.Body>
                    <Card.Title>{selectedName}</Card.Title>
                    {/* <ListGroup className="list-group-flush">
                <ListGroupItem>Email: {user.email}</ListGroupItem>
                <ListGroupItem>Phone: {user.phone}</ListGroupItem>
            </ListGroup> */}
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Fajr</th>
                                <th>Zuhar</th>
                                <th>Asar</th>
                                <th>Maghrib</th>
                                <th>Ishaan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Start Time</td>
                                <td>05:26</td>
                                <td>12:29</td>
                                <td>04:42</td>
                                <td>06:23</td>
                                <td>07:35</td>
                            </tr>
                            <tr>
                                <td>Azaan</td>
                                <td>05:40</td>
                                <td>01:00</td>
                                <td>04:45</td>
                                <td>06:25</td>
                                <td>07:45</td>
                            </tr>
                            <tr>
                                <td>Jamaat</td>
                                <td>06:10</td>
                                <td>01:30</td>
                                <td>05:00</td>
                                <td>06:30</td>
                                <td>08:00</td>
                            </tr>
                            <tr>
                                <td>End Time</td>
                                <td>06:39</td>
                                <td>04:30</td>
                                <td>06:08</td>
                                <td>07:20</td>
                                <td>05:10</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Login;