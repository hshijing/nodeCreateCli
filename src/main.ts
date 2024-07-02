import { createApp } from 'vue'
import  '@/css/style.scss'
import App from './App.vue'
import {initPinia} from '@/plugin'
import router from '@/router'
const init = () => {
  const app = createApp(App);
  app.use(router);
  initPinia(app);
  app.mount("#app");
};

init();
