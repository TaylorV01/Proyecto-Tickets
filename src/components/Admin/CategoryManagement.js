import React from 'react';

const CategoryManagement = ({ onClose }) => {
  return (
    <div className="category-management-container">
      <div className="category-form-header">➕ Crear Categoría</div>
      <form className="form-container">
        <div className="form-group">
          <label>Tipo de Categoría</label>
          <select className="form-control">
            <option>Hardware</option>
            <option>Software</option>
            <option>Redes</option>
          </select>
        </div>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" className="form-control" placeholder="Ej: Impresoras, Servidores..." />
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
          <label>Datos Técnicos</label>
          <textarea className="form-control" rows="3" placeholder="Especificaciones técnicas..."></textarea>
        </div>
        <div className="form-group">
          <label>Agencia</label>
          <input type="text" className="form-control" placeholder="Ubicación o agencia" />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-success" style={{ width: '100%' }}>Crear Categoría</button>
          <button type="button" className="btn btn-warning" style={{ width: '100%' }} onClick={onClose}>Cerrar</button>
        </div>
      </form>
    </div>
  );
};

export default CategoryManagement;
