import axios from "axios";

// Create the axios instance
const axiosInstance = axios.create({
  // baseURL: `http://localhost:5000/api/`,
  baseURL: `http://3.88.187.8:5000/api/`,
  // baseURL: `https://crm-backend-8w9h.onrender.com/api/`,

  headers: {
    accept: `application/json`,
    'Content-Type': 'application/json',
  },
});``

const setUpInterceptors = (getState, dispatch) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem('auth');
      if (token  ) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalConfig = err.config;
      if (originalConfig.url !== "/auth/login" && err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            // dispatch(setAccessToken(data?.access_token)); // Updated to directly access the token
            
            return axiosInstance(originalConfig);
          } catch (_error) {
            dispatch(setAccessToken(null));
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};

// Ensure interceptors are set up once
let interceptorsSet = false;

const axiosBaseQuery =
  () =>
  async (
    { url, method, body, params, ...requestOpts },
    { getState, dispatch }
  ) => {
    if (!interceptorsSet) {
      setUpInterceptors(getState, dispatch);
      interceptorsSet = true;
    }
    try {
      const axiosOptions = {
        url,
        method,
        data: body,
        params,
        headers: requestOpts.headers,
      };

      if (/^(auth\/)/.test(url)) {
        axiosOptions["withCredentials"] = true;
      }
      const result = await axiosInstance(axiosOptions);
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export default axiosBaseQuery();
