import axios from "axios";

export const getRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  method: 'GET',
  responseType: 'json',
  // transformResponse: [function (data) {
  //   // Do whatever you want to transform the data
  //   return data.data;
  // }],
  // headers: {'X-Custom-Header': 'foobar'}
})

// intercept response to return only data and not full AxiosResponseSchema
// to avoid nested data.data object in frontend 
getRequest.interceptors.response.use(function (res) {
  return res.data;
}, function (error) {
  return Promise.reject(error);
});

export const postRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  method: 'POST',
  responseType: 'json',

  // headers: {'X-Custom-Header': 'foobar'}
})

