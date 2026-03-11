import { useEffect, useState } from "react";

export function FileList() {
  const [files, setFiles] = useState([]);
  const carpeta = "Y:\\\\ISO9001\\\\DOCUMENTOS DEL SGC FOOT SAFE\\\\Listas Maestras";

  useEffect(() => {
    async function loadFiles() {
      if (window.electronAPI) {
        const result = await window.electronAPI.listFilesInFolder(carpeta);
        setFiles(result);
      }
    }
    loadFiles();
  }, []);

  const abrirArchivo = (file) => {
    // file.fullPath ya viene completo desde Electron
    window.electronAPI.openSharedFile(file.fullPath);
  };

  return (
    <div className="filelist-container">
      <header className="filelist-header">
        <h2 className="filelist-title">📂 Archivos disponibles</h2>
        <p className="filelist-path">Ruta: {carpeta}</p>
      </header>

      <div className="filelist-content">
        {files.length > 0 ? (
          <ul className="filelist-grid">
            {files.map((f, i) => (
              <li
                key={i}
                className="filelist-item"
                onClick={() => abrirArchivo(f)}
              >
                <div className="file-icon">📄</div>
                <div className="file-info">
                  <span className="file-name">{f.name}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="filelist-empty">
            <p>No se encontraron archivos o la carpeta está vacía.</p>
          </div>
        )}
      </div>
    </div>
  );
}