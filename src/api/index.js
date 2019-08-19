import axios from "axios";

const request = (method, url, data) => {
  return axios({
    method,
    url,
    data
  })
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error);
    });
};

export const login = ({ email, password }) => {
  return request("post", "/login", { email, password }).then(() => {});
};
