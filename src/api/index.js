import axios from "axios";
const domain = "http://localhost:3000";

const request = (method, url, data) => {
  return axios({
    method,
    url,
    data
  });
};

export const setAuthInHeader = token => {
  axios.defaults.headers.common["Authorization"] = token;
};

export const login = (email, password) => {
  return request("post", `${domain}/login`, { email, password }).then(
    ({ data }) => data
  );
};

export const fetchBoard = () => {
  return request("get", `${domain}/boards`).then(res => {
    return res.data;
  });
};

export const createBoard = ({ title }) => {
  return request("post", `${domain}/boards`, { title }).then(res => {
    console.log(res);
    return res.data;
  });
};
