import ObservationsChart from "../components/index";
import "../style/indexPage.css";

export function DashboardPage() {
  return (
    <div className="dashboard-page">

      <div className="dashboard-header">
        <h1 className="dashboard-title">Panel de Observaciones</h1>
        <p className="dashboard-subtitle">
          Visualización y seguimiento de observaciones registradas en el sistema
        </p>
      </div>

      <div className="dashboard-content">
        <ObservationsChart />
      </div>

    </div>
  );
}