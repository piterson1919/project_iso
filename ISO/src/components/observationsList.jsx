import { useEffect, useState } from "react";
import { Allobservations } from "../api/observations.pi";
import { ObservationCard } from "./observationsCard";
import "../style/listObservations.css"; 

export function ListObservations() {
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    async function LoadObservations() {
      const res = await Allobservations();
      setObservations(res.data);
      console.log("DATA:", res.data);

    }
    LoadObservations();
  }, []);

  return (
    <div className="observations-list">
      {observations.length === 0 ? (
        <p className="empty-list">No hay observaciones aún</p>
      ) : (
        observations.map((obs) => (
          <ObservationCard key={obs.id} observations={obs} />
        ))
      )}
    </div>
  );
}
