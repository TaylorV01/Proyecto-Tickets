import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({
    usuario: '',
    password: '',
    rol: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí normalmente iría la llamada al backend para autenticar
    // Por ahora, simulamos login exitoso
    login(form.usuario, form.rol);
    // Redirigir según el rol
    if (form.rol === 'admin') {
      navigate('/admin');
    } else if (form.rol === 'mesa') {
      navigate('/mesa-ayuda');
    } else if (form.rol === 'tecnico') {
      navigate('/tecnico');
    } else {
      navigate('/');
    }
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh',
    }}>
      <form onSubmit={handleSubmit} className="login-form" style={{
        background: 'white', borderRadius: 15, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: 40, maxWidth: 350, width: '100%'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', borderRadius: '50%', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 32 }}>🎫</div>
          <h2 style={{ color: '#1f2937', marginBottom: 5 }}>Sistema de Tickets</h2>
          <p style={{ color: '#6b7280' }}>Ingrese sus credenciales</p>
        </div>
        <div className="form-group" style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#374151' }}>Usuario</label>
          <input
            type="text"
            name="usuario"
            className="form-control"
            placeholder="Ingrese su usuario"
            value={form.usuario}
            onChange={handleChange}
            style={{ width: '100%', padding: '12px 15px', border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 14 }}
            required
          />
        </div>
        <div className="form-group" style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#374151' }}>Contraseña</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Ingrese su contraseña"
            value={form.password}
            onChange={handleChange}
            style={{ width: '100%', padding: '12px 15px', border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 14 }}
            required
          />
        </div>
        <div className="form-group" style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#374151' }}>Rol</label>
          <select
            name="rol"
            className="form-control"
            value={form.rol}
            onChange={handleChange}
            style={{ width: '100%', padding: '12px 15px', border: '2px solid #e5e7eb', borderRadius: 8, fontSize: 14 }}
            required
          >
            <option value="">Seleccione su rol</option>
            <option value="admin">Administrador</option>
            <option value="mesa">Mesa de Ayuda</option>
            <option value="tecnico">Técnico</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: '100%', marginTop: 20, background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', padding: '12px 24px', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
