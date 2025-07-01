import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccesoDenegado = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <h1 style={{ color: '#b91c1c', fontSize: 36, marginBottom: 16 }}>Acceso Denegado</h1>
      <p style={{ color: '#374151', fontSize: 18, marginBottom: 32 }}>
        No tienes permisos para acceder a esta página.<br />
        Si crees que esto es un error, contacta al administrador.
      </p>
      <button
        onClick={() => navigate(-1)}
        style={{ padding: '10px 24px', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}
      >
        Volver
      </button>
    </div>
  );
};

export default AccesoDenegado; 