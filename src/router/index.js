import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0 }; // 返回滚动位置
  },
});

export default router;
