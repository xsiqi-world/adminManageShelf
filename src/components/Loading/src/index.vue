<template>
  <div :class="['wrap', showLoadingFlag ? 'show' : '']">
    <div class="center-div">
      <svg class="c-c-c">
        <!-- score为百分比值 -->
        <!-- color为圆环的色值 -->
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke="#eee"
          stroke-width="5"
          fill="none"
          :stroke-dashoffset="80 * 3.14 + 'px'"
        />
        <circle
          cx="48"
          cy="48"
          r="40"
          stroke="#3e9cfa"
          stroke-width="5"
          fill="none"
          :stroke-dasharray="10 * 8 * 3.14 + 'px'"
          :stroke-dashoffset="7 * 8 * 3.14 + 'px'"
          class="blue-circle"
        />
        <!-- 此处前面值为圆环占的值，后面值为圆环总长度 -->
        <text x="23" y="52" fill="#3e9cfa" font-size="13">loading</text>
      </svg>
    </div>
    <div class="mask" @click="closeMyself(closeOnClickModal)"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, unref } from 'vue';
import type { PropType } from 'vue';
export default defineComponent({
  name: 'loading',
  props: {
    closeOnClickModal: {
      type: Boolean as PropType<boolean>,
      default: () => false,
    },
  },
  setup(props, ctx) {
    const { closeOnClickModal } = toRefs(props);
    const showLoadingFlag = ref(true);

    const closeMyself = (state: boolean = false) => {
      console.log('hhh', unref(closeOnClickModal));
      if (unref(closeOnClickModal)) {
        ctx.emit('close');
      }
    };
    return {
      showLoadingFlag,
      closeMyself,
      closeOnClickModal
    };
  },
});
</script>

<style lang="scss" scoped>
.loading {
  
}

.c-c-c {
  display: block;
  position: relative;
  margin: 0 auto;
  width: 96px;
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.blue-circle {
  transform: rotateZ(-90deg);
  transform-origin: 50% 50%;
  // transition: stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease 0s;
  // animation: draw 5s ease 3;// 循环三次
  animation: draw 2.5s ease infinite;
}
@keyframes draw {
  0% {
    stroke-dashoffset: 1000;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

// svg *:hover {
//   fill: greenyellow;
//   stroke: greenyellow;
//   cursor: pointer;
// }
* {
  transition: all 1s;
}

.wrap {
  display: none;
  &.show {
    display: block;
  }
  .mask {
    background-color: rgb(155, 155, 155, 0.6);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 200;
    overflow: hidden;
    /* 让鼠标事件无效 */
    /* pointer-events: none; */
  }

  .center-div {
    height: 300px;
    width: 300px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    // box-shadow: 0 2px 8px 0 #4a4a4a;
    // background-color: #fff;
    z-index: 300;
    /* 让鼠标事件有效 */
    pointer-events: auto;
  }
}

@font-face {
  font-family: 'iconfont'; /* Project id 2618325 */
  src: url('//at.alicdn.com/t/font_2618325_7cebq87qt57.woff2?t=1623985676663') format('woff2'),
    url('//at.alicdn.com/t/font_2618325_7cebq87qt57.woff?t=1623985676663') format('woff'),
    url('//at.alicdn.com/t/font_2618325_7cebq87qt57.ttf?t=1623985676663') format('truetype');
}

.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-jiantou:before {
  content: '\e63f';
}

.icon-jiantou1:before {
  content: '\e663';
}
</style>
