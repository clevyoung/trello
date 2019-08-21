import * as api from "../api";

const actions = {
  LOGIN({ commit }, { email, password }) {
    //commit을 호출하여 mutations에 커밋
    return api.login(email, password).then(({ accessToken }) => {
      commit("LOGIN", { accessToken });
    }); //외부에서 참조할 수 있게 return
  },
  FETCH_BOARDS({ commit }) {
    return api.fetchBoard().then(data => {
      commit("SET_BOARDS", data);
    });
  },
  CREATE_BOARD({ dispatch }, { title }) {
    return api.createBoard({ title }).then(_ => {
      dispatch("FETCH_BOARDS");
    });
  }
};

export default actions;
