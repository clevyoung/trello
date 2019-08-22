import { setAuthInHeader } from "../api";

const mutations = {
  LOGIN(state, { accessToken }) {
    if (!accessToken) return;
    state.accessToken = accessToken;
    //만약 token이 없을 시 return시킴
    localStorage.accessToken = accessToken;
    setAuthInHeader(accessToken);
  },
  LOGOUT(state) {
    state.accessToken = null;
    delete localStorage.accessToken;
    setAuthInHeader();
  },
  SET_BOARDS(state, { list }) {
    state.boards = list;
  },
  SET_BOARD(state, item ){
    state.board = item;
  },
  SET_IS_ADD_BOARD(state, toggle) {
    state.isAddBoard = toggle;
  }
};

export default mutations;
