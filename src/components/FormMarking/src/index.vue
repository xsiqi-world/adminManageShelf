<template>
  <div class="formMarking">
    <div class="menus">
      <div class="group-option" draggable="true">
        <span>单行文本</span>
      </div>
      <div class="group-option" draggable="true">
        <span>单选项框组</span>
      </div>
      <div class="group-option" draggable="true">
        <span>多选框组</span>
      </div>
      <div class="group-option" draggable="true">
        <span>日期选择器</span>
      </div>
    </div>
    <div :class="['canvas-container', appendControl ? 'append' : '']"></div>
    <el-button :icon="Search">Search</el-button>
  </div>
</template>

<script lang="ts">
import { Search } from '@element-plus/icons-vue';
import { defineComponent, onMounted, ref } from 'vue';
import { throttle } from '/@/utils/index';
export default defineComponent({
  setup() {
    const draging = ref();
    const appendControl = ref(false);
    onMounted(() => {
      const menus: HTMLElement = document.querySelector('.menus') as HTMLElement;
      const canvasContainer: HTMLElement = document.querySelector('.canvas-container') as HTMLElement;
      menus.addEventListener('dragstart', function(e) {
        console.log('开始了')
        e.dataTransfer.setData("te", e.target.innerText); //不能使用text，firefox会打开新tab
        //event.dataTransfer.setData("self", event.target);
        draging.value = e.target;
      })
      // 只在自己的区域触发
      canvasContainer.addEventListener('dragover', throttle(dragover, 200))
      menus.addEventListener('dragend', function(e) {
        console.log('松手了')
        appendControl.value = false;
      })
      // 只要在拖动中就触发
      menus.addEventListener('drag', throttle(drag, 200))
    })

    const drag = function(e) {
      e.preventDefault();
      console.log('拖动中')
    }

    const dragover = function(e) {
      e.preventDefault();
      console.log('进来了')
      appendControl.value = true;
    }

    return {
      Search,
      appendControl
    };
  },
});
</script>

<style lang="scss" scoped>
.formMarking {
  display: flex;
  align-items:flex-start;
  align-content:flex-start;
  .menus {
    width: 300px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-right: 10px;
    .group-option {
      background: #e5e6eb;
      padding: 10px;
      font-size: 13px;
      width: 40%;
      margin: 5px;
      cursor: move;
    }
  }

  .canvas-container {
    min-width: 500px;
    height: 500px;
    position: relative;
    background: #fff;
    align-self: center;
    box-shadow: 0 4px 12px #ebedf0;

    &.append::after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 5px;
      border-radius: 10px;
      background: #409eff;
    }
  }
}
</style>
