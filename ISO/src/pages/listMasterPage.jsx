import React from "react";
import { FileList } from "../components/listMaster";
import "../style/listMaster.css"; // 🔹 importa el CSS aquí

export function ListFiles() {
  return (
    <div className="listfiles-split">
      {/* Sección izquierda: información */}
      <section className="listfiles-left">
        <div className="listfiles-info">
          <h1 className="listfiles-logo">Gestor ISO</h1>
          <h2 className="listfiles-heading">Documentos del Servidor</h2>
          <p className="listfiles-description">
            Aquí puedes visualizar y abrir directamente los documentos alojados
            en la carpeta compartida del servidor. Haz clic sobre un archivo
            para abrirlo.
          </p>
        </div>
      </section>

      {/* Sección derecha: listado */}
      <section className="listfiles-right">
        <FileList />
      </section>
    </div>
  );
}