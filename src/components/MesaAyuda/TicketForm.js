import React from 'react';

const TicketForm = ({ onNuevoCliente, onClose }) => {
  return (
    <div className="ticket-form-container">
      <div className="ticket-form-header">📝 Crear Ticket</div>
      <form className="form-container">
        <div className="form-group">
          <label>Cliente</label>
          <div style={{ display: 'flex', gap: 10 }}>
            <input type="text" className="form-control" placeholder="Buscar cliente existente" style={{ flex: 1 }} />
            <button className="btn btn-info" type="button" onClick={onNuevoCliente}>Nuevo</button>
          </div>
        </div>
        <div className="form-group">
          <label>Categoría Principal</label>
          <select className="form-control">
            <option>Hardware</option>
            <option>Software</option>
            <option>Redes</option>
          </select>
        </div>
        <div className="form-group">
          <label>Subcategoría</label>
          <select className="form-control">
            <option>Impresoras</option>
            <option>Computadores</option>
            <option>Servidores</option>
          </select>
        </div>
        <div className="form-group">
          <label>Dependencia</label>
          <select className="form-control">
            <option>Sistemas</option>
            <option>Contabilidad</option>
            <option>RRHH</option>
          </select>
        </div>
        <div className="form-group">
          <label>Recurso</label>
          <select className="form-control">
            <option>Impresora HP-001</option>
            <option>PC-CONT-05</option>
          </select>
        </div>
        <div className="form-group">
          <label>Descripción del Problema</label>
          <textarea className="form-control" rows="3" placeholder="Describa detalladamente el problema..."></textarea>
        </div>
        <div className="form-group">
          <label>Asignar Técnico</label>
          <select className="form-control">
            <option>Carlos Técnico</option>
            <option>Ana Sistemas</option>
            <option>Luis Soporte</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-success" style={{ width: '100%' }}>Crear Ticket</button>
          <button type="button" className="btn btn-warning" style={{ width: '100%' }} onClick={onClose}>Cerrar</button>
        </div>
      </form>
    </div>
  );
};

export default TicketForm;
