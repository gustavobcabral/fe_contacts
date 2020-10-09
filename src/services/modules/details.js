import api from "../api";

const getAllOneContact = (id) => api.get(`/detailsContacts/oneContact/${id}`);

const updateOneContactDetail = (id, data) =>
  api.put(`/detailsContacts/${id}`, data);

const getOne = (id) => api.get(`/detailsContacts/${id}`);

const dellOne = (id) => api.delete(`/detailsContacts/${id}`);

export default {
  getAllOneContact,
  dellOne,
  getOne,
  updateOneContactDetail,
};
