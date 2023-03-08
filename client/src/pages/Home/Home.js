import React from 'react';
import { Card } from 'react-bootstrap';

const Home = () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ margin: '10px', padding: '100px', fontSize: '50px' }} key="user.id">
            <Card style={{ color: "brown" }}>Some Message or Introduction of Site
                <p style={{ color: "green" }}>کچھ پیغام یا سائٹ کا تعارف</p>
                <p style={{ color: "navy" }}>కొన్ని సందేశం లేదా సైట్ పరిచయం</p>
            </Card>
        </div>
    </div>
);

export default Home;
