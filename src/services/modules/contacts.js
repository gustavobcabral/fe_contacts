import api from '../api'

const getAll = () => api.get('/contacts')

const getOne = (id) => api.get(`/contacts/${id}`)

const create = (data) => api.post('/contacts', data)

const updateContact = (id, data) =>
  api.put(`/contacts/${id}`, data);

const getSummary = () => api.get('/contacts/summary')

const dellOne = (id) => api.delete(`/contacts/${id}`)

export default { getAll, getOne, create,updateContact, dellOne, getSummary }
