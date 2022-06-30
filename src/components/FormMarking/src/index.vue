<template>
  <div class="formMarking">
    <div class="menus">
      <FormMenu :menuList="menuList"></FormMenu>
    </div>
    <div class="canvas">
      <div class="canvas-container">
        <li class="line" :style="{ display: 'none' }"></li>
        <FormComp :model="formVal">
          <div
            class="canvas-container__item"
            :class="[comps[key].active ? 'active' : '']"
            :data-key="key + 1"
            :key="item.name"
            v-for="(item, key) in comps"
            @click="activeCanvas(key)"
            :draggable="item.activeIsDrag"
          >
            <!-- <InputComp
              v-model:itemValue="formVal[item.name]"
              :itemConfig="inputCompData"
            ></InputComp> -->

            {{ item.type }}
            <component :is="item.type" v-model:itemValue="formVal[item.name]"></component>
            <div class="widget-view-action" v-if="comps[key].active">
              <el-icon><DocumentCopy /></el-icon>
              <el-icon><DeleteFilled /></el-icon>
            </div>
            <div
              class="widget-view-drag"
              v-if="comps[key].active"
              :draggable="!item.activeIsDrag"
              @mousedown="() => mousedown(key)"
              @mouseup="() => mouseup(key)"
            >
              <el-icon><Rank /></el-icon>
            </div>
            <div class="widget-view-model"><span>input_s9k49vns</span></div>
          </div>
        </FormComp>
      </div>
    </div>
    <div class="config"></div>
    <el-button :icon="Search">Search</el-button>
  </div>
</template>

<script lang="ts">
import { Search } from '@element-plus/icons-vue';
import { defineComponent, onMounted, ref, reactive, nextTick } from 'vue';
import { throttle } from '/@/utils/index';
import InputComp from './components/InputComp.vue';
import FormComp from './components/FormComp.vue';
import inputCompData from './datas/inputComp.json';
import formMenuList from './datas/formMenu.json';
import inputRegisterConfig from './inputComp';
import FormMenu from './components/FormMenu.vue';

export default defineComponent({
  components: {
    InputComp,
    FormComp,
    FormMenu,
    ...inputRegisterConfig,
  },
  setup() {
    const menuList = formMenuList;
    const comps = reactive([
      {
        name: 'name1',
        type: 'textInput',
        active: false,
        activeIsDrag: false,
      },
      {
        name: 'name2',
        type: 'textInput',
        active: false,
        activeIsDrag: false,
      },
      {
        name: 'name3',
        type: 'passwordInput',
        active: false,
        activeIsDrag: false,
      },
    ]);
    const formVal = reactive({
      name1: '1',
      name2: '2',
      name3: '3',
    });
    let draging: HTMLElement;
    let overDraging: HTMLElement;
    const overIndex = ref(1);// 松手时的元素key
    const activeIndex = ref(0);// 选中的元素key
    const upOrDown = ref(1);// 1:上，0:下
    const isAppend = ref(false);

    onMounted(() => {
      const menusNode = document.querySelector('.menus') as HTMLElement;
      const canvasContainer = document.querySelector('.canvas-container') as HTMLElement;

      menusNode.addEventListener('dragstart', dragstart);
      canvasContainer.addEventListener('dragstart', dragstart);
      // 在区域中移动触发
      canvasContainer.addEventListener('dragover', throttle(canvasDragover, 50), true);
      menusNode.addEventListener('dragover', throttle(menusDragover, 200), true);

      menusNode.addEventListener('dragend', menusDragend, false);
      canvasContainer.addEventListener('dragend', canvasDragend, false);
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
      const target = e.target;
      console.log('进来了menu');
      isAppend.value = false;
    };

    const menusDragend = function (e) {
      console.log('松手了', overIndex.value, e.target);
      const line = document.querySelector('.line') as HTMLElement;

      setTimeout(() => {
        line.style.display = 'none';
        comps[activeIndex.value].activeIsDrag = false;

        appendComp(isAppend.value, overIndex.value);

        console.log(comps, formVal);
      }, 300);
    };

    const canvasDragend = function (e) {
      const line = document.querySelector('.line') as HTMLElement;
      comps[activeIndex.value].activeIsDrag = false;
      const target = e.target;
      setTimeout(() => {
        line.style.display = 'none';
console.log(activeIndex.value, overIndex.value)

        // comps[overIndex.value - 1] = comps.splice(activeIndex.value, 1, comps[overIndex.value - 1])[0];

        const dragingRect: DOMRect = overDraging.getBoundingClientRect();
        const targetRect: DOMRect = target.getBoundingClientRect();

        nextTick(() => {
          // const oldComp = Object.assign({}, comps[activeIndex.value]);
          // comps.splice(activeIndex.value, 1);
          // comps.splice(overIndex.value - 2, 0, oldComp);
          comps[overIndex.value - 1] = comps.splice(activeIndex.value, 1, comps[overIndex.value - 1])[0];
        })

        target.parentNode.insertBefore(overDraging, target);


        _animate(dragingRect, overDraging);
        _animate(targetRect, target);
      }, 300);
    }

    const canvasDragover = function (e) {
      e.preventDefault();
      const line = document.querySelector('.line') as HTMLElement;
      const target = e.target;

      isAppend.value = true;

      if (line.style.display == 'none') {
        line.style.display = 'block';
      }
      if (!target.classList.contains('canvas-container__item') || target == draging) {
        return;
      }
      if (target.animated) {
        return;
      }
      const dragingRect: DOMRect = line.getBoundingClientRect();
      const targetRect: DOMRect = target.getBoundingClientRect();
      const y = e.offsetY;
      if (y > target.offsetHeight / 2) {
        console.log('下');
        upOrDown.value = 0;
        target.parentNode.insertBefore(line, target.nextElementSibling);
      } else {
        console.log('上');
        upOrDown.value = 1;
        target.parentNode.insertBefore(line, target);
      }

      _animate(dragingRect, line);
      _animate(targetRect, target);

      const key = target.getAttribute('data-key');
      overIndex.value = key;
      overDraging = target;

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

    // 选中组件
    const activeCanvas = index => {
      comps.map(item => {
        item.active = false;
        return item;
      });
      comps[index].active = true;
      activeIndex.value = index;
    };

    const random = () => {
      return Math.random().toString(36).substr(2);
    };

    const mousedown = key => {
      comps[key].activeIsDrag = true;
      activeIndex.value = key;
    };

    const mouseup = key => {
      comps[key].activeIsDrag = false;
    };

    // 插入comp
    const appendComp = (isAppend, key) => {
      if (isAppend) {
        const randomNum = random();
        formVal['name' + randomNum] = randomNum;
        if (upOrDown.value) {
          comps.splice(key - 1, 0, {
            name: 'name' + randomNum,
            type: 'passwordInput',
            active: false,
            activeIsDrag: false,
          });
        } else {
          comps.splice(key, 0, {
            name: 'name' + randomNum,
            type: 'passwordInput',
            active: false,
            activeIsDrag: false,
          });
        }
      }
    }

    return {
      Search,
      formVal,
      menuList,
      inputCompData,
      comps,
      activeCanvas,
      mousedown,
      mouseup,
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
  }

  .canvas {
    min-width: 500px;
    height: 500px;
    position: relative;
    background: #fff;
    align-self: center;
    box-shadow: 0 4px 12px #ebedf0;
    overflow: auto;
    padding: 5px;

    .line {
      width: 100%;
      height: 5px;
      border-radius: 5px;
      background: #409eff;
      position: relative;
      left: 0;
      z-index: 10;
      // transition: all 0.1s ease-in-out;
    }

    .canvas-container {
      min-height: 100%;

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

        .widget-view-action {
          position: absolute;
          right: 0;
          bottom: 0;
          height: 28px;
          line-height: 28px;
          background: #409eff;
          z-index: 10;
          i {
            font-size: 14px;
            color: #fff;
            margin: 0 5px;
            cursor: pointer;
          }
        }
        .widget-view-drag {
          display: block;
          position: absolute;
          left: -2px;
          top: -2px;
          bottom: -18px;
          height: 28px;
          line-height: 28px;
          background: #409eff;
          z-index: 10;
          i {
            font-size: 14px;
            color: #fff;
            margin: 0 5px;
            cursor: move;
          }
        }
        .widget-view-model {
          position: absolute;
          top: 2px;
          right: 3px;
          font-size: 12px;
          color: #67c23a;
          z-index: 9;
          font-weight: 500;
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
