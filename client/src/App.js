import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Headers/Headers';
import Home from './pages/Home/Home';
import Masajid1 from './pages/Home/Masajid1';
import Edit from './pages/Edit/Edit';
import RegisterMasjid from './pages/Register/RegisterMasjid';
import Profile from './pages/Profile/Profile';
import Masajid from './pages/Content/Masajid';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
// import Login from './pages/Register/LoginModal';
// import { useState } from 'react';

function App() {
  // const [userData, setUserData] = useState(null);
  // const jwtToken = JSON.parse(localStorage.getItem('jwtToken'));

  // const fetchUser = async () => {
  //   try {
  //     const user = await axios.get('http://localhost:4000/api/authenticate', { headers: { 'Authorization': `Bearer ${jwtToken}` } })
  //     console.log(user, "user")
  //     const data = user.data;

  //     setUserData(data);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // }

  // fetchUser();

  let isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));

  return (
    <>
      < Header onAuthenticated={isAuthenticated} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/registerMasjid' element={<RegisterMasjid />} />
        <Route path='/masajid' element={<Masajid />} />
        <Route path='/home1' element={<Masajid1 />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/profile/:id' element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
