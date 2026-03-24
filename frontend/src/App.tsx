import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export default function App() {
    const isAuthenticated = !!localStorage.getItem('token')

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
