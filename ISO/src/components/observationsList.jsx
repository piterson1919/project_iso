import { useEffect, useState } from "react";
import { Allobservations } from "../api/observations.pi";
import { ObservationCard } from "./observationsCard";
import "../style/listObservations.css";

export function ListObservations() {
  const [observations, setObservations] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function LoadObservations() {
      const res = await Allobservations();
      setObservations(res.data);
      console.log("DATA:", res.data);
    }
    LoadObservations();
  }, []);

  // 🔍 
  const filtered = observations.filter((obs) => {
    const text = filter.toLowerCase();

    return (
      obs.title.toLowerCase().includes(text) ||
      obs.type.toLowerCase().includes(text) ||
      obs.staste.toLowerCase().includes(text) ||
      obs.observaciones.toLowerCase().includes(text) ||
      obs.standart.toLowerCase().includes(text) ||
      obs.departament.toLowerCase().includes(text)
    );
  });

  const ordered = filtered.sort((a, b) => b.id - a.id);

  return (
    <div className="observations-list">

      {/* 🔎 Barra de filtro */}
      <input
        type="text"
        className="filter-input"
        placeholder="Filtrar observaciones..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {/* Lista filtrada y ordenada */}
      {ordered.length === 0 ? (
        <p className="empty-list">No hay observaciones que coincidan</p>
      ) : (
        ordered.map((obs) => (
          <ObservationCard key={obs.id} observations={obs} />
        ))
      )}
    </div>
  );
}