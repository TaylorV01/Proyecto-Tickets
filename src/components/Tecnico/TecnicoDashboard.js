import React from 'react';

const TecnicoDashboard = ({ tickets = [], onShowDetail }) => {
  return (
    <div className="tecnico-dashboard-container">
      <div className="navbar">
        <div className="navbar-brand">Panel Técnico</div>
        <div className="navbar-user">Técnico: Carlos Soporte</div>
      </div>
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-number">{tickets.length}</div>
          <div className="stat-label">Asignados</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{tickets.filter(t => t.estado === 'En Proceso').length}</div>
          <div className="stat-label">En Proceso</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">2.5</div>
          <div className="stat-label">Hrs Promedio</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{tickets.filter(t => t.estado === 'Finalizado').length}</div>
          <div className="stat-label">Resueltos</div>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Problema</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.cliente}</td>
              <td>{ticket.problema}</td>
              <td>
                <span className={`status status-${ticket.estado.toLowerCase().replace(' ', '-')}`}>{ticket.estado}</span>
              </td>
              <td>
                {ticket.estado === 'Pendiente' && (
                  <button className="btn btn-info" style={{ fontSize: 12, padding: '5px 10px' }} onClick={() => onShowDetail(ticket)}>Ver</button>
                )}
                {ticket.estado === 'En Proceso' && (
                  <button className="btn btn-warning" style={{ fontSize: 12, padding: '5px 10px' }} onClick={() => onShowDetail(ticket)}>Continuar</button>
                )}
                {ticket.estado === 'Finalizado' && (
                  <button className="btn btn-success" style={{ fontSize: 12, padding: '5px 10px' }} onClick={() => onShowDetail(ticket)}>Revisar</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TecnicoDashboard;
