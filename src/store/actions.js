import * as api from "../api";

const actions = {
  LOGIN({ commit }, { email, password }) {
    //commit을 호출하여 mutations에 커밋
    return api.login( email, password).then(({accessToken}) => {
      commit('LOGIN', { accessToken })
    }) //외부에서 참조할 수 있게 return
  }
};

export default actions;
