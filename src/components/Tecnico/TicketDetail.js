import React from 'react';

const TicketDetail = ({ ticket, onClose }) => {
  if (!ticket) return null;
  return (
    <div className="ticket-detail-container">
      <div className="ticket-details">
        <h3 style={{ marginBottom: 15, color: '#1f2937' }}>Detalles del Ticket</h3>
        <div className="detail-row">
          <span className="detail-label">Cliente:</span>
          <span className="detail-value">{ticket.cliente}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Categoría:</span>
          <span className="detail-value">{ticket.categoria}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Dependencia:</span>
          <span className="detail-value">{ticket.dependencia}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Recurso:</span>
          <span className="detail-value">{ticket.recurso}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Problema:</span>
          <span className="detail-value">{ticket.descripcion}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Fecha:</span>
          <span className="detail-value">{ticket.fecha}</span>
        </div>
      </div>
      <form className="form-container">
        <div className="form-group">
          <label>Estado del Ticket</label>
          <select className="form-control" defaultValue={ticket.estado}>
            <option>Pendiente</option>
            <option>En Proceso</option>
            <option>Finalizado</option>
          </select>
        </div>
        <div className="form-group">
          <label>Tiempo Invertido (horas)</label>
          <input type="number" className="form-control" placeholder="Ej: 1.5" step="0.5" />
        </div>
        <div className="form-group">
          <label>Novedades y Observaciones</label>
          <textarea className="form-control" rows="3" placeholder="Registre las acciones realizadas..."></textarea>
        </div>
        <div className="form-group">
          <label>Solución Aplicada</label>
          <textarea className="form-control" rows="2" placeholder="Describa la solución final..."></textarea>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-success" style={{ width: '100%' }}>Actualizar Ticket</button>
          <button type="button" className="btn btn-warning" style={{ width: '100%' }} onClick={onClose}>Cerrar</button>
        </div>
      </form>
    </div>
  );
};

export default TicketDetail;
