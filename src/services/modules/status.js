import api from "../api";

const getAll = () => api.get("/status");

const dellOne = (id) => api.delete(`/publishers/${id}`);

export default { getAll, dellOne };
