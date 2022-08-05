import { watch } from 'vue';
import type { Ref } from 'vue';
import { ref, unref, computed, onMounted, onUnmounted } from 'vue';

// 移动dom开始
export function setDragstart(
    target: HTMLElement,
    targetEl: Ref<Element>
  ): void {

  const element = ref(target as Element) as Ref<Element>;
  const isAddRef = ref(false);
  const autoRemove = true;
  const options = false;

  const eventHandle = (e: Event) => {
    console.log('开始拖动', e.target);

    const el = e.target as HTMLElement;
    targetEl.value = el;
  }

  // 移除事件
  const removeEventListener = (e: Element) => {
    isAddRef.value = true;
    e.removeEventListener('dragstart', eventHandle, options);
  };
  // 添加事件
  const addEventListener = (e: Element) => e.addEventListener('dragstart', eventHandle, options);

  watch(element, (v, _ov, cleanUp) => {
    if (v) {
      !unref(isAddRef) && addEventListener(v);
      cleanUp(() => {
        autoRemove && removeEventListener(v);
      });
    }
  }, { immediate: true },);

}