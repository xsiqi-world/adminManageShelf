<template>
  <div class="home">
    <div class="home-left">
      <div class="title">
        {{ title }}
      </div>
      <div class="menu">
        <Menu active-text-color="#ffd04b" background-color="#545c64" text-color="#fff" v-model:isCollapse="isCollapse"></Menu>
      </div>
    </div>
    <div class="home-right">
      <div class="main-header">
        <div :class="[
          'breadcrumb',
          isCollapse ? 'rotate' : ''
        ]" @click="checkCollapse">
          <el-icon :size="30" color="#409EFC"><expand /></el-icon>
        </div>
        <div class="handle-container">
          <!-- <Menu class="handle" :list="handleMenuList" mode="horizontal"></Menu> -->
        </div>
      </div>

      <div class="main-container">
        <div class="main">
          <router-view></router-view>
        </div>
        <div class="footer">
          footer
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, ref } from 'vue';
import Menu from '../../components/Menu/index.vue';

const { proxy }: any = getCurrentInstance();
const title = proxy.$title;
const isCollapse = ref(false);

const checkCollapse = () => {
  isCollapse.value = !isCollapse.value;
}

const handleMenuList = [
  {
    id: 99,
    name: '操作',
    children: [
      {
        id: 100,
        name: '退出登陆',
        path: '/home',
        children: [],
      },
    ],
  },
];

onMounted(() => {
  //resize：屏幕的大小发生改变就触发监听事件resetrem
  window.addEventListener("resize", resize());

  function resize() {
    const html: HTMLElement = document.querySelector('html') as HTMLElement;
    let timer: any = null;
    return () => {
      if (timer) return;
      timer = setTimeout(() => {
        if (html?.clientWidth < 900) {
          console.log('小于900')
        } else {
          console.log('大于900')
        }
        timer = null;
      }, 500);
    }
  }
})


</script>

<style lang="scss" scoped>
@mixin back {
  background: #545c64;
  color: #fff;
}

@mixin headerWidthHeight {
  height: 5%;
}

@mixin mainWidthHeight {
  height: 95%;
}
.home {
  display: flex;
  width: 100vw;
  height: 100vh;
  .home-left {
    .title {
      @include back;
      @include headerWidthHeight;
      text-align: center;
    }

    .menu {
      @include back;
      @include mainWidthHeight;

      ul {
        border: 0;
      }
    }
  }
  .home-right {
    width: 100%;
    .main-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      @include headerWidthHeight;

      .breadcrumb {
        transition: .3s all;
        &.rotate {
          transform: rotate(90deg);
        }
      }

      .handle-container {
        // .handle {
        //   width: 200px;
        //   >>> .menu-item {
        //     width: 200px;
        //   }
        // }
      }
    }

    .main-container {
      height: 95%;
      .main {
        height: 95%;
        background: #f4f6fa;
        padding: 10px;
      }
      .footer {
        height: 5%;
      }
    }
  }
}
</style>
