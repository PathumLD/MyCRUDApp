import React from 'react'
// import Footer from './Footer';
import Navbar from './Navbar';
import { BrowserRouter, Link, Route, Routes, Router } from "react-router-dom";
import Home from '../views/Home';
import StudentList from '../views/StudentList';
import CreateStudent from '../views/CreateStudent';
import UpdateStudent from '../views/UpdateStudent';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import UsersList from '../views/UsersList';

const Routing = () => {
  return (
    <div>
            <Navbar />

                <Routes>
                    <Route path="/" default element={<Home />} />
                    <Route path="/login" element={<Login/>}></Route>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/userlist" element={<UsersList />} />
                    <Route path="/studentlist" element={<StudentList />} />
                    <Route path="/create" element={<CreateStudent />} />
                    <Route path="/update/:studentId" element={<UpdateStudent />} />
                </Routes>
            
            {/* <Footer /> */}
    </div>
  )
}

export default Routing
