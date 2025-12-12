import { useNavigate } from "react-router-dom"
import "../style/observationsCard.css"; 

export function ObservationCard({ observations }) {
  const navigate = useNavigate();

  return (
    <div
      className="observation-card"
      onClick={() => navigate(`/observation/${observations.id}`)}
    >
      <img src="/public/Imagen1.bmp" className="card-logo" />
      <h2 className="card-title">{observations.title}</h2>
      <p className="card-type">{observations.type}</p>
      <p className="card-detail">{observations.observaciones}</p>
      <p className="card-status">{observations.staste}</p>
      <p className="card-standart">{observations.standart}</p>
    </div>
  );
}
