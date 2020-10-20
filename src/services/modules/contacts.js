import api from "../api";
import { toQueryString } from "../../utils/forms";

const getAll = (params) => api.get(`/contacts${toQueryString(params)}`);
const getAllFilters = () => api.get(`/contacts/filters`);
const getOne = (id) => api.get(`/contacts/${id}`);
const getSummary = () => api.get("/contacts/summary");

const updateContact = (id, data) => api.put(`/contacts/${id}`, data);

const create = (data) => api.post("/contacts", data);

const dellOne = (id) => api.delete(`/contacts/${id}`);

export default {
  getAll,
  getOne,
  create,
  updateContact,
  dellOne,
  getSummary,
  getAllFilters,
};
