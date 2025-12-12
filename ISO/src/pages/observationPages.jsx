import { ListObservations } from "../components/observationsList";
import "../style/observations.css"; // importa el nuevo CSS

export function ObservationPages() {
  return (
    <div className="observation-page">
      <ListObservations />
    </div>
  );
}
