import React from 'react';

const MesaDashboard = ({ onCrearTicket }) => {
  return (
    <div className="mesa-dashboard-container">
      <div className="navbar">
        <div className="navbar-brand">Mesa de Ayuda</div>
        <div className="navbar-user">Usuario: mesa_ayuda01</div>
      </div>
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">15</div>
          <div className="stat-label">Tickets Hoy</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">8</div>
          <div className="stat-label">Pendientes</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">12</div>
          <div className="stat-label">En Proceso</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">45</div>
          <div className="stat-label">Finalizados</div>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <button className="btn btn-primary" onClick={onCrearTicket}>➕ Crear Nuevo Ticket</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Categoría</th>
            <th>Estado</th>
            <th>Técnico</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#001</td>
            <td>Juan Pérez</td>
            <td>Hardware</td>
            <td><span className="status status-pending">Pendiente</span></td>
            <td>Carlos Tech</td>
          </tr>
          <tr>
            <td>#002</td>
            <td>María López</td>
            <td>Software</td>
            <td><span className="status status-progress">En Proceso</span></td>
            <td>Ana Sistemas</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default MesaDashboard;
