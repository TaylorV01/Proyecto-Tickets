import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import MesaAyudaPage from './pages/MesaAyudaPage';
import TecnicoPage from './pages/TecnicoPage';
import AccesoDenegado from './pages/AccesoDenegado';
import './App.css';
import './SistemaTickets.css';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            {/* Rutas protegidas por rol */}
            <Route element={<ProtectedRoute roles="admin" />}> 
              <Route path="/admin/*" element={<AdminPage />} />
            </Route>
            <Route element={<ProtectedRoute roles="mesa" />}> 
              <Route path="/mesa-ayuda/*" element={<MesaAyudaPage />} />
            </Route>
            <Route element={<ProtectedRoute roles="tecnico" />}> 
              <Route path="/tecnico/*" element={<TecnicoPage />} />
            </Route>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/acceso-denegado" element={<AccesoDenegado />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
