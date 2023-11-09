import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './headers.css';
import { HomeOutlined } from '@ant-design/icons';

const Headers = () => {
    const loginStatus = localStorage.getItem('loginStatus');

    return (
        <nav>
            {loginStatus ? <Link to='/home'>Home</Link> : ''}
            <h2 className='main-heading'>Library Management App</h2>
            {
                loginStatus ?
                    (<>
                        <Link to='/addBook'>Add Book</Link>
                    </>) : (<>
                        <Link to='/login'>Login</Link>
                    </>)
            }
        </nav >
    )
}

export default Headers;