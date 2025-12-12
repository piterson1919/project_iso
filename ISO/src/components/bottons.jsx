
import { useNavigate } from "react-router-dom";
import '../style/bottons.css'; 

export function RegisterButton() {
  const navigate = useNavigate();
  return (
    <button className="register-button" onClick={() => navigate('/register')}>
      Registrarse
    </button>
  );
}

export function LoginButton() {
  const navigate = useNavigate();
  return (
    <button className="login-button" onClick={() => navigate('/login')}>
      Ingresar
    </button>
  );
}
