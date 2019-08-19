import axios from "axios";
const domain = "http://localhost:3000"

const request = (method, url, data) => {
  return axios({
    method,
    url,
    data
  })
};

export const setAuthInHeader = (token) =>{
  axios.defaults.headers.common['Authorization'] = token;
}

export const login = (email, password ) => {
  return request("post", `${domain}/login`, { email, password }).then(({data}) => data)
};
