<template>
  <div class="formMarking">
    <div class="menus">
      <FormMenu :menuList="menuList"></FormMenu>
    </div>
    <div class="canvas">
      <div class="canvas-container">
        <li class="line" :style="{ display: isAppend ? 'block' : 'none' }"></li>
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

            <component :is="item.type" v-model:itemValue="formVal[item.name]"></component>
            <div v-if="comps[key].active" class="widget-view-action">
              <el-icon @click="() => copyComp(key)"><DocumentCopy /></el-icon>
              <el-icon @click="() => deleteComp(key)"><DeleteFilled /></el-icon>
            </div>
            <div
              v-if="comps[key].active"
              class="widget-view-drag"
              :draggable="!item.activeIsDrag"
              @mousedown="() => mousedown(key)"
              @mouseup="() => mouseup(key)"
            >
              <el-icon><Rank /></el-icon>
            </div>
            <div class="widget-view-model"><span>{{ item.name }}</span></div>

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
import { defineComponent, onMounted, ref, unref, reactive, nextTick } from 'vue';
import type { Ref } from 'vue';
import { throttle } from '/@/utils/index';
import FormComp from './components/FormComp.vue';
import formMenuList from './datas/formMenu.json';
import useDrag, { setDragstart } from '/@/hooks/event/useDrag';

import FormMenu from './components/FormMenu.vue';
import comp from './index';

export default defineComponent({
  components: {
    FormComp,
    FormMenu,
    ...comp
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
      {
        name: 'name4',
        type: 'selectComp',
        active: false,
        activeIsDrag: false,
      },
      {
        name: 'name5',
        type: 'daterangePicker',
        active: false,
        activeIsDrag: false,
      },
    ]);
    const formVal = reactive({
      name1: '1',
      name2: '2',
      name3: '3',
      name4: '2',
      name5: [],
    });
    
    const draging = ref() as Ref<Element>;
    let overDraging: HTMLElement;
    const overIndex = ref(0); // 松手时的元素key
    const activeIndex = ref(0); // 选中的元素key
    const upOrDown = ref(1); // 1:上，0:下
    const isAppend = ref(false);

    onMounted(() => {
      const menusNode = document.querySelector('.menus') as HTMLElement;
      const canvasContainer = document.querySelector('.canvas-container') as HTMLElement;

      setDragstart(menusNode, draging);
      setDragstart(canvasContainer, draging);
      // 在区域中移动触发
      canvasContainer.addEventListener('dragover', throttle(canvasDragover, 100), true);

      canvasContainer.addEventListener(
        'dragenter',
        () => {
          isAppend.value = true;
        },
        false
      );
      // canvasContainer.addEventListener(
      //   'dragleave',
      //   () => {
      //     isAppend.value = false;
      //   },
      //   false
      // );

      menusNode.addEventListener(
        'dragenter',
        () => {
          isAppend.value = false;
        },
        false
      );

      menusNode.addEventListener('dragend', menusDragend, false);
      canvasContainer.addEventListener('dragend', canvasDragend, false);
    });

    const menusDragend = function (e) {
      console.log('松手了', unref(overIndex), e.target);

      setTimeout(() => {
        comps[unref(activeIndex)].activeIsDrag = false;

        appendComp(unref(isAppend), unref(overIndex));

        isAppend.value = false;

        console.log(comps, formVal);
      }, 300);
    };

    const canvasDragend = function (e) {
      comps[unref(activeIndex)].activeIsDrag = false;
      const target = e.target;
      setTimeout(() => {
        console.log(unref(activeIndex), unref(overIndex));

        // const dragingRect: DOMRect = overDraging.getBoundingClientRect();
        // const targetRect: DOMRect = target.getBoundingClientRect();

        nextTick(() => {
          const splice = comps.splice(unref(activeIndex), 1)[0];
          if (upOrDown.value) {
            comps.splice(unref(overIndex) - 1, 0, splice);
          } else {
            comps.splice(unref(overIndex), 0, splice);
          }

          console.log(unref(overIndex) - 1, upOrDown.value)

          // comps[unref(overIndex) - 1] = comps.splice(
          //   unref(activeIndex),
          //   1,
          //   comps[unref(overIndex) - 1]
          // )[0];

          isAppend.value = false;
        });

        // target.parentNode.insertBefore(overDraging, target);

        // _animate(dragingRect, overDraging);
        // _animate(targetRect, target);
      }, 300);
    };

    const canvasDragover = function (e) {
      e.preventDefault();
      const line = document.querySelector('.line') as HTMLElement;
      const target = e.target;

      if (!target.classList.contains('canvas-container__item') || target == unref(draging)) {
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

    // 给元素添加style
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

    // 长按
    const mousedown = key => {
      comps[key].activeIsDrag = true;
      activeIndex.value = key;
    };

    // 长按松手
    const mouseup = key => {
      comps[key].activeIsDrag = false;
    };

    // 插入comp
    const appendComp = (isAppend, key) => {
      if (isAppend) {
        const randomNum = random();
        const name = 'name_' + randomNum;
        formVal[name] = randomNum;
        const index = unref(upOrDown) ? key - 1 : key;
        comps.splice(index, 0, {
          name: name,
          type: 'passwordInput',
          active: false,
          activeIsDrag: false,
        });
      }
    };

    // 复制组件
    const copyComp = (key) => {
      const randomNum = random();
      const name = 'name_' + randomNum;
      comps.splice(key + 1, 0, {
        name: name,
        type: comps[key].type,
        active: false,
        activeIsDrag: false,
      });
    }

    // 删除组件
    const deleteComp = (key) => {
      comps.splice(key, 1);
    }

    return {
      Search,
      formVal,
      menuList,
      comps,
      activeCanvas,
      mousedown,
      mouseup,
      isAppend,
      copyComp,
      deleteComp
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

        // &:after {
        //   position: absolute;
        //   left: 0;
        //   right: 0;
        //   top: 0;
        //   bottom: 0;
        //   display: block;
        //   z-index: 8;
        //   content: '';
        // }

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
