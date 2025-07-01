import React, { useState } from 'react';
import AdminDashboard from '../components/Admin/AdminDashboard';

const mockUsuarios = [
  {
    id: 1,
    nombre: 'Carlos Tech',
    usuario: 'ctech',
    rol: 'Técnico',
    dependencia: 'Sistemas',
    correo: 'carlos@sistema.com',
    password: '1234',
  },
  {
    id: 2,
    nombre: 'Ana Mesa',
    usuario: 'amesa',
    rol: 'Mesa de Ayuda',
    dependencia: 'Contabilidad',
    correo: 'ana@conta.com',
    password: '5678',
  },
];

const UserManagement = ({ onClose }) => {
  const [usuarios, setUsuarios] = useState(mockUsuarios);
  const [showForm, setShowForm] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleCrear = () => {
    setEditUser(null);
    setShowForm(true);
  };
  const handleEditar = (user) => {
    setEditUser(user);
    setShowForm(true);
  };
  const handleEliminar = (id) => {
    setUsuarios(usuarios.filter(u => u.id !== id));
  };
  const handleGuardar = (e) => {
    e.preventDefault();
    const form = e.target;
    const passwordValue = form.password.value;
    const nuevo = {
      id: editUser ? editUser.id : Date.now(),
      nombre: form.nombre.value,
      usuario: form.usuario.value,
      rol: form.rol.value,
      dependencia: form.dependencia.value,
      correo: form.correo.value,
      password: editUser
        ? (passwordValue ? passwordValue : editUser.password)
        : passwordValue,
    };
    if (editUser) {
      setUsuarios(usuarios.map(u => u.id === editUser.id ? nuevo : u));
    } else {
      setUsuarios([...usuarios, nuevo]);
    }
    setShowForm(false);
    setEditUser(null);
  };
  const handleCancelar = () => {
    setShowForm(false);
    setEditUser(null);
  };

  return (
    <div className="category-management-container">
      <div className="category-form-header">👥 Gestión de Usuarios</div>
      {!showForm ? (
        <>
          <div style={{ textAlign: 'right', marginBottom: 15 }}>
            <button className="btn btn-primary" onClick={handleCrear}>➕ Crear Nuevo Usuario</button>
          </div>
          <table className="table">
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, #1f2937, #374151)', color: 'white' }}>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Rol</th>
                <th>Dependencia</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(u => (
                <tr key={u.id}>
                  <td>{u.nombre}</td>
                  <td>{u.usuario}</td>
                  <td>{u.rol}</td>
                  <td>{u.dependencia}</td>
                  <td>{u.correo}</td>
                  <td>
                    <button className="btn btn-warning" style={{ fontSize: 12, padding: '5px 10px', marginRight: 5 }} onClick={() => handleEditar(u)}>Editar</button>
                    <button className="btn btn-danger" style={{ fontSize: 12, padding: '5px 10px' }} onClick={() => handleEliminar(u.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 20 }}>
            <button className="btn btn-warning" style={{ width: '100%' }} onClick={onClose}>Cerrar</button>
          </div>
        </>
      ) : (
        <form className="form-container" onSubmit={handleGuardar}>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" className="form-control" name="nombre" defaultValue={editUser?.nombre || ''} required />
          </div>
          <div className="form-group">
            <label>Usuario</label>
            <input type="text" className="form-control" name="usuario" defaultValue={editUser?.usuario || ''} required />
          </div>
          <div className="form-group">
            <label>Contraseña {editUser ? <span style={{ color: '#888', fontWeight: 400 }}>(dejar vacío para no cambiar)</span> : <span style={{ color: 'red' }}>*</span>}</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder={editUser ? 'Nueva contraseña (opcional)' : 'Contraseña'}
              required={!editUser}
            />
          </div>
          <div className="form-group">
            <label>Rol</label>
            <select className="form-control" name="rol" defaultValue={editUser?.rol || 'Técnico'} required>
              <option>Técnico</option>
              <option>Mesa de Ayuda</option>
            </select>
          </div>
          <div className="form-group">
            <label>Dependencia asignada</label>
            <input type="text" className="form-control" name="dependencia" defaultValue={editUser?.dependencia || ''} required />
          </div>
          <div className="form-group">
            <label>Correo/Contacto</label>
            <input type="email" className="form-control" name="correo" defaultValue={editUser?.correo || ''} required />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-success" style={{ width: '100%' }}>{editUser ? 'Actualizar' : 'Crear'} Usuario</button>
            <button type="button" className="btn btn-warning" style={{ width: '100%' }} onClick={handleCancelar}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
};

const mockDependencias = [
  {
    id: 1,
    nombre: 'Sistemas',
    descripcion: 'Área de tecnología',
    area: 'Tecnología',
  },
  {
    id: 2,
    nombre: 'Contabilidad',
    descripcion: 'Área financiera',
    area: 'Finanzas',
  },
];

const DependencyManagement = ({ onClose }) => {
  const [dependencias, setDependencias] = useState(mockDependencias);
  const [showForm, setShowForm] = useState(false);
  const [editDep, setEditDep] = useState(null);

  const handleCrear = () => {
    setEditDep(null);
    setShowForm(true);
  };
  const handleEditar = (dep) => {
    setEditDep(dep);
    setShowForm(true);
  };
  const handleEliminar = (id) => {
    setDependencias(dependencias.filter(d => d.id !== id));
  };
  const handleGuardar = (e) => {
    e.preventDefault();
    const form = e.target;
    const nuevo = {
      id: editDep ? editDep.id : Date.now(),
      nombre: form.nombre.value,
      descripcion: form.descripcion.value,
      area: form.area.value,
    };
    if (editDep) {
      setDependencias(dependencias.map(d => d.id === editDep.id ? nuevo : d));
    } else {
      setDependencias([...dependencias, nuevo]);
    }
    setShowForm(false);
    setEditDep(null);
  };
  const handleCancelar = () => {
    setShowForm(false);
    setEditDep(null);
  };

  return (
    <div className="category-management-container">
      <div className="category-form-header">🏢 Gestión de Dependencias</div>
      {!showForm ? (
        <>
          <div style={{ textAlign: 'right', marginBottom: 15 }}>
            <button className="btn btn-primary" onClick={handleCrear}>➕ Crear Nueva Dependencia</button>
          </div>
          <table className="table">
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, #1f2937, #374151)', color: 'white' }}>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Área/Departamento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dependencias.map(d => (
                <tr key={d.id}>
                  <td>{d.nombre}</td>
                  <td>{d.descripcion}</td>
                  <td>{d.area}</td>
                  <td>
                    <button className="btn btn-warning" style={{ fontSize: 12, padding: '5px 10px', marginRight: 5 }} onClick={() => handleEditar(d)}>Editar</button>
                    <button className="btn btn-danger" style={{ fontSize: 12, padding: '5px 10px' }} onClick={() => handleEliminar(d.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 20 }}>
            <button className="btn btn-warning" style={{ width: '100%' }} onClick={onClose}>Cerrar</button>
          </div>
        </>
      ) : (
        <form className="form-container" onSubmit={handleGuardar}>
          <div className="form-group">
            <label>Nombre de la Dependencia</label>
            <input type="text" className="form-control" name="nombre" defaultValue={editDep?.nombre || ''} required />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <input type="text" className="form-control" name="descripcion" defaultValue={editDep?.descripcion || ''} />
          </div>
          <div className="form-group">
            <label>Área/Departamento</label>
            <input type="text" className="form-control" name="area" defaultValue={editDep?.area || ''} required />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-success" style={{ width: '100%' }}>{editDep ? 'Actualizar' : 'Crear'} Dependencia</button>
            <button type="button" className="btn btn-warning" style={{ width: '100%' }} onClick={handleCancelar}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
};

const mockRecursos = [
  {
    id: 1,
    nombre: 'Impresora HP-001',
    tipo: 'Equipo',
    categoria: 'Hardware',
    dependencia: 'Sistemas',
    datos: 'HP LaserJet Pro',
    estado: 'Activo',
  },
  {
    id: 2,
    nombre: 'PC-CONT-05',
    tipo: 'Equipo',
    categoria: 'Hardware',
    dependencia: 'Contabilidad',
    datos: 'Intel i5, 8GB RAM',
    estado: 'Inactivo',
  },
];

const ResourceManagement = ({ onClose }) => {
  const [recursos, setRecursos] = useState(mockRecursos);
  const [showForm, setShowForm] = useState(false);
  const [editRec, setEditRec] = useState(null);

  const handleCrear = () => {
    setEditRec(null);
    setShowForm(true);
  };
  const handleEditar = (rec) => {
    setEditRec(rec);
    setShowForm(true);
  };
  const handleEliminar = (id) => {
    setRecursos(recursos.filter(r => r.id !== id));
  };
  const handleGuardar = (e) => {
    e.preventDefault();
    const form = e.target;
    const nuevo = {
      id: editRec ? editRec.id : Date.now(),
      nombre: form.nombre.value,
      tipo: form.tipo.value,
      categoria: form.categoria.value,
      dependencia: form.dependencia.value,
      datos: form.datos.value,
      estado: form.estado.value,
    };
    if (editRec) {
      setRecursos(recursos.map(r => r.id === editRec.id ? nuevo : r));
    } else {
      setRecursos([...recursos, nuevo]);
    }
    setShowForm(false);
    setEditRec(null);
  };
  const handleCancelar = () => {
    setShowForm(false);
    setEditRec(null);
  };

  return (
    <div className="category-management-container">
      <div className="category-form-header">💻 Gestión de Recursos</div>
      {!showForm ? (
        <>
          <div style={{ textAlign: 'right', marginBottom: 15 }}>
            <button className="btn btn-primary" onClick={handleCrear}>➕ Crear Nuevo Recurso</button>
          </div>
          <table className="table">
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, #1f2937, #374151)', color: 'white' }}>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Categoría</th>
                <th>Dependencia</th>
                <th>Datos Técnicos</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {recursos.map(r => (
                <tr key={r.id}>
                  <td>{r.nombre}</td>
                  <td>{r.tipo}</td>
                  <td>{r.categoria}</td>
                  <td>{r.dependencia}</td>
                  <td>{r.datos}</td>
                  <td>{r.estado}</td>
                  <td>
                    <button className="btn btn-warning" style={{ fontSize: 12, padding: '5px 10px', marginRight: 5 }} onClick={() => handleEditar(r)}>Editar</button>
                    <button className="btn btn-danger" style={{ fontSize: 12, padding: '5px 10px' }} onClick={() => handleEliminar(r.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 20 }}>
            <button className="btn btn-warning" style={{ width: '100%' }} onClick={onClose}>Cerrar</button>
          </div>
        </>
      ) : (
        <form className="form-container" onSubmit={handleGuardar}>
          <div className="form-group">
            <label>Nombre del Recurso</label>
            <input type="text" className="form-control" name="nombre" defaultValue={editRec?.nombre || ''} required />
          </div>
          <div className="form-group">
            <label>Tipo</label>
            <select className="form-control" name="tipo" defaultValue={editRec?.tipo || 'Equipo'} required>
              <option>Equipo</option>
              <option>Sistema</option>
              <option>Otro</option>
            </select>
          </div>
          <div className="form-group">
            <label>Categoría Asociada</label>
            <input type="text" className="form-control" name="categoria" defaultValue={editRec?.categoria || ''} required />
          </div>
          <div className="form-group">
            <label>Dependencia Asociada</label>
            <input type="text" className="form-control" name="dependencia" defaultValue={editRec?.dependencia || ''} required />
          </div>
          <div className="form-group">
            <label>Datos Técnicos</label>
            <input type="text" className="form-control" name="datos" defaultValue={editRec?.datos || ''} required />
          </div>
          <div className="form-group">
            <label>Estado</label>
            <select className="form-control" name="estado" defaultValue={editRec?.estado || 'Activo'} required>
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-success" style={{ width: '100%' }}>{editRec ? 'Actualizar' : 'Crear'} Recurso</button>
            <button type="button" className="btn btn-warning" style={{ width: '100%' }} onClick={handleCancelar}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
};

const mockCategorias = [
  {
    id: 1,
    tipo: 'Hardware',
    nombre: 'Impresoras',
    dependencia: 'Sistemas',
    datos: 'HP, Epson, Canon',
    agencia: 'Matriz',
  },
  {
    id: 2,
    tipo: 'Software',
    nombre: 'ERP',
    dependencia: 'Contabilidad',
    datos: 'SAP, Oracle',
    agencia: 'Sucursal Norte',
  },
];

const CategoryManagement = ({ onClose }) => {
  const [categorias, setCategorias] = useState(mockCategorias);
  const [showForm, setShowForm] = useState(false);
  const [editCat, setEditCat] = useState(null);

  const handleCrear = () => {
    setEditCat(null);
    setShowForm(true);
  };
  const handleEditar = (cat) => {
    setEditCat(cat);
    setShowForm(true);
  };
  const handleEliminar = (id) => {
    setCategorias(categorias.filter(c => c.id !== id));
  };
  const handleGuardar = (e) => {
    e.preventDefault();
    const form = e.target;
    const nuevo = {
      id: editCat ? editCat.id : Date.now(),
      tipo: form.tipo.value,
      nombre: form.nombre.value,
      dependencia: form.dependencia.value,
      datos: form.datos.value,
      agencia: form.agencia.value,
    };
    if (editCat) {
      setCategorias(categorias.map(c => c.id === editCat.id ? nuevo : c));
    } else {
      setCategorias([...categorias, nuevo]);
    }
    setShowForm(false);
    setEditCat(null);
  };
  const handleCancelar = () => {
    setShowForm(false);
    setEditCat(null);
  };

  return (
    <div className="category-management-container">
      <div className="category-form-header">📂 Gestión de Categorías</div>
      {!showForm ? (
        <>
          <div style={{ textAlign: 'right', marginBottom: 15 }}>
            <button className="btn btn-primary" onClick={handleCrear}>➕ Crear Nueva Categoría</button>
          </div>
          <table className="table">
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, #1f2937, #374151)', color: 'white' }}>
                <th>Tipo</th>
                <th>Nombre</th>
                <th>Dependencia</th>
                <th>Datos Técnicos</th>
                <th>Agencia</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map(c => (
                <tr key={c.id}>
                  <td>{c.tipo}</td>
                  <td>{c.nombre}</td>
                  <td>{c.dependencia}</td>
                  <td>{c.datos}</td>
                  <td>{c.agencia}</td>
                  <td>
                    <button className="btn btn-warning" style={{ fontSize: 12, padding: '5px 10px', marginRight: 5 }} onClick={() => handleEditar(c)}>Editar</button>
                    <button className="btn btn-danger" style={{ fontSize: 12, padding: '5px 10px' }} onClick={() => handleEliminar(c.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 20 }}>
            <button className="btn btn-warning" style={{ width: '100%' }} onClick={onClose}>Cerrar</button>
          </div>
        </>
      ) : (
        <form className="form-container" onSubmit={handleGuardar}>
          <div className="form-group">
            <label>Tipo de Categoría</label>
            <select className="form-control" name="tipo" defaultValue={editCat?.tipo || 'Hardware'} required>
              <option>Hardware</option>
              <option>Software</option>
              <option>Redes</option>
            </select>
          </div>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" className="form-control" name="nombre" defaultValue={editCat?.nombre || ''} required />
          </div>
          <div className="form-group">
            <label>Dependencia</label>
            <input type="text" className="form-control" name="dependencia" defaultValue={editCat?.dependencia || ''} required />
          </div>
          <div className="form-group">
            <label>Datos Técnicos</label>
            <input type="text" className="form-control" name="datos" defaultValue={editCat?.datos || ''} required />
          </div>
          <div className="form-group">
            <label>Agencia</label>
            <input type="text" className="form-control" name="agencia" defaultValue={editCat?.agencia || ''} required />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-success" style={{ width: '100%' }}>{editCat ? 'Actualizar' : 'Crear'} Categoría</button>
            <button type="button" className="btn btn-warning" style={{ width: '100%' }} onClick={handleCancelar}>Cancelar</button>
          </div>
        </form>
      )}
    </div>
  );
};

const AdminPage = () => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showDependencyForm, setShowDependencyForm] = useState(false);
  const [showResourceForm, setShowResourceForm] = useState(false);

  const handleConfigurarCategoria = () => {
    setShowCategoryForm(true);
  };
  const handleGestionarUsuarios = () => {
    setShowUserForm(true);
  };
  const handleGestionarDependencias = () => {
    setShowDependencyForm(true);
  };
  const handleGestionarRecursos = () => {
    setShowResourceForm(true);
  };

  const handleCerrarCategoria = () => setShowCategoryForm(false);
  const handleCerrarUsuario = () => setShowUserForm(false);
  const handleCerrarDependencia = () => setShowDependencyForm(false);
  const handleCerrarRecurso = () => setShowResourceForm(false);

  return (
    <div className="admin-page">
      <AdminDashboard
        onConfigurarCategoria={handleConfigurarCategoria}
        onGestionarUsuarios={handleGestionarUsuarios}
        onGestionarDependencias={handleGestionarDependencias}
        onGestionarRecursos={handleGestionarRecursos}
      />
      {showCategoryForm && <CategoryManagement onClose={handleCerrarCategoria} />}
      {showUserForm && <UserManagement onClose={handleCerrarUsuario} />}
      {showDependencyForm && <DependencyManagement onClose={handleCerrarDependencia} />}
      {showResourceForm && <ResourceManagement onClose={handleCerrarRecurso} />}
    </div>
  );
};

export default AdminPage;
