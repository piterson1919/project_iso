import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/registerForm.css';

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: '', email: '', password: '', password2: '', cargo: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const cargos = [
    'Almacen', 'Gestion de calidad', 'Control de calidad', 'Direccion',
    'Gerencia de productos', 'Informatica y Telecomunicaciones', 'RRHH',
    'Seguridad y Salud Laboral', 'Servicios generales', 'Ventas y Distribucion'
  ];

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(
        'http://localhost:8000/api/app/Register/',
        form
      );

      // ✅ Limpiar sesión anterior
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // ✅ Guardar token y usuario nuevo
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // ✅ Redirigir
      navigate('/observations');

    } catch (error) {
      const data = error.response?.data;
      setError(
        typeof data === 'string'
          ? data
          : typeof data === 'object'
          ? Object.values(data).flat().join(' | ')
          : 'Error desconocido'
      );
    }
  };

  return (
    <div className="register-background">
      <div className="register-container">
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <h1>Registro</h1>

            <input name="username" placeholder="Usuario" value={form.username} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
            <input name="password2" type="password" placeholder="Confirmar contraseña" value={form.password2} onChange={handleChange} required />

            <label htmlFor="cargo">Cargo:</label>
            <select name="cargo" value={form.cargo} onChange={handleChange} required>
              <option value="">Seleccione un cargo</option>
              {cargos.map((cargo, i) => (
                <option key={i} value={cargo}>{cargo}</option>
              ))}
            </select>

            {error && <p className="error-message">{error}</p>}
            <button type="submit">Registrar</button>
          </form>
        </div>

        <div className="image-section">
          <img src="/public/Imagen1.bmp" alt="Decoración" />
        </div>
      </div>
    </div>
  );
}
