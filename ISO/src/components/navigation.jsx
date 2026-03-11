import { Link } from 'react-router-dom';
import "../style/navigation.css";

export function Navigation() {
  return (
    <nav className="sidebar">
      <h1 className="sidebar-logo">QMS</h1>

      <ul className="sidebar-links">

        <li className="nav-item">
          <Link className="nav-link" to="/observations">Principal</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/createObservations">Crear acciones</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/index">Indices</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/listMaster">Lista maestra</Link>
        </li>

        <li className="nav-item nav-logout">
          <Link className="nav-link" to="/main">Dejar sesión</Link>
        </li>
      
        
      </ul>
    </nav>
  );
}