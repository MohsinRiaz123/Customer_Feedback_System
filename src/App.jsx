// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogIn from './Pages/LogIn';
import './App.css'
import Signup from './Pages/Signup';
import ForgetPassword from './Pages/ForgetPassword';
import OTP from './Pages/OTP';
import Reset from './Pages/ResetPasswoed';
import ResetMassage from './Pages/ResetMassage';
import UserManagement from './Pages/Dashboard';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/forgot" element={<ForgetPassword />} />
          <Route path="/emailsend" element={<OTP />} />
          <Route path="/resetPassword" element={<Reset />} />
          <Route path="/resetconfirmation" element={<ResetMassage />} />
          <Route path="/dashBoard" element={<UserManagement/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
