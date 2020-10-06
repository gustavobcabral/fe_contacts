import api from "../api";

const getAll = () => api.get("/status");

<<<<<<< HEAD
const dellOne = (id) => api.delete(`/publishers/${id}`);

export default { getAll, dellOne };
=======
const updateOne = (id, data) => api.put(`/status/${id}`, data);

const create = (data) => api.post(`/status`, data);

const dellOne = (id) => api.delete(`/status/${id}`);

export default { getAll, dellOne, updateOne, create };
>>>>>>> 27465712aff4117fd909a59a503bb0c6f8c69f90
