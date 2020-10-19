import api from "../api";
import { toQueryString } from "../../utils/forms";

const getAll = (params) => api.get(`/contacts${toQueryString(params)}`);
const getByGender = () => api.get(`/contacts/byGender`);
const getOne = (id) => api.get(`/contacts/${id}`);
const getSummary = () => api.get("/contacts/summary");

const create = (data) => api.post("/contacts", data);

const dellOne = (id) => api.delete(`/contacts/${id}`);

export default { getAll, getOne, create, dellOne, getSummary, getByGender };
