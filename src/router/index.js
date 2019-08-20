import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const requireAuth = (from, to, next) => {
  !!store.state.accessToken
    ? next()
    : next(`/login?returnPath=${encodeURIComponent(from.path)}`);
};

//라우터 인스턴스 생성
const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/login", component: Login },
    { path: "/", component: Home, beforeEnter: requireAuth }
  ]
});

export default router;
