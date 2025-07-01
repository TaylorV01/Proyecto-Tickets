import React from 'react';
import Login from '../components/Auth/Login';

const LoginPage = () => {
  return (
    <div className="login-page">
      <Login />
      {/* Aquí irá la lógica de autenticación y redirección */}
    </div>
  );
};

export default LoginPage;
