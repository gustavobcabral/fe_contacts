import api from "../api";
import { toQueryString } from "../../utils/forms";

const getAllOneContact = (id, limit = 5) =>
  api.get(`/detailsContacts/oneContact/${id}?limit=${limit}`);

const getOne = (id) => api.get(`/detailsContacts/${id}`);

const getAllWaitingFeedback = (params) =>
  api.get(`/detailsContacts/waitingFeedback${toQueryString(params)}`);

const getAllWaitingFeedbackFilters = () => api.get(`/detailsContacts/filtersWaitingFeedback`);

const create = (data) => api.post(`/detailsContacts`, data);

const updateOneContactDetail = (id, data) =>
  api.put(`/detailsContacts/${id}`, data);

const dellOne = (id) => api.delete(`/detailsContacts/${id}`);

export default {
  getOne,
  getAllOneContact,
  getAllWaitingFeedback,
  getAllWaitingFeedbackFilters,
  create,
  updateOneContactDetail,
  dellOne,
};
