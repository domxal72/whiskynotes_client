import axios from "axios";

// TODO: Create list of request instances to avoid code duplication
// something like... 
// const methods = ['get', 'post', 'put', 'delete']

// function createRequests(methods: string[]){
//   const requests = {}
//   methods.forEach((method) => (
//     requests[`${method}Request`] = 
//     axios.create({
//       baseURL: import.meta.env.VITE_API_BASE_URL,
//       method: method.toUpperCase(),
//       responseType: 'json',
//       withCredentials: true,
//     })
//     // intercept response to return only data and not full AxiosResponseSchema
//     // to avoid nested data.data object in frontend 
//     .interceptors.response.use(function (res) {
//       return res.data;
//     }, function (error) {
//       return Promise.reject(error);
//     })
//   ))

//   return requests
// }

export const getRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  method: 'GET',
  responseType: 'json',
  withCredentials: true,
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
  withCredentials: true,
})

// intercept response to return only data and not full AxiosResponseSchema
// to avoid nested data.data object in frontend 
postRequest.interceptors.response.use(function (res) {
  return res.data;
}, function (error) {
  return Promise.reject(error);
});

export const deleteRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  method: 'DELETE',
  responseType: 'json',
  withCredentials: true,
})

// intercept response to return only data and not full AxiosResponseSchema
// to avoid nested data.data object in frontend 
deleteRequest.interceptors.response.use(function (res) {
  return res.data;
}, function (error) {
  return Promise.reject(error);
});

export const updateRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  method: 'PUT',
  responseType: 'json',
  withCredentials: true,
})

// intercept response to return only data and not full AxiosResponseSchema
// to avoid nested data.data object in frontend 
updateRequest.interceptors.response.use(function (res) {
  return res.data;
}, function (error) {
  return Promise.reject(error);
});
