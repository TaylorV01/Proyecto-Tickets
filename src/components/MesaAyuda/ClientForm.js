import React from 'react';

const ClientForm = ({ onClienteCreado, onClose }) => {
  return (
    <div className="client-form-container">
      <div className="client-form-header">➕ Nuevo Cliente</div>
      <form className="form-container" onSubmit={e => { e.preventDefault(); onClienteCreado(); }}>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" className="form-control" placeholder="Nombre completo" />
        </div>
        <div className="form-group">
          <label>Dependencia</label>
          <select className="form-control">
            <option>Sistemas</option>
            <option>Contabilidad</option>
            <option>Recursos Humanos</option>
            <option>Ventas</option>
          </select>
        </div>
        <div className="form-group">
          <label>Contacto</label>
          <input type="text" className="form-control" placeholder="Correo o teléfono" />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-success" style={{ width: '100%' }}>Crear Cliente</button>
          <button type="button" className="btn btn-warning" style={{ width: '100%' }} onClick={onClose}>Cerrar</button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
