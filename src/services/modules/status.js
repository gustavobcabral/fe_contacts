import api from "../api";

const getAll = () => api.get("/status");

const updateOne = (id, data) => api.put(`/status/${id}`, data);

const create = (data) => api.post(`/status`, data);

const dellOne = (id) => api.delete(`/status/${id}`);

export default { getAll, dellOne, updateOne, create };
