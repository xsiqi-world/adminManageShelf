<template>
  <div class="formMarking">
    <div class="menus">
      <div class="group-option" draggable="true" v-for="item in menus">
        <span>{{ item.text }}</span>
      </div>
    </div>
    <div class="canvas">
      <div class="canvas-container">
        <li class="line" :style="{ display: 'none' }"></li>
        <FormComp :model="formVal">
          <div
            class="canvas-container__item"
            :class="[comps[key].active ? 'active' : '']"
            :data-key="key + 1"
            :key="key"
            v-for="(item, key) in comps"
            @click="activeCanvas(key)"
          >
            <!-- <InputComp
              v-model:itemValue="formVal[item.name]"
              :itemConfig="inputCompData"
            ></InputComp> -->
            <component :is="item.type" v-model:itemValue="formVal[item.name]" :itemConfig="inputCompData"></component>

          </div>
        </FormComp>
      </div>
    </div>
    <div class="config">
    </div>
    <el-button :icon="Search">Search</el-button>
  </div>
</template>

<script lang="ts">
import { Search } from '@element-plus/icons-vue';
import { defineComponent, onMounted, ref, reactive, h } from 'vue';
import { throttle } from '/@/utils/index';
import InputComp from './components/inputComp.vue';
import FormComp from './components/FormComp.vue';
import inputCompData from './datas/inputComp.json';
import inputConfig from './inputComp';

export default defineComponent({
  components: {
    InputComp,
    FormComp,
    ...inputConfig
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
    const comps = reactive([
      {
        key: 1,
        name: 'name1',
        type: 'textInput',
        active: false,
      },
      {
        key: 2,
        name: 'name2',
        type: 'textInput',
        active: false,
      },
      {
        key: 3,
        name: 'name3',
        type: 'passwordInput',
        active: false,
      },
    ]);
    const formVal = reactive({
      name1: '1',
      name2: '2',
      name3: '3',
    });
    let draging: HTMLElement;
    const overKey = ref(1);

    onMounted(() => {
      const menusNode = document.querySelector('.menus') as HTMLElement;
      const canvasContainer = document.querySelector('.canvas-container') as HTMLElement;

      menusNode.addEventListener('dragstart', dragstart);
      // canvasContainer.addEventListener('dragstart', dragstart)
      // 在区域中移动触发
      canvasContainer.addEventListener('dragover', throttle(canvasDragover, 50), true);
      menusNode.addEventListener('dragover', throttle(menusDragover, 200), true);

      menusNode.addEventListener('dragend', menusDragend, false);
      // canvasContainer.addEventListener('dragend', menusDragend, false);
    });

    const dragstart = function (e) {
      const target = e.target as HTMLElement;
      console.log('开始了', target);
      // e.dataTransfer.setData('te', target.innerText); //不能使用text，firefox会打开新tab
      //event.dataTransfer.setData("self", event.target);
      draging = target;
    };

    const menusDragover = function (e) {
      e.preventDefault();
      console.log('进来了menu');
    };

    const menusDragend = function () {
      console.log('松手了', overKey.value);
      const line = document.querySelector('.line') as HTMLElement;
      const canvasContainer = document.querySelector('.canvas-container') as HTMLElement;
      const canvasList = document.querySelectorAll('.canvas-container__item') as NodeList;
      setTimeout(() => {
        line.style.display = 'none';

        comps.push({
          key: 3,
          name: 'name3',
          type: 'passwordInput',
          active: false,
        });
        console.log(comps)

        // const hostDom = document.createElement('div');
        // hostDom.className = 'canvas-container__item';

        // canvasContainer.insertBefore(hostDom, canvasList[overKey.value - 1])

        // registerConfig.componentsMap.get('text').render(hostDom);
      }, 300);
    };

    const canvasDragover = function (e) {
      e.preventDefault();
      const line = document.querySelector('.line') as HTMLElement;
      const target = e.target;
      let dragingRect: DOMRect;
      let targetRect: DOMRect;
      if (!target.classList.contains('canvas-container__item') || target == draging) {
        return;
      }
      if (target.animated) {
        return;
      }
      if (line.style.display == 'none') {
        line.style.display = 'block';
      }
      dragingRect = line.getBoundingClientRect();
      targetRect = target.getBoundingClientRect();
      const y = e.offsetY;
      if (y > target.offsetHeight / 2) {
        console.log('下');
        target.parentNode.insertBefore(line, target.nextElementSibling);
      } else {
        console.log('上');
        target.parentNode.insertBefore(line, target);
      }

      _animate(dragingRect, line);
      _animate(targetRect, target);

      const key = target.getAttribute('data-key');
      overKey.value = key;

      // console.log('进来了', target, e.offsetX, e.offsetY, target.offsetHeight, e);
    };

    const getItemNode = target => {
      if (target?.classList?.contains('canvas-container__item')) {
        return target;
      } else {
        return getItemNode(target.parentNode);
      }
    };

    const _animate = (prevRect, target) => {
      const ms = 200;

      if (ms) {
        const currentRect = target.getBoundingClientRect();

        if (prevRect.nodeType === 1) {
          prevRect = prevRect.getBoundingClientRect();
        }

        _css(target, 'transition', 'none');
        _css(
          target,
          'transform',
          'translate3d(' +
            (prevRect.left - currentRect.left) +
            'px,' +
            (prevRect.top - currentRect.top) +
            'px,0)'
        );

        target.offsetWidth; // 触发重绘
        //放在timeout里面也可以
        // setTimeout(function() {
        //     _css(target, 'transition', 'all ' + ms + 'ms');
        //     _css(target, 'transform', 'translate3d(0,0,0)');
        // }, 0);
        _css(target, 'transition', 'all ' + ms + 'ms');
        _css(target, 'transform', 'translate3d(0, 0, 0)');

        clearTimeout(target.animated);
        target.animated = setTimeout(function () {
          _css(target, 'transition', '');
          _css(target, 'transform', '');
          target.animated = false;
        }, ms);
      }
    };

    //给元素添加style
    function _css(el, prop, val) {
      let style = el && el.style;

      if (style) {
        if (val === void 0) {
          if (document.defaultView && document.defaultView.getComputedStyle) {
            val = document.defaultView.getComputedStyle(el, '');
          } else if (el.currentStyle) {
            val = el.currentStyle;
          }

          return prop === void 0 ? val : val[prop];
        } else {
          if (!(prop in style)) {
            prop = '-webkit-' + prop;
          }

          style[prop] = val + (typeof val === 'string' ? '' : 'px');
        }
      }
    }

    const activeCanvas = index => {
      comps.map(item => {
        item.active = false;
        return item;
      });
      comps[index].active = true;
    };

    return {
      Search,
      formVal,
      menus,
      inputCompData,
      comps,
      activeCanvas,
      inputConfig,
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
      margin: 2px 0;
      border-radius: 10px;
      background: #409eff;
      position: relative;
      left: 0;
      z-index: 10;
      // transition: all 0.1s ease-in-out;
    }

    .canvas-container {
      .canvas-container__item {
        user-select: none;
        position: relative;
        padding: 10px;
        margin: 3px 0;
        border: 1px dashed hsla(0, 0%, 66.7%, 0.5);
        &.active {
          outline: 2px solid #409eff;
          border: 1px solid #409eff;
        }

        &:after {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          display: block;
          z-index: 8;
          content: '';
        }
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
