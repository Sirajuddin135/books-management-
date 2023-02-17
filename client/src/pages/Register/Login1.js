import React, { useEffect, useState } from "react";

const Login1 = ({ handleLoginSignup, handleLoggedIn }) => {
    const [loginData, setLoginData] = useState(JSON.parse(localStorage.getItem('loginData')) || []);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        localStorage.setItem('loginData', JSON.stringify(loginData));
    }, [loginData]);

    const handleSubmit = (e) => {
        e.preventDefault();


        if (loginData.find(user => user.email === email)) {
            setUserName(email);

            handleLoggedIn();

            handleLoginSignup(userName);
            return;
        }
        setLoginData([...loginData, { email, password }]);
        setUserName(email);

        handleLoggedIn();

        handleLoginSignup(userName);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default Login1;