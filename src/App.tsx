import { Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoutes'
import Auth from './pages/Auth'
import VerifyOtp from './pages/VerifyOtp'
import Dashboard from './pages/Dashboard'
import { useMernAccess } from 'mern-access-client'
import ResetPwd from './pages/ResetPwd'
import Loader from './pages/Loader'

function App() {
  const { isLoading } = useMernAccess();

  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/verify" element={<VerifyOtp />} />
      <Route path="/reset" element={<ResetPwd />} />
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App