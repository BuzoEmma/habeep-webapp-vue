import axios from 'axios'
import createStore from '../store/index'

let URI = 'https://habeep.org/backend/api/v1'

const axiosInstance = axios.create({
  baseURL: URI,
});

if (createStore.state.sessionId.length > 1) {
  axiosInstance.defaults.headers.common = {
    Authorization: `bearer ${createStore.state.sessionId}`,
  };
}

export default axiosInstance;

// process.env.NODE_ENV === 'production' ? 'http://localhost:2023/backend/api/v1' :