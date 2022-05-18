import Pagination from './index.vue';

// 挂载install方法让vue可以use引用
Pagination.install = function(Vue) {
  Vue.comments(Pagination.name, Pagination);
}

export default Pagination;