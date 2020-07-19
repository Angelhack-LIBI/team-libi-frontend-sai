import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import meta from 'api/meta';

const axiosInstance = axios.create(meta);

const getAccessToken = () => localStorage.getItem('libi_token');

axiosInstance.interceptors.request.use(request => {
  request.headers['Authorization'] = getAccessToken();
  return request;
});

const refreshAuthLogic = (failedRequest: any) => {
  return axiosInstance.put('/account/token')
    .then(({ data = {} }) => {
      const { access_token: token } = data || {}
      localStorage.setItem('libi_token', token);
      failedRequest.response.config.headers['Authorization'] = token;
      return Promise.resolve();
    });
}

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, {
  statusCodes: [ 401 ],
  retryInstance: axiosInstance
});

export default axiosInstance