import axios from 'axios'
import createStore from '../store/index'

let URI = 'http://localhost:2023/backend/api/v1'
// let URI = 'https://habeep.org/backend/api/v1'

function getToken() {
  return createStore.getters.sessionId
}
let token = getToken()

const axiosInstance = axios.create({
  baseURL: URI,
  timeout: 100000
});

if (token.length > 1) {
  axiosInstance.defaults.headers.common = {
    Authorization: `bearer ${token}`
  };
}

export function updateToken(string) {
  token = string
  axiosInstance.defaults.headers.common = {
    Authorization: `bearer ${token}`
  };
  getToken()
}




export default axiosInstance;