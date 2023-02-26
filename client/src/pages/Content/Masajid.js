import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

// const users = [
//     {
//         id: 1,
//         name: 'Masjid-E-Khizar'
//     },
//     {
//         id: 2,
//         name: 'Masjid-E-Fatimatuzzuhra'
//     },
//     {
//         id: 3,
//         name: 'Masjid-E-Rizwan'
//     },
//     {
//         id: 4,
//         name: 'Masjid-E-Ibraheem Khaleelullaah'
//     },
//     {
//         id: 5,
//         name: 'Masjid-E-Habeebiya'
//     },
//     {
//         id: 6,
//         name: 'Masjid-E-Hafsa'
//     }
// ];

// const UserCard = ({ user }) => (
//     <Card style={{ width: 'auto' }}>
//         <Card.Body>
//             <Card.Title>{user.name}</Card.Title>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Namaz</th>
//                         <th>Fajr</th>
//                         <th>Zuhar</th>
//                         <th>Asar</th>
//                         <th>Maghrib</th>
//                         <th>Ishaan</th>
//                         <th>Juma</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr>
//                         <td>Azaan</td>
//                         <td>05:40</td>
//                         <td>01:00</td>
//                         <td>04:45</td>
//                         <td>06:25</td>
//                         <td>07:45</td>
//                         <td>12:30</td>
//                     </tr>
//                     <tr>
//                         <td>Jamaat</td>
//                         <td>06:10</td>
//                         <td>01:30</td>
//                         <td>05:00</td>
//                         <td>06:30</td>
//                         <td>08:00</td>
//                         <td>01:30</td>
//                     </tr>
//                 </tbody>
//             </Table>
//         </Card.Body>
//     </Card>
// );

// const Masajid = () => (
//     <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
//         {users.map((user) => (
//             <div style={{ margin: '10px' }} key={user.id}>
//                 <UserCard user={user} />
//             </div>
//         ))}
//     </div>
// );

// export default Masajid;

const Masajid = () => {
    const [showMasjidModal, setShowMasjidModal] = useState(false);

    const handleShowMasjidModal = () => {
        setShowMasjidModal(true);
    };

    const handleHideMasjidModal = () => {
        setShowMasjidModal(false);
    };

    const UserCard = ({ masjid }) => (
        <Card style={{ width: 'auto' }}>
            <Card.Body>
                <Card.Title>{masjid.masjid_name}</Card.Title>
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
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );

    // const userData = JSON.parse(localStorage.getItem('userData')) || [];
    const [masjidData, setMasjidData] = useState([]);
    // const user_id = userData.user_id;

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData')) || [];
        const user_id = userData.user_id;

        const fetchMasjid = async () => {
            try {
                const data = await axios.get(`http://localhost:4000/api/masjids`);
                const dataOfMasjid = data.data.data

                setMasjidData(dataOfMasjid);

            } catch (error) {
                console.log(error.response);
            }
        }

        fetchMasjid();
    }, []);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {masjidData.map((masjid) => (
                <div style={{ margin: '10px' }} key={masjid.masjid_id}>
                    <UserCard masjid={masjid} />
                </div>
            ))}
        </div>
    )
}

export default Masajid;