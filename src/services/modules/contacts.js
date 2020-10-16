import api from "../api";
import { toQueryString } from "../../utils/forms";

const getAll = (params) => api.get(`/contacts${toQueryString(params)}`);

const getOne = (id) => api.get(`/contacts/${id}`)

const create = (data) => api.post('/contacts', data)

const getSummary = () => api.get('/contacts/summary')

const dellOne = (id) => api.delete(`/contacts/${id}`)

export default { getAll, getOne, create, dellOne, getSummary }
