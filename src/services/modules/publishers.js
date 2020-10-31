import api from "../api";
import { toQueryString } from "../../utils/forms";

const getAllWithPagination = (params) =>
  api.get(`/publishers/withPagination${toQueryString(params)}`);

const getAll = () => api.get("/publishers");

const getOne = (id) => api.get(`/publishers/${id}`);

const create = (data) => api.post("/publishers", data);

const updatePublishers = (id, data) => api.put(`/publishers/${id}`, data);

const dellOne = (id) => api.delete(`/publishers/${id}`);

const allExport = {
  getAllWithPagination,
  getAll,
  getOne,
  updatePublishers,
  dellOne,
  create,
};

export default allExport;
