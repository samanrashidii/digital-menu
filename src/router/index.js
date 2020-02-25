import Vue from 'vue';
import Router from 'vue-router';
import Categories from '@/components/Categories.vue';
import SideCategories from '@/components/SideCategories.vue';
import Menu from '@/components/Menu.vue';
import SideBar from '@/components/SideBar.vue';
import Result from '@/components/Result.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MenuApp',
      components: {
        default: Categories,
        sidecategories: SideCategories,
        menu: Menu,
        sidebar: SideBar,
      }
    },
    {
      path: '/result',
      name: 'Result',
      components: {
        result: Result
      }
    }
  ],
});
