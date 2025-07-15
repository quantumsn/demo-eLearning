import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import InstructorDashboard from './pages/dashboards/InstructorDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/student/*" element={<Layout userRole="student"><StudentDashboard /></Layout>} />
          <Route path="/instructor/*" element={<Layout userRole="instructor"><InstructorDashboard /></Layout>} />
          <Route path="/admin/*" element={<Layout userRole="admin"><AdminDashboard /></Layout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;