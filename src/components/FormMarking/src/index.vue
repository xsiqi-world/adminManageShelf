<template>
  <div class="formMarking">
    <div class="menus">
      <FormMenu></FormMenu>
    </div>
    <div class="canvas">
      <div class="canvas-container">
        <li class="line" v-show="isAppend"></li>
        <el-form :model="formVal">
          <div
            class="canvas-container__item"
            :class="[comps[key].active ? 'active' : '']"
            :data-key="key"
            :key="item.name"
            v-for="(item, key) in comps"
            @click="activeCanvas(key)"
            :draggable="item.activeIsDrag"
          >
            <el-form-item :label="item.label" labelWidth="">
              <component
                :is="item.type"
                v-model:itemConfig="item.config"
                v-model:itemValue="formVal[item.name]"
              ></component>
            </el-form-item>

            <div v-if="comps[key].active" class="widget-view-action">
              <el-icon @click="copyComp(key)"><DocumentCopy /></el-icon>
              <el-icon @click="deleteComp(key)"><DeleteFilled /></el-icon>
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
        </el-form>
      </div>
    </div>

    <!-- <AdjustConfig
      v-model:compType="comps[activeIndex].type"
      v-model:configs="comps[activeIndex].config"
    ></AdjustConfig> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, unref, reactive, nextTick, computed } from 'vue';
import type { Ref } from 'vue';
import { throttle, copyObj } from '/@/utils/index';
import FormComp from './components/FormComp.vue';
import AdjustConfig from './components/AdjustConfig.vue';
import { setDragstart } from './hooks/useDrag';

import FormMenu from './components/FormMenu.vue';
import comp from './index';

export default defineComponent({
  components: {
    FormComp,
    FormMenu,
    AdjustConfig,
    ...comp
  },
  setup() {
    const comps = reactive([
      {
        name: 'name1',
        type: 'textInput',
        label: comp['textInput'].props.itemConfig.title,
        active: true,
        activeIsDrag: false,
        config: Object.assign({}, comp['textInput'].props.itemConfig)
      },
      {
        name: 'name2',
        type: 'textInput',
        label: comp['textInput'].props.itemConfig.title,
        active: false,
        activeIsDrag: false,
        config: Object.assign({}, comp['textInput'].props.itemConfig)
      },
      {
        name: 'name3',
        type: 'passwordInput',
        label: comp['passwordInput'].props.itemConfig.title,
        active: false,
        activeIsDrag: false,
        config: Object.assign({}, comp['passwordInput'].props.itemConfig)
      },
      {
        name: 'name4',
        type: 'selectComp',
        label: comp['selectComp'].props.itemConfig.title,
        active: false,
        activeIsDrag: false,
        config: Object.assign({}, comp['selectComp'].props.itemConfig)
      },
      {
        name: 'name5',
        type: 'daterangePicker',
        label: comp['daterangePicker'].props.itemConfig.title,
        active: false,
        activeIsDrag: false,
        config: Object.assign({}, comp['daterangePicker'].props.itemConfig)
      },
      {
        name: 'name6',
        type: 'dateTimePicker',
        label: comp['dateTimePicker'].props.itemConfig.title,
        active: false,
        activeIsDrag: false,
        config: Object.assign({}, comp['dateTimePicker'].props.itemConfig)
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
    const overDraging = ref() as Ref<Element>;
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
      // canvasContainer.addEventListener('dragover', throttle(canvasDragover, 100), true);
      canvasContainer.addEventListener('dragover', canvasDragover, false);

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
      const target = e.target;
      console.log('松手了', unref(overIndex), e.target);

      setTimeout(() => {
        comps[unref(activeIndex)].activeIsDrag = false;

        if (unref(isAppend)) {
          // 插入组件
          appendComp(unref(overIndex), target.getAttribute('data-type'));
        }

        console.log('comps', comps);

        isAppend.value = false;
      }, 300);
    };

    const canvasDragend = function (e) {
      comps[unref(activeIndex)].activeIsDrag = false;
      const target = e.target;
      // const splice = comps.splice(unref(activeIndex), 1)[0];
      const splice = copyObj(comps[unref(activeIndex)]);
      comps.splice(unref(activeIndex), 1);
      // setTimeout(() => {

        const dragingRect: DOMRect = unref(overDraging).getBoundingClientRect();
        const targetRect: DOMRect = target.getBoundingClientRect();

        nextTick(() => {
          // const splice = comps.splice(unref(activeIndex), 1)[0];
          if (!!unref(upOrDown)) {
            let index = unref(overIndex);
            if (unref(overIndex) == comps.length - 1) {
              index = unref(overIndex) - 1;
            } else if (unref(overIndex) == 0) {
              index = unref(overIndex);
            }
            // 上
            comps.splice(resetNum(index), 0, splice);
          } else {
            let index = unref(overIndex);
            if (unref(overIndex) == comps.length - 1) {
              index = unref(overIndex);
            } else if (unref(overIndex) == 0) {
              index = unref(overIndex) + 1;
            }
            // 下
            comps.splice(index, 0, splice);
          }

          console.log(unref(overIndex), comps.length);

          // comps[unref(overIndex) - 1] = comps.splice(
          //   unref(activeIndex),
          //   1,
          //   comps[unref(overIndex) - 1]
          // )[0];

          isAppend.value = false;
        });

        // target.parentNode.insertBefore(unref(overDraging), target);

        // _animate(dragingRect, unref(overDraging));
        // _animate(targetRect, target);
      // }, 300);
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
      const lineRect: DOMRect = line.getBoundingClientRect();
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

      _animate(lineRect, line);
      _animate(targetRect, target);

      const key = target.getAttribute('data-key');
      overIndex.value = Number(key);
      overDraging.value = target;

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

    // TODO:插入comp
    const appendComp = (key: number, type: string) => {
      const randomNum = random();
      const name = 'name_' + randomNum;
      // formVal[name] = randomNum;
      const index = unref(upOrDown) ? key - 1 : key;
      comps.splice(index, 0, {
        name: name,
        type: type,
        label: comp[type].props.itemConfig.title,
        active: false,
        activeIsDrag: false,
        config: Object.assign({}, comp[type].props.itemConfig)
      });
    };

    // TODO:复制组件
    const copyComp = (key) => {
      const randomNum = random();
      const name = 'name_' + randomNum;
      comps.splice(key + 1, 0, {
        name: name,
        type: comps[key].type,
        label: comps[key].label,
        active: false,
        activeIsDrag: false,
        config: comps[key].config
      });
    }

    // TODO:删除组件
    const deleteComp = (key) => {
      comps.splice(key, 1);
    }

    const resetNum = (num) => {
      return num <= 0 ? 0 : num;
    }

    return {
      isAppend,
      formVal,
      comps,
      activeIndex,
      activeCanvas,
      mousedown,
      mouseup,
      copyComp,
      deleteComp
    };
  },
});
</script>

<style lang="scss" scoped>
.formMarking {
  display: flex;
  height: 100%;
  // align-items: flex-start;
  // align-content: flex-start;
  .menus {
    width: 230px;
    // height: 500px;
    height: 100%;
    // display: flex;
    // justify-content: space-between;
    // flex-wrap: wrap;
    margin-right: 10px;
  }

  .canvas {
    min-width: 500px;
    height: 500px;
    position: relative;
    background: #fff;
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
      // min-height: 100%;

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

        &:hover {
          background: #ecf5ff;
          border: 1px solid #409eff;
        }

        // 选中的遮罩
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
