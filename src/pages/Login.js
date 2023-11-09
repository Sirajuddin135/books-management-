import React, { useState } from 'react';
import './Login.css';
import { ToastContainer, toast } from 'react-toastify';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (username, password) => {
        setUsername(username);
        setPassword(password);

        if (username === 'admin' && password === 'password') {
            localStorage.setItem('loginStatus', "true");
            toast.success('Login successful');

            setTimeout(function () {
                console.log('Function is running after a 5 seconds delay');
            }, 5000);

            window.location.href = 'home';
        } else {
            toast.error('Login unsuccessful');
        }
    }

    return (
        <div className='login'>
            <label>User Name</label>
            <input
                type="text"
                id="username-input"
                placeholder="Enter username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            <label>Password</label>
            <input
                type="password"
                id="password-input"
                placeholder="Enter Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <button
                type="submit"
                id="button-input"
                onClick={() => onSubmit(username, password)}
            >
                Login
            </button>
            <ToastContainer position='bottom-right' />
        </div>
    );
}

export default Login;