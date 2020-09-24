import api from "../api";

function getAllOneContact(id) {
  return api.get(`/detailsContacts/oneContact/${id}`);
}
function dellOne(id) {
  return api.delete(`/contacts/${id}`);
}
export default { getAllOneContact, dellOne };
