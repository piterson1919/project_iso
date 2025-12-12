import { Link } from 'react-router-dom';
import "../style/navigation.css"; // CSS aparte para la barra lateral

export function Navigation() {
  return (
    <nav className="sidebar">
      <h1 className="sidebar-logo">QMS</h1>
      <ul className="sidebar-links">
        <li><Link to="/main">Dejar sesión</Link></li>
        <li><Link to="/createObservations">Crear acciones</Link></li>
        <li><Link to="/observations">Principal</Link></li>
      </ul>
    </nav>
  );
}
