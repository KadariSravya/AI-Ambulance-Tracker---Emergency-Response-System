
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import { AmbulanceProvider } from '@/contexts/AmbulanceContext';
import HomePage from '@/pages/HomePage';
import Dashboard from '@/pages/Dashboard';
import TrackingPage from '@/pages/TrackingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DriverDashboard from '@/pages/DriverDashboard';
import AdminDashboard from '@/pages/AdminDashboard';

function App() {
  return (
    <AuthProvider>
      <AmbulanceProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-red-50">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/tracking" element={<TrackingPage />} />
              <Route path="/driver" element={<DriverDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AmbulanceProvider>
    </AuthProvider>
  );
}

export default App;
