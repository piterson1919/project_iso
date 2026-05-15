import axios from "axios";

const getToken = () => localStorage.getItem("token");

const authHeaders = () => {
  const token = getToken();
  return token ? { headers: { Authorization: `Token ${token}` } } : {};
};

const USER_URL = "/api/app/list_user/";

export const AllUser = () => axios.get(USER_URL, authHeaders());

export const getUser = (id) => axios.get(`${USER_URL}${id}/`, authHeaders());

export const updateUser = (id, data) => axios.put(`${USER_URL}${id}/`, data, authHeaders());

export const deleteUser = (id) => axios.delete(`${USER_URL}${id}/`, authHeaders());

export const createUser = (data) => axios.post(BASE_URL, data, authHeaders());



