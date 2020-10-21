import api from '../api'

const getAll = () => api.get('/publishers')

const create = (data) => api.post('/publishers', data)

const dellOne = (id) => api.delete(`/publishers/${id}`)

export default { getAll, dellOne, create }
