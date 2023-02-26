import React from 'react';
import { Card } from 'react-bootstrap';

const Home = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ margin: '10px', padding: '100px', fontSize: '50px' }} key="user.id">
            <Card>Some Message or Introduction of Site</Card>
        </div>
    </div>
);

export default Home;
