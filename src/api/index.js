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

export const fetchBoard = (id) => {
  return id ? request("get", `${domain}/boards/${id}`).then(res => res.data) : request("get", `${domain}/boards`).then(res => res.data)
};

export const createBoard = (title) => {
  return request("post", `${domain}/boards`, { title }).then(res => {
    return res.data;
  });
};

export const createCard = ({title, listId, pos}) => {
  return request("post", `${domain}/cards`, {title, listId, pos}).then((res) => res.data)
}
