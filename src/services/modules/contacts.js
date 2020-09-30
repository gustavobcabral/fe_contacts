import api from "../api";

const getAll = () => api.get("/contacts");

const getSummary = () => api.get("/contacts/summary");

const dellOne = (id) => api.delete(`/contacts/${id}`);

export default { getAll, dellOne, getSummary };
