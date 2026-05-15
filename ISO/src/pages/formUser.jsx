import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "../style/userForm.css";

import {
  getUser,
  updateUser,
  deleteUser,
  createUser,
} from "../api/users.pi";

export default function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const params = useParams();

  const toastStyle = {
    background: "yellow",
    color: "#2e2e2e",
    fontWeight: "bold",
    boxShadow: "2px 2px 8px rgba(0,0,0,0.3)",
    borderRadius: "8px",
  };

  // ==============================
  // GUARDAR / ACTUALIZAR
  // ==============================
  const onSubmit = async (data) => {
    try {
      console.log("DATA ENVIADA:", data); // 🔥 DEBUG

      if (params.id) {
        await updateUser(params.id, data);
        toast.success("Usuario actualizado", { style: toastStyle });
      } else {
        await createUser(data);
        toast.success("Usuario creado", { style: toastStyle });
      }

      navigate("/users");
    } catch (error) {
      console.error("ERROR:", error.response?.data || error);
      toast.error("Error al guardar el usuario", { style: toastStyle });
    }
  };

  // ==============================
  // CARGAR USUARIO (EDITAR)
  // ==============================
  useEffect(() => {
    if (params.id) {
      async function loadUser() {
        try {
          const res = await getUser(params.id);

          console.log("USER:", res.data); // 🔥 DEBUG

          setValue("username", res.data.username || "");
          setValue("email", res.data.email || "");
          setValue("cargo", res.data.cargo || "");
        } catch (error) {
          console.error(error);
          toast.error("Error al cargar usuario", { style: toastStyle });
        }
      }

      loadUser();
    }
  }, [params.id, setValue]);

  // ==============================
  // ELIMINAR
  // ==============================
  const handleDelete = async () => {
    const accepted = window.confirm("¿Eliminar usuario?");
    if (accepted) {
      try {
        await deleteUser(params.id);
        toast.success("Usuario eliminado", { style: toastStyle });
        navigate("/users");
      } catch (error) {
        console.error(error);
        toast.error("Error al eliminar", { style: toastStyle });
      }
    }
  };

  return (
    <div className="user-container">
      <h2 className="user-title">
        {params.id ? "Editar Usuario" : "Crear Usuario"}
      </h2>

      <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
        
        {/* USERNAME */}
        <input
          {...register("username", {
            required: "El username es obligatorio",
          })}
          placeholder="Username"
          className="form-input"
        />
        {errors.username && (
          <p className="form-error">{errors.username.message}</p>
        )}

        {/* EMAIL */}
        <input
          {...register("email", {
            required: "El email es obligatorio",
          })}
          placeholder="Email"
          className="form-input"
        />
        {errors.email && (
          <p className="form-error">{errors.email.message}</p>
        )}

        {/* PASSWORD */}
        <input
          type="password"
          {...register("password")}
          placeholder="Password"
          className="form-input"
        />

        {/* CARGO */}
        <input
          {...register("cargo", {
            required: "El cargo es obligatorio",
          })}
          placeholder="Cargo"
          className="form-input"
        />
        {errors.cargo && (
          <p className="form-error">{errors.cargo.message}</p>
        )}

        <button type="submit" className="btn-primary">
          {params.id ? "Actualizar" : "Crear"}
        </button>
      </form>

      {params.id && (
        <button className="btn-delete" onClick={handleDelete}>
          Borrar
        </button>
      )}
    </div>
  );
}