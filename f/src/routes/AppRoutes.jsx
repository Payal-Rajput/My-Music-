import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Upload from '../pages/upload/Upload'
import Register from '../pages/register/Register'
import Search from '../pages/search/Search'
import Protected from '../components/Protected'



const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Protected><Home /></Protected>} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/search' element={<Protected><Search /></Protected>} />
                <Route path="/upload" element={<Protected><Upload /></Protected>} />
            </Routes>
        </Router>
    )
}

export default AppRoutes