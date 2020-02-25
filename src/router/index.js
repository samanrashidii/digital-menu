import Vue from 'vue';
import Router from 'vue-router';
import Categories from '@/components/Categories';
import SideCategories from '@/components/SideCategories';
import Menu from '@/components/Menu';
import Sidebar from '@/components/Sidebar';
import Result from '@/components/Result';

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
        sidebar: Sidebar,
      }
    },
    {
      path: '/result',
      name: 'Result',
      components: {result: Result}
    }
  ],
});
