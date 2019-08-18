import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../components/Login.vue";

Vue.use(VueRouter);

//라우터 인스턴스 생성
const router = new VueRouter({
  mode: "history",
  routes: [{ path: "/login", component: Login }]
});

export default router;
