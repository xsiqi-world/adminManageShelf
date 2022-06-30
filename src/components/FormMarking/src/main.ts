import data from './datas/inputComp.json';
import Vue, { h } from 'vue';

class compHandle {
  private type: string;
  constructor(private config: any = {}) {
    this.config = config;
    this.type = config.type;
  }
  render() {
    const component = h(this.config?.component, {
      itemConfig: this.config,
      type: this.type
    });
    return component;
  }

  setType(type) {
    this.type = type;
    this.config = Object.assign({}, this.config, {type});
  }
}

const compFactory = (function () {
  const caches = {};

  return {
    create: function (handle, type) {
      if (caches[type]) {
        return handle.render();
      }
      caches[type] = handle;
      handle.setType(type);
      console.log('config', handle.config)
      return handle.render();
    }
  }
})();

function createCompConfig() {
  const componentsList: any[] = [];
  const componentsMap = new Map();

  return {
    componentsList,
    componentsMap,
    register: (config) => {
      let handle: any;
      if (!componentsMap.get(config.componentName)) {
        handle = new compHandle(config);
        componentsList.push(handle);
        componentsMap.set(config.componentName, handle);
      } else {
        handle = componentsMap.get(config.componentName);
      }
      
      return compFactory.create(handle, config.type);
    }
  }
}

// 使用享元模式避免重复new同一个对象消耗内存
const registerConfig = createCompConfig();

export default registerConfig;