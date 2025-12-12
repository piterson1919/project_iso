import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/loginForm.css';
import { setToken } from '../api/observations.pi';

export default function LoginForm() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ Manejar cambios en los inputs
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Enviar formulario
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:8000/api/app/Login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        console.log('Login exitoso:', data);

       
        setToken(data.token);
        localStorage.setItem("token", data.token);


        // ✅ Redirigir
        navigate('/observations');
      } else {
        setError(data.detail || 'Usuario o contraseña inválidos');
      }
    } catch (err) {
      console.error(err);
      setError('Error de conexión con el servidor.');
    }
  };

  return (
    <div className="login-background">
      <div className="login-wrapper">
        <div className="login-panel">
          <h1 className="login-title">Iniciar Sesión</h1>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Ingresa tu usuario"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="login-btn">
              Entrar
            </button>
          </form>
        </div>

        <div className="login-image">
          <img src="/Imagen1.bmp" alt="Decoración" />
        </div>
      </div>
    </div>
  );
}