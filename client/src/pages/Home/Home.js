import React from 'react';
import { Card } from 'react-bootstrap';

const Home = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ margin: '10px', padding: '100px', fontSize: '50px' }} key="user.id">
            <Card style={{ color: "brown" }}>تعارف یا پیغام
                <p style={{ color: "green" }}>Introduction or Message</p>
                <p style={{ color: "navy" }}>పరిచయం లేదా సందేశం</p>
            </Card>
        </div>
    </div>
);

export default Home;
