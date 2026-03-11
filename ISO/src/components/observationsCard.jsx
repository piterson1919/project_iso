import { useNavigate } from "react-router-dom";
import "../style/observationsCard.css";

export function ObservationCard({ observations }) {
  const navigate = useNavigate();

  // Detectar si estamos en Electron
  const isElectron = !!window.electronAPI;

  // Obtener nombre del archivo desde la ruta
  const getFileName = (path) => {
    if (!path) return "";
    return path.split("\\").pop().split("/").pop();
  };

  // Determinar clase según estado y fecha
  const getStatusClass = () => {
    const state = observations.staste?.toLowerCase();
    const endDate = observations.end_date ? new Date(observations.end_date) : null;
    const today = new Date();

    const isClosed = state === "cerrada";
    const isCompleted = state === "completada";
    const isExpired = endDate && endDate < today;

    // === PRIORIDAD: FECHA VENCIDA PERO SOLO SI NO ES CERRADA NI COMPLETADA ===
    if (isExpired && !isClosed && !isCompleted) {
      return "card-expired";
    }

    // === ESTADOS NORMALES ===
    if (isClosed) return "card-closed";
    if (isCompleted) return "card-completed";
    if (state === "en curso") return "card-progress";

    return "";
  };

  // Manejar click del archivo
  const handleFileClick = (e, path) => {
    e.stopPropagation();
    if (!path) return;

    // ELECTRON
    if (isElectron && window.electronAPI.openSharedFile) {
      window.electronAPI.openSharedFile(path);
      return;
    }

    // GOOGLE DRIVE
    if (path.includes("drive.google.com")) {
      window.open(path, "_blank", "noopener,noreferrer");
      return;
    }

    // URL normal
    if (path.startsWith("http")) {
      const officeViewer =
        "https://view.officeapps.live.com/op/view.aspx?src=" +
        encodeURIComponent(path);

      window.open(officeViewer, "_blank", "noopener,noreferrer");
      return;
    }

    // RUTA DE RED
    if (path.startsWith("\\\\") || path.startsWith("//")) {
      alert(
        "Este archivo está en una carpeta compartida de red.\n\n" +
          "Solo puede abrirse desde la aplicación de escritorio."
      );
      return;
    }

    // RUTA LOCAL
    if (/^[A-Za-z]:\\/.test(path)) {
      alert(
        "Este archivo está en una ruta local.\n\n" +
          "Solo puede abrirse desde la aplicación de escritorio."
      );
      return;
    }

    // Último recurso
    window.open(path, "_blank");
  };

  return (
    <div
      className={`observation-card ${getStatusClass()}`}
      onClick={() => navigate(`/observation/${observations.id}`)}
    >
      {/* Logo */}
      <img src="/Imagen1.bmp" alt="Logo" className="card-logo" />

      {/* ID */}
      <div className="card-id">#{observations.id}</div>

      {/* Título */}
      <h2 className="card-title">{observations.title}</h2>

      {/* Tipo */}
      <p className="card-type">{observations.type}</p>

      {/* Origen */}
      <p className="card-origin">
        <strong>Origen:</strong> {observations.origin}
      </p>

      {/* Observación */}
      <p className="card-detail">{observations.observaciones}</p>

      {/* Estado */}
      <p className="card-status">{observations.staste}</p>

      {/* Norma */}
      <p className="card-standart">
        <strong>Norma:</strong> {observations.standart}
      </p>

      {/* Nota de cierre */}
      {observations.close_note && (
        <p className="card-close-note">
          <strong>Nota de cierre:</strong> {observations.close_note}
        </p>
      )}

      {/* Archivo adjunto */}
      {observations.file_path && (
        <button
          className="card-file"
          onClick={(e) => handleFileClick(e, observations.file_path)}
        >
          📎 {getFileName(observations.file_path)}
        </button>
      )}

      {/* Metadatos */}
      <div className="card-meta">
        <span className="meta-item">Inicio: {observations.start_date}</span>
        <span className="meta-item">Cierre: {observations.end_date}</span>
        <span className="meta-item">{observations.departament}</span>
      </div>
    </div>
  );
}