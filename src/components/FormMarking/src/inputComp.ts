import data from './datas/inputComp.json';
import inputComp from './components/input.vue';
import { h } from 'vue';

class inputCompHandle {
  constructor(private config = {}) {
    this.config = data;
  }
  render() {
    return h(inputComp, {
      itemConfig: data
    })
  }
}

function createInputConfig() {
  const componentsList: any[] = [];
  const componentsMap = new Map();

  return {
    componentsList,
    componentsMap,
    register: (component) => {
      componentsList.push(component);
      if (!componentsMap.get(component.type)) {
        componentsMap.set(component.type, component);
      }
    }
  }
}

const registerConfig = createInputConfig();

registerConfig.register({
  ...data,
  type: 'text'
});

registerConfig.register({
  ...data,
  type: 'password'
});

export default registerConfig;