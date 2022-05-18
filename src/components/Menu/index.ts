import Menu from './index.vue';

Menu.install = function(Vue) {
  Vue.comments(Menu.name, Menu);
}

export default Menu;