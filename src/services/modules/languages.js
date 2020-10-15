import api from "../api";

const getAll = () => api.get("/languages");

const updateOne = (id, data) => api.put(`/languages/${id}`, data);

const create = (data) => api.post(`/languages`, data);

const dellOne = (id) => api.delete(`/languages/${id}`);

export default { getAll, dellOne, updateOne, create };
