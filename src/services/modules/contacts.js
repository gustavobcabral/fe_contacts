import api from "../api";
import { toQueryString } from "../../utils/forms";

const getAll = (params) => api.get(`/contacts${toQueryString(params)}`);

const getSummary = () => api.get("/contacts/summary");

const dellOne = (id) => api.delete(`/contacts/${id}`);

export default { getAll, dellOne, getSummary };
