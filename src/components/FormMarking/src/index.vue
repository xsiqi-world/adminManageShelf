<template>
  <div class="formMarking">
    <div class="menus">
      <div class="group-option" draggable="true" v-for="item in menus">
        <span>{{ item.text }}</span>
      </div>
    </div>
    <div class="canvas">
      <div class="canvas-container">
        <li class="line" :style="{display: 'none'}"></li>
        <div class="canvas-container__item">
          <inputComp>hello</inputComp>
        </div>
        <div class="canvas-container__item">
          <inputComp>hello</inputComp>
        </div>
        <div class="canvas-container__item">
          <inputComp>hello</inputComp>
        </div>
      </div>
    </div>
    <el-button :icon="Search">Search</el-button>
  </div>
</template>

<script lang="ts">
import { Search } from '@element-plus/icons-vue';
import { defineComponent, onMounted, ref } from 'vue';
import { throttle } from '/@/utils/index';
import inputComp from './components/input.vue';

export default defineComponent({
  components: {
    inputComp,
  },
  setup() {
    const menus = [
      {
        text: '单行文本',
      },
      {
        text: '单选项框组',
      },
      {
        text: '多选框组',
      },
      {
        text: '日期选择器',
      },
    ];
    const draging = ref();
    const nodeDep = new Set();

    onMounted(() => {
      const menusNode = document.querySelector('.menus') as HTMLElement;
      const canvasContainer = document.querySelector('.canvas-container') as HTMLElement;

      menusNode.addEventListener('dragstart', function (e) {
        const target = e.target as HTMLElement;
        console.log('开始了', target);
        e.dataTransfer.setData('te', target.innerText); //不能使用text，firefox会打开新tab
        //event.dataTransfer.setData("self", event.target);
        draging.value = target;
      });
      // 在区域中移动触发
      canvasContainer.addEventListener('dragover', throttle(canvasDragover, 100), true);
      menusNode.addEventListener('dragover', throttle(menusDragover, 200), true);

      menusNode.addEventListener('dragend', function () {
        console.log('松手了');
        const line = document.querySelector('.line') as HTMLElement;
        line.style.display = 'none';
        setTimeout(() => {
          emptyDep();
        }, 300);
      });
      // 只要在拖动中就触发
      // menusNode.addEventListener('drag', throttle(drag, 200))
    });

    const emptyDep = () => {
      for (const dep of nodeDep) {
        dep.style.marginTop = 0;
        dep.style.marginBottom = 0;
        nodeDep.delete(dep);
      }
    };

    const drag = function (e) {
      e.preventDefault();
      console.log('拖动中');
    };

    const menusDragover = function (e) {
      e.preventDefault();
      console.log('进来了menu');
    };

    const canvasDragover = function (e) {
      e.preventDefault();
      const line = document.querySelector('.line') as HTMLElement;
      const target = e.target;
      if (!target.classList.contains('canvas-container__item')) {
        return;
      }
      if (line.style.display == 'none') {
        line.style.display = 'block';
      }

      const y = e.offsetY;
      if (y > target.offsetHeight / 2) {
        console.log('下');
        emptyDep();
        target.nextElementSibling.style.marginTop = '5px';
        line.style.top = (target.offsetTop + target.offsetHeight + 5) + 'px';
        nodeDep.add(target);
      } else {
        console.log('上');
        emptyDep();
        target.style.marginTop = '5px';
        line.style.top = (target.offsetTop - 5) + 'px';
        nodeDep.add(target);
      }
      console.log('进来了', target, e.offsetX, e.offsetY, target.offsetHeight, e);
    };

    const getItemNode = target => {
      if (target?.classList?.contains('canvas-container__item')) {
        return target;
      } else {
        console.log(target)
        return getItemNode(target.parentNode);
      }
    };

    return {
      Search,
      menus,
    };
  },
});
</script>

<style lang="scss" scoped>
.formMarking {
  display: flex;
  align-items: flex-start;
  align-content: flex-start;
  .menus {
    width: 300px;
    // height: 500px;
    height: 100%;
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

  .canvas {
    min-width: 500px;
    height: 500px;
    position: relative;
    background: #fff;
    align-self: center;
    box-shadow: 0 4px 12px #ebedf0;

    .line {
      width: 100%;
      height: 5px;
      border-radius: 10px;
      background: #409eff;
      position: absolute;
      left: 0;
      transition: all .1s ease-in-out;
    }

    .canvas-container {
      .canvas-container__item {
        position: relative;
        padding: 10px;
        border: 1px solid black;
        transition: all .1s ease-in-out;
      }
    }

    
  }

  .append-before::before,
  .append-after::after {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    width: 100%;
    height: 5px;
    border-radius: 10px;
    background: #409eff;
  }
  .append-before::before {
    top: 0;
  }
  .append-after::after {
    bottom: 0;
  }
}
</style>

<style>
ul,
li {
  list-style: none;
}
</style>
