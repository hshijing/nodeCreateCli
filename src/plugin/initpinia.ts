import { createPinia } from "pinia";
import { type App } from "vue";

export const initPinia = (app: App) => {
  app.use(createPinia());
  //pinia持久化插件
};
