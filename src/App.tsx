import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cards from './components/Cards';
import ConnectUser from './components/ConnectUser';
import DarkMode from './components/DarkMode';
import Home from './components/Home';
import Navbar from './components/Navbar';
import OnlyAdmin from './components/OnlyAdmin';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import AuthContext from './context/authContext';

function App() {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <>
      <Navbar />

      <Routes>
         <Route path="/" element={<Home />} /> 
        <Route path="/cards" element={<Cards />} />
        <Route path="/connect" element={<ConnectUser />} />
        {!isLoggedIn && <Route path="/signin" element={<SignIn />} />}
        {!isLoggedIn && <Route path="/signup" element={<SignUp />} />}
        {isLoggedIn && <Route path="/onlyadmin" element={<OnlyAdmin />}/> }
      </Routes>

    </>
  );
}

export default App;
