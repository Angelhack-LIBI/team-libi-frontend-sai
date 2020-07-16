import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh';


const axiosInstance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 2500,
  headers: {'Content-Type': 'application/json'}
});

const getAccessToken = () => localStorage.getItem('token');

axiosInstance.interceptors.request.use(request => {
  request.headers['Authorization'] = getAccessToken();
  return request;
});

const refreshAuthLogic = (failedRequest: any) => {
  return axiosInstance.post('https://www.example.com/auth/token/refresh')
    .then(({ data = {} }) => {
      const { token } = data || {}
      localStorage.setItem('token', token);
      failedRequest.response.config.headers['Authorization'] = token;
      return Promise.resolve();
    });
}

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, {
  statusCodes: [ 401 ],
  retryInstance: axiosInstance
});

export default axiosInstance