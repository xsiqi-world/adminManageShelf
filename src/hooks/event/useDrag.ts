import type { Ref } from 'vue';
import { ref, unref, computed, onMounted, onUnmounted } from 'vue';
import { throttle } from '/@/utils/index';

export default function useEventDrag() {
  return {
    setDragstart,
    setDragenter,
    setDragover,
    setDragend
  }
}

// 移动dom开始
export function setDragstart(target: HTMLElement, targetEl: Ref<Element>) {

  const eventHandle = (e: Event) => {
    console.log('开始拖动', target);

    const el = e.target as HTMLElement;
    targetEl.value = el;
  }
  // onMounted(() => {
    target.addEventListener('dragstart', eventHandle, false);
  // });

  // onUnmounted(() => {
  //   target.removeEventListener('dragstart', eventHandle);
  // });
  
  // return {
  //   targetEl
  // };
}

// 进入dom
export function setDragenter(target, fn) {
  onMounted(() => {
    target.addEventListener('dragenter', fn, false);
  });

  onUnmounted(() => {
    target.removeEventListener('dragenter', fn, false);
  });
}

// 在dom中移动
export function setDragover(target, fn) {
  return 1;
}

// 移动dom松手
export function setDragend(target, fn) {
  return {
    targetEl
  };
}