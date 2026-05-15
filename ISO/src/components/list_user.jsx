import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AllUser } from "../api/users.pi"; 
import '../style/users.css'

const UserCards = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await AllUser(); 
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (!users.length) return <p>No hay usuarios registrados.</p>;

  const handleSelect = (id) => {
    navigate(`/listUser/${id}`); 
  };

  return (
    <div className="user-cards">
      {users.map(user => (
        <div
          key={user.id}
          className="user-card"
          onClick={() => handleSelect(user.id)}
          style={{ cursor: "pointer" }}
        >
          <h3>{user.username}</h3>
          <p>Email: {user.email}</p>
          <p>Cargo: {user.cargo}</p>
        </div>
      ))}
    </div>
  );
};

export default UserCards;