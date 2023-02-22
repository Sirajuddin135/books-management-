import React from 'react';
import { Card, Table } from 'react-bootstrap';

const users = [
    {
        id: 1,
        name: 'Masjid-E-Khizar'
    },
    {
        id: 2,
        name: 'Masjid-E-Fatimatuzzuhra'
    },
    {
        id: 3,
        name: 'Masjid-E-Rizwan'
    },
    {
        id: 4,
        name: 'Masjid-E-Ibraheem Khaleelullaah'
    },
    {
        id: 5,
        name: 'Masjid-E-Habeebiya'
    },
    {
        id: 6,
        name: 'Masjid-E-Hafsa'
    }
];

const UserCard = ({ user }) => (
    <Card style={{ width: 'auto' }}>
        <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            {/* <ListGroup className="list-group-flush">
                <ListGroupItem>Email: {user.email}</ListGroupItem>
                <ListGroupItem>Phone: {user.phone}</ListGroupItem>
            </ListGroup> */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Namaz</th>
                        <th>Fajr</th>
                        <th>Zuhar</th>
                        <th>Asar</th>
                        <th>Maghrib</th>
                        <th>Ishaan</th>
                        <th>Juma</th>
                    </tr>
                </thead>
                <tbody>
                    {/* <tr>
                        <td>Start Time</td>
                        <td>05:26</td>
                        <td>12:29</td>
                        <td>04:42</td>
                        <td>06:23</td>
                        <td>07:35</td>
                    </tr> */}
                    <tr>
                        <td>Azaan</td>
                        <td>05:40</td>
                        <td>01:00</td>
                        <td>04:45</td>
                        <td>06:25</td>
                        <td>07:45</td>
                        <td>12:30</td>
                    </tr>
                    <tr>
                        <td>Jamaat</td>
                        <td>06:10</td>
                        <td>01:30</td>
                        <td>05:00</td>
                        <td>06:30</td>
                        <td>08:00</td>
                        <td>01:30</td>
                    </tr>
                    {/* <tr>
                        <td>End Time</td>
                        <td>06:39</td>
                        <td>04:30</td>
                        <td>06:08</td>
                        <td>07:20</td>
                        <td>05:10</td>
                    </tr> */}
                </tbody>
            </Table>
        </Card.Body>
    </Card>
);

const Home = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {users.map((user) => (
            <div style={{ margin: '10px' }} key={user.id}>
                <UserCard user={user} />
            </div>
        ))}
    </div>
);

export default Home;
