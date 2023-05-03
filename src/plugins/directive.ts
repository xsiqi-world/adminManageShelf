import { App } from 'vue';
import { getSession } from '../utils';

const comp: any = {};

const authDirective = () => {
  return {
    inserted(el, vm, vnode) {
      console.log(el, vm, vnode);
    },
    created(el, vm) {
      // console.log(el, vm);
    },
    mounted(el, vm) {
      if (!vm.value) return;
      // console.log(el, vm);
      let authMap = getSession('auth');
      authMap = authMap.map(item => item.name.trim());
      // console.log(authMap, el);
      if (!authMap.includes(vm.value.trim())) {
        el.style.display = 'none';
      }
    },
  };
};

const directives = {
  auth: authDirective(),
};

comp.install = function (app: App) {
  for (let key in directives) {
    app.directive(key, directives[key]);
  }
};

export default comp;
