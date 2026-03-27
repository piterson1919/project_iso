import axios from "axios";

// =======================
// Helpers
// =======================

// Obtener token del localStorage
const getToken = () => localStorage.getItem("token");

// Headers con token
const authHeaders = () => ({
  headers: {
    Authorization: getToken() ? `Token ${getToken()}` : "",
  },
});

// =======================
// API BASE (rutas relativas)
// =======================

const BASE_URL = "/api/app/observations/";
const STATS_URL = "/api/app/stats/";
const USER_URL = '/api/app/list_user/';

// =======================
// Observaciones
// =======================

// Obtener todas las observaciones
export const Allobservations = () =>
  
  axios.get(BASE_URL, authHeaders());

// Obtener una observación por ID
export const getObservation = (id) =>
  axios.get(`${BASE_URL}${id}/`, authHeaders());

// Crear nueva observación
export const createObservation = (data) =>
  axios.post(BASE_URL, data, authHeaders());

// Actualizar una observación existente
export const updateObservations = (id, data) =>
  axios.put(`${BASE_URL}${id}/`, data, authHeaders());

// Eliminar una observación
export const DeleteObservations = (id) =>
  axios.delete(`${BASE_URL}${id}/`, authHeaders());

// Guardar token
export const setToken = (token) => {
  localStorage.setItem("token", token);
};
export const index_stats = () => {
  return axios.get(STATS_URL, authHeaders());
};

// =======================
// Usuarios
// =======================

export const AllUser = () =>{

  axios.get(USER_URL, authHeaders());

}

// =======================
// Login
// =======================

export const loginUser = async (username, password) => {
  const loginUrl = "/api/app/Login/";

  const res = await fetch(loginUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (res.ok) {
    setToken(data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data;
};

// =======================
// Registro
// =======================

export const registerUser = async (userData) => {
  const registerUrl = "/api/app/Register/";

  const res = await axios.post(registerUrl, userData);

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;
};