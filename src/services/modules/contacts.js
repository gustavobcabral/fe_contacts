import api from '../api'
import { toQueryString } from '../../utils/forms'

const getAll = (params) => api.get(`/contacts${toQueryString(params)}`)

const getAllFilters = () => api.get(`/contacts/filters`)

<<<<<<< HEAD
const getOne = (id) => api.get(`/contacts/${id}`)
=======
const create = (data) => api.post("/contacts", data);
const assign = (data) => api.post("/contacts/assign", data);
>>>>>>> dd0d17f68dea729dade05bf959475becee741401

const getSummary = () => api.get('/contacts/summary')

const updateContact = (id, data) => api.put(`/contacts/${id}`, data)

const create = (data) => api.post('/contacts', data)

const dellOne = (id) => api.delete(`/contacts/${id}`)

export default {
  getAll,
  getOne,
  create,
  updateContact,
  dellOne,
  getSummary,
  getAllFilters,
<<<<<<< HEAD
}
=======
  assign
};
>>>>>>> dd0d17f68dea729dade05bf959475becee741401
