import { h } from 'vue';

class compHandle {
  private type: string;
  constructor(private config: any = {}) {
    this.config = config;
    this.type = config.type;
  }
  render(config) {
    const component = h(config.component, {
      itemConfig: config,
      type: this.type
    });
    return component;
  }

  setType(type) {
    this.type = type;
    this.config = Object.assign({}, this.config, {type});
  }

  setState(config) {
    this.config = Object.assign({}, config);
  }
}

const compFactory = (function () {
  const dataBase = {};

  return {
    create: function (handle, config) {
      const type = config.type || config.component.name;
      if (!dataBase[type]) {
        dataBase[type] = config;
      }

      console.log('config', dataBase[type])
      return handle.render(dataBase[type]);
    }
  }
})();

function createCompConfig() {
  const componentsMap = new Map();

  return {
    componentsMap,
    register: (config) => {
      let handle: any;
      if (!componentsMap.get(config.component.name)) {
        handle = new compHandle(config);
        componentsMap.set(config.component.name, handle);
      } else {
        handle = componentsMap.get(config.component.name);
      }
      
      return compFactory.create(handle, config);
    }
  }
}

// 使用享元模式避免重复new同一个对象消耗内存
const registerConfig = createCompConfig();

export default registerConfig;