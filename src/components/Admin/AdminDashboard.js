import React from 'react';

const AdminDashboard = ({ onConfigurarCategoria, onGestionarUsuarios, onGestionarDependencias, onGestionarRecursos }) => {
  return (
    <div className="admin-dashboard-container">
      <div className="navbar">
        <div className="navbar-brand">Admin Panel</div>
        <div className="navbar-user">Bienvenido, Administrador</div>
      </div>
      <div className="admin-grid">
        <div className="admin-card">
          <h3>👥 Gestión de Usuarios</h3>
          <p className="admin-card-desc">Técnicos y Mesa de Ayuda</p>
          <button className="btn btn-primary" onClick={onGestionarUsuarios}>Administrar</button>
        </div>
        <div className="admin-card">
          <h3>📂 Categorías</h3>
          <p className="admin-card-desc">Hardware, Software, Redes</p>
          <button className="btn btn-info" onClick={onConfigurarCategoria}>Configurar</button>
        </div>
        <div className="admin-card">
          <h3>🏢 Dependencias</h3>
          <p className="admin-card-desc">Áreas organizacionales</p>
          <button className="btn btn-warning" onClick={onGestionarDependencias}>Gestionar</button>
        </div>
        <div className="admin-card">
          <h3>💻 Recursos</h3>
          <p className="admin-card-desc">Equipos y sistemas</p>
          <button className="btn btn-success" onClick={onGestionarRecursos}>Administrar</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
