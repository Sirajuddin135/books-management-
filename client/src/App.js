import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Headers/Headers';
import Home from './pages/Home/Home';
import Home1 from './pages/Home/Home1';
import Edit from './pages/Edit/Edit';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Register/Login';
import { useState } from 'react';

function App() {
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLoginSignup = (userName) => {
    setUserName(userName);
  }

  const handleLoggedIn = () => {
    setLoggedIn(!isLoggedIn);
  }

  return (
    <>
      < Header userName={userName} isLoggedIn={isLoggedIn} handleLoggedIn={handleLoggedIn} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home1' element={<Home1 />} />
        <Route path='/login' element={<Login handleLoginSignup={handleLoginSignup} handleLoggedIn={handleLoggedIn} />} />
        <Route path='/register' element={<Register handleLoginSignup={handleLoginSignup} />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/profile/:id' element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
