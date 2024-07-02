import { createRouter, createWebHistory } from "vue-router";
import routes from "./router";
const router = createRouter({
  // mode: "hash", // 路由模式
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }; // 返回滚动位置
  },
});

export default router;
