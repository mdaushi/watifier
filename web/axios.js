import axios from "axios";

export const HTTP = axios.create({
  baseURL: window.location.origin + '/api',
});
