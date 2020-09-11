import api from '../api'

export default {
  authenticate(data) {
    return api.post('/auth', data)
  }
}
