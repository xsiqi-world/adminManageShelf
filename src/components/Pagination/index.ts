import { withInstall } from '/@/utils/index';
import pagination from './src/index.vue';

// 挂载install方法让vue可以use引用
// Pagination.install = function(Vue) {
//   Vue.comments(Pagination.name, Pagination);
// }

export const Pagination = withInstall(pagination);