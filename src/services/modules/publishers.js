import api from "../api";

const getAll = () => api.get("/publishers");

const dellOne = (id) => api.delete(`/publishers/${id}`);

export default { getAll, dellOne };
