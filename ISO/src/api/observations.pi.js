import axios from "axios";

const BASE_URL = "http://localhost:8000/api/app/observations/";

// ✅ Siempre obtener el token actualizado
const getToken = () => localStorage.getItem("token");

// ✅ Headers con token
const authHeaders = () => ({
  headers: {
    Authorization: getToken() ? `Token ${getToken()}` : "",
  },
});

// ✅ Obtener todas las observaciones
export const Allobservations = () =>
  axios.get(BASE_URL, authHeaders());

// ✅ Obtener una observación por ID
export const getObservation = (id) =>
  axios.get(`${BASE_URL}${id}/`, authHeaders());

// ✅ Crear una nueva observación
export const createObservation = (data) =>
  axios.post(BASE_URL, data, authHeaders());

// ✅ Actualizar una observación existente
export const updateObservations = (id, data) =>
  axios.put(`${BASE_URL}${id}/`, data, authHeaders());

// ✅ Eliminar una observación
export const DeleteObservations = (id) =>
  axios.delete(`${BASE_URL}${id}/`, authHeaders());

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

