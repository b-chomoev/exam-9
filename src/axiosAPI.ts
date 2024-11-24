import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: 'https://beks-server-default-rtdb.firebaseio.com/',
});

export default axiosAPI;