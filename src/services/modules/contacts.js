import api from '../api'

const getAll = () => api.get('/contacts')

const create = (data) => api.post('/contacts', data)

const getSummary = () => api.get('/contacts/summary')

const dellOne = (id) => api.delete(`/contacts/${id}`)

export default { getAll, create, dellOne, getSummary }
