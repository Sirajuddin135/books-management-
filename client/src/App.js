import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Headers/Headers';
import Home from './pages/Home/Home';
import Edit from './pages/Edit/Edit';
import RegisterMasjid from './pages/Register/RegisterMasjid';
import Profile from './pages/Profile/Profile';
import Masajid from './pages/Content/Masajid';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MyMasajid from './pages/Content/MyMasajid';
import jwt_decode from 'jwt-decode';

function App() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const jwtToken = JSON.parse(localStorage.getItem('jwtToken'));

    const fetchUser = async () => {
      try {
        const data = await axios.get('http://localhost:4000/api/authenticate', { headers: { 'Authorization': `Bearer ${jwtToken}` } })
        const { user } = data.data;

        setUserData(user[0]);
        // localStorage.setItem('userData', JSON.stringify(user[0]));
      } catch (error) {
        console.log(error.response.data.error);
      }
    }

    if (jwtToken) {
      const decoded = jwt_decode(jwtToken);
      console.log(decoded)

      console.log(jwtToken)
      fetchUser();
    }

  }, []);

  return (
    <>
      < Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/registerMasjid' element={<RegisterMasjid />} />
        <Route path='/myMasajid' element={<MyMasajid />} />
        <Route path='/masajid' element={<Masajid />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/profile/:id' element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
