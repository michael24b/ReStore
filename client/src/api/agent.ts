import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const Products = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
};

const Basket = {
  get: () => requests.get("basket"),
  addItem: (productId: number, quantity = 1) =>
    requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity = 1) =>
    requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
};

// const TestErrors = {
//   get400Error: () => requests.get("buggy/bad-request"),
//   get401Error: () => requests.get("buggy/unauthorised"),
//   get404Error: () => requests.get("buggy/not-found"),
//   get500Error: () => requests.get("buggy/server-error"),
//   getValidationError: () => requests.get("buggy/validation-error"),
// };

const agent = {
  Products,
  Basket,
  // TestErrors,
};

export default agent;
