// Navigation_superior.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import "../style/navigation_supirior.css";

export function Navigation_superior() {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          "http://localhost:8000/api/app/user/",
          { headers: { Authorization: `Token ${token}` } }
        );

        setUsername(res.data.username || res.data.user?.username);

      } catch (error) {
        console.log("Error al obtener usuario");
      }
    }

    fetchUser();
  }, []);

  return (
    <header className="topbar">
      <h2 className="topbar-title">Foot Safe</h2>

      <div className="topbar-user">
        <span className="user-icon">👤</span>
        <span className="user-name">{username || "Usuario"}</span>
        <span className="user-arrow">▼</span>
      </div>
    </header>
  );
}