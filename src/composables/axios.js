import axios from 'axios'
import createStore from '../store/index'

let URI = process.env.NODE_ENV === 'development' ? 'http://localhost:2023/api/v1' : 'https://habeep.org/backend/api/v1'

const axiosInstance = axios.create({
  baseURL: URI,
});

if (createStore.state.sessionId.length > 1) {
  axiosInstance.defaults.headers.common = {
    Authorization: `bearer ${createStore.state.sessionId}`,
  };
}

export default axiosInstance;