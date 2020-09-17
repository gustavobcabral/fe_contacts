import api from "../api";

function getAll() {
  return api.get("/publishers");
}

function dellOne(id) {
  return api.delete(`/publishers/${id}`)
}
export default { getAll, dellOne };
