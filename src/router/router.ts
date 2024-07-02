import { RouteRecordRaw } from "vue-router";
export default <RouteRecordRaw[]>[{
  path:'/',
  name:'home',
  component:()=>import('@/layout/index.vue')
}];
