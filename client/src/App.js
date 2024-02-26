import Home from './Components/HomePage'
import FacilityLogin from './Components/FacilityLogin'
import FacilitySignup from './Components/FacilitySignup'
import About from './Components/About'
import UserLogin from './Components/UserLogin'
import UserSignup from './Components/UserSignup'

import RequestFacility from  './Components/RequestFacility'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import Userdashboard from './Components/Userdashboard'
import Facilitydashboard from './Components/Facilitydashboard'
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/facility/login" element={<FacilityLogin/>} />
          <Route path="/facility/Signup" element={<FacilitySignup/>} />
          <Route path="/User/login" element={<UserLogin/>} />
          <Route path="/User/signup" element={<UserSignup/>} />
          <Route path="/about" element={<About />}/>
          <Route path="/User/:UserID" element={<Userdashboard/>}/>
          <Route path="/facility/:FacilityID" element={<Facilitydashboard />}/>
          <Route path="/User/facility/:Facility_ID/:UserID" element={<RequestFacility/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
