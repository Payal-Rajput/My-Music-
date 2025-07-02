import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Upload from '../pages/upload/Upload'
import Register from '../pages/register/Register'
import Search from '../pages/search/Search'



const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/search' element={<Search />} />
                <Route path="/upload" element={<Upload />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes