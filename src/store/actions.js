import * as api from "../api";

const action = {
  LOGIN({ commit }, { email, password }) {
    //commit을 호출하여 mutations에 커밋
    commit("LOGIN");
    return api.login({ email, password }); //외부에서 참조할 수 있게 return
  }
};

export default action;
