import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "../style/observationsFormPages.css";

import {
  createObservation,
  updateObservations,
  DeleteObservations,
  getObservation,
} from "../api/observations.pi";

import { ListObservations } from "../components/observationsList";

export default function ObservationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const params = useParams();

  const [filePath, setFilePath] = useState("");

  const toastStyle = {
    background: "yellow",
    color: "#2e2e2e",
    fontWeight: "bold",
    boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
    borderRadius: "8px",
  };

  // ==============================
  // Guardar o actualizar
  // ==============================
  const onSubmit = async (data) => {
    try {
      if (filePath) {
        data.file_path = filePath; // GUARDA LA RUTA COMPLETA
      }

      if (params.id) {
        await updateObservations(params.id, data);
        toast.success("Actualizado exitosamente", { style: toastStyle });
      } else {
        await createObservation(data);
        toast.success("Registrado exitosamente", { style: toastStyle });
      }

      navigate("/observations");
    } catch {
      toast.error("Error al guardar la observación", { style: toastStyle });
    }
  };

  // ==============================
  // Cargar datos si estamos editando
  // ==============================
  useEffect(() => {
    if (params.id) {
      async function loadObservation() {
        try {
          const res = await getObservation(params.id);

          setValue("title", res.data.title);
          setValue("type", res.data.type);
          setValue("staste", res.data.staste);
          setValue("observaciones", res.data.observaciones);
          setValue("standart", res.data.standart);
          setValue("start_date", res.data.start_date);
          setValue("end_date", res.data.end_date);
          setValue("departament", res.data.departament);
          setValue("origin", res.data.origin);
          setValue("close_note", res.data.close_note);

          setValue("file_path", res.data.file_path || "");
          setFilePath(res.data.file_path || "");
        } catch {
          toast.error("Error al cargar la observación", { style: toastStyle });
        }
      }
      loadObservation();
    }
  }, [params.id, setValue]);

  // ==============================
  // Eliminar
  // ==============================
  const handleDelete = async () => {
    const acepted = window.confirm("¿Estás seguro de que deseas eliminar?");
    if (acepted) {
      try {
        await DeleteObservations(params.id);
        toast.success("Borrado exitosamente", { style: toastStyle });
        navigate("/observations");
      } catch {
        toast.error("Error al borrar la observación", { style: toastStyle });
      }
    }
  };

  // ==============================
  // Adjuntar archivo (SOLO ELECTRON)
  // ==============================
  const handleAttachFile = async () => {
    if (window.electronAPI?.selectFile) {
      try {
        const selectedPath = await window.electronAPI.selectFile();

        if (selectedPath) {
          setFilePath(selectedPath); // GUARDA LA RUTA COMPLETA

          toast.success("Archivo adjuntado correctamente", {
            style: toastStyle,
          });
        }
      } catch (error) {
        console.error("Error seleccionando archivo:", error);
      }

      return;
    }

    // Si NO es Electron → no hacer nada
    toast.error("Esta función solo está disponible en la versión de escritorio", {
      style: toastStyle,
    });
  };

  return (
    <div className="observation-split">

      <div className="observation-left">
        <div className="observation-container">

          <div className="observation-header">
            <div className="observation-logo">QMS</div>
            <h2 className="observation-title">
              {params.id ? "Editar Observación" : "Registrar Observación"}
            </h2>
          </div>

          <form className="observation-form" onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">
              <label className="form-label">Título</label>
              <input
                {...register("title", { required: "El título es obligatorio" })}
                placeholder="Ingrese un título descriptivo"
                className="form-input"
              />
              {errors.title && <p className="form-error">{errors.title.message}</p>}
            </div>

            <div className="form-group">
              <label className="form-label">Tipo</label>
              <select {...register("type", { required: true })} className="form-select">
                <option value="">Seleccione un tipo</option>
                <option value="No conformidad">No conformidad</option>
                <option value="Observacion">Observación</option>
                <option value="Oportunidad de mejora">Oportunidad de mejora</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Estado</label>
              <select {...register("staste", { required: true })} className="form-select">
                <option value="Iniciada">Iniciada</option>
                <option value="En curso">En curso</option>
                <option value="Completada">Completada</option>
                <option value="Cerrada">Cerrada</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Origen</label>
              <select {...register("origin", { required: true })} className="form-select">
                <option value="Elegir origen">Elegir origen</option>
                <option value="Auditoria interna">Auditoría interna</option>
                <option value="Auditoria externa">Auditoría externa</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Detalle / Observación</label>
              <textarea
                {...register("observaciones", { required: "Debe escribir una observación" })}
                placeholder="Describa la observación detectada..."
                className="form-textarea"
              />
              {errors.observaciones && (
                <p className="form-error">{errors.observaciones.message}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Nota de cierre</label>
              <textarea
                {...register("close_note")}
                placeholder="Comentarios o acciones de cierre..."
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Norma / Estándar</label>
              <select {...register("standart", { required: true })} className="form-select">
                <option value="">Seleccione una norma</option>
                <option value="ISO 9001: 2015">ISO 9001:2015</option>
                <option value="Norma Covenin 30">Norma Covenin 30</option>
                <option value="PDVSA EM 30-01V01">PDVSA EM 30-01V01</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Fecha de inicio</label>
              <input type="date" {...register("start_date")} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Fecha límite</label>
              <input type="date" {...register("end_date")} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Departamento responsable</label>
              <select {...register("departament", { required: true })} className="form-select">
                <option value="">Seleccione un departamento</option>
                <option value="Almacen">Almacén</option>
                <option value="Gestion de calidad">Gestión de calidad</option>
                <option value="Control de calidad">Control de calidad</option>
                <option value="Direccion">Dirección</option>
                <option value="Gerencia de productos">Gerencia de productos</option>
                <option value="Informatica y Telecomunicaciones">
                  Informática y Telecomunicaciones
                </option>
                <option value="RRHH">RRHH</option>
                <option value="Seguridad y Salud Laboral">
                  Seguridad y Salud Laboral
                </option>
                <option value="Servicios generales">Servicios generales</option>
                <option value="Ventas y Distribucion">Ventas y Distribución</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Adjuntar documento (Word / PDF)</label>

              <div className="file-picker">

                <input
                  type="text"
                  value={filePath}
                  readOnly
                  className="form-input file-path"
                  placeholder="Ningún archivo seleccionado"
                />

                <button
                  type="button"
                  className="btn-attach"
                  onClick={handleAttachFile}
                >
                  📎 Seleccionar archivo
                </button>

              </div>

              {filePath && (
                <p className="form-note">
                  📄 Archivo: <strong>{filePath}</strong>
                </p>
              )}

            </div>

            <button type="submit" className="btn-primary">
              Guardar
            </button>

          </form>

          {params.id && (
            <button className="btn-delete" onClick={handleDelete}>
              Borrar
            </button>
          )}

        </div>
      </div>

      <div className="observation-right">
        <ListObservations />
      </div>

    </div>
  );
}