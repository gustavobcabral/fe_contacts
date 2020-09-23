import api from "../api";

function getAll() {
  return api.get("/contacts");
}
function dellOne(id) {
  return api.delete(`/contacts/${id}`);
}
export default { getAll, dellOne };
