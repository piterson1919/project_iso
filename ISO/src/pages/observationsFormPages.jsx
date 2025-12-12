import { useEffect } from "react";
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
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const toastStyle = {
    background: "yellow",
    color: "#2e2e2e",
    fontWeight: "bold",
    boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
    borderRadius: "8px",
  };

  // Crear o actualizar observación
  const onSubmit = async (data) => {
    try {
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

  // Cargar datos si hay un ID
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
        } catch {
          toast.error("Error al cargar la observación", { style: toastStyle });
        }
      }
      loadObservation();
    }
  }, [params.id, setValue]);

  // Eliminar observación
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

  return (
    <div className="observation-split">
      {/* Formulario */}
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
                placeholder="Título"
                className="form-input"
              />
              {errors.title && (
                <p className="form-error">{errors.title.message}</p>
              )}
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
              <label className="form-label">Detalle</label>
              <textarea
                {...register("observaciones", { required: "Debe escribir una observación" })}
                placeholder="Detalle de la observación"
                className="form-textarea"
              />
              {errors.observaciones && (
                <p className="form-error">{errors.observaciones.message}</p>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Norma ISO</label>
              <select {...register("standart", { required: true })} className="form-select">
                <option value="ISO 9001: 2015">ISO 9001: 2015</option>
              </select>
            </div>

            <button type="submit" className="btn-primary">Guardar</button>
          </form>

          {params.id && (
            <button className="btn-delete" onClick={handleDelete}>
              Borrar
            </button>
          )}
        </div>
      </div>

      {/* Lista de observaciones */}
      <div className="observation-right">
        <ListObservations />
      </div>
    </div>
  );
}
