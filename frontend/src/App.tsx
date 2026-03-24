import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export default function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem('token'))
    }, [])


    return (
        <Routes>
        <Route path="/" element={
            isAuthenticated ? <Navigate to="/app" /> : <Login />
        } />
        <Route path="/app" element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/" />
        } />
        </Routes>
    )
}
