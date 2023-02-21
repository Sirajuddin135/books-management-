import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Headers/Headers';
import Home from './pages/Home/Home';
import Home1 from './pages/Home/Home1';
import Edit from './pages/Edit/Edit';
// import Register from './pages/Register/RegisterForm';
import Profile from './pages/Profile/Profile';
import { Routes, Route } from 'react-router-dom';
// import Login from './pages/Register/LoginModal';
// import { useState } from 'react';

function App() {

  let isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));

  return (
    <>
      < Header onAuthenticated={isAuthenticated} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home1' element={<Home1 />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/profile/:id' element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
