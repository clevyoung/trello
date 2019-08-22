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
  FETCH_BOARD({commit}, {id}){
    return api.fetchBoard(id).then(({item}) => {
        commit("SET_BOARD", item)
    })
  },
  CREATE_BOARD({ dispatch }, { title }) {
    return api.createBoard(title).then(_ => {
      dispatch("FETCH_BOARDS");
    });
  },
  CREATE_CARD({state, dispatch}, {title, listId, pos}){
    return api.createCard({title, listId, pos}).then((data) => {
      console.log(data);
      dispatch("FETCH_BOARD", state.board.id)
    })
  }
};

export default actions;
