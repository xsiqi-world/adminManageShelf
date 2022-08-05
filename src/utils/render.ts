import Vue, { createVNode, render, h } from 'vue';
import { Loading } from '/@/components/Loading/index';

/**
 * 动态创建组件
 * @param hostEl 组件要挂载到的Dom
 * @param component 组件
 * @param params 组件参数
 */
export const createComponent = (hostEl: HTMLElement, component: any, params?: any) => {
  // 创建虚拟节点
  let vNode: Vue.VNode | null = h(component, params);
  // 渲染并挂载到宿主节点
  render(vNode, hostEl);
  // 销毁方法
  const destroy = () => {
    render(null, hostEl);
    vNode = null;
  };
  return { vNode, destroy };
};

/**
 * 创建loading
 * @returns loading组件
 */
export const renderLoading = () => {
  // 创建组件
  const props = {
      // ...
    },
    eventHandlers = {
      onClick: () => {},
      // ...
    },
    params = {
      ...props,
      ...eventHandlers,
    };

  let loadingNode = document.querySelector('#loading-container') as HTMLElement;
  if (loadingNode) {
    const { vNode, destroy } = createComponent(loadingNode, Loading, params);
    return { vNode, destroy };
  } else {
    loadingNode = document.createElement('div');
    loadingNode.id = 'loading-container';
    const app: HTMLElement = document.querySelector('#app') as HTMLElement;
    app.appendChild(loadingNode);
    const { vNode, destroy } = createComponent(loadingNode, Loading, params);
    return { vNode, destroy };
  }

  // 销毁组件
  // return { vNode, destroy };
};
