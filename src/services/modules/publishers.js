import api from '../api'

const getAllWithPagination = () => api.get('/publishers/withPagination')

const getAll = () => api.get('/publishers')

const getOne = (id) => api.get(`/publishers/${id}`)

const create = (data) => api.post('/publishers', data)

const updatePublishers = (id, data) => api.put(`/publishers/${id}`, data)

const dellOne = (id) => api.delete(`/publishers/${id}`)

export default {
  getAllWithPagination,
  getAll,
  getOne,
  updatePublishers,
  dellOne,
  create,
}
