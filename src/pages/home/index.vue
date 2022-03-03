<template>
  <div class="home">
    <el-row class="home-header">
      <el-col :span="5" class="home-title">
        {{ title }}
      </el-col>
      <el-col :span="19" class="breadcrumb">
        这是顶部右侧
        <el-icon><expand /></el-icon>
      </el-col>
    </el-row>
    <el-row class="home-main">
      <el-col :span="5" class="menu">
        <Menu></Menu>
      </el-col>
      <el-col :span="19" class="main">
        <div class="main-container">
          <router-view></router-view>
        </div>
        <div class="footer">
          footer
          {{x}},{{y}}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue';
import { useMouse } from '../../utils/mouse';
import Menu from '../../components/Menu/index.vue';

const {x, y} = useMouse();

const { proxy }: any = getCurrentInstance();
const title = proxy.$title;
</script>

<style lang="scss" scoped>
@mixin back {
  background: #545c64;
  color: #fff;
}
.home {
  .home-header {
    height: 10vh;
    .home-title {
      @include back;
    }
    .breadcrumb {

    }
  }

  .home-main {
    height: 90vh;

    .main {
      background: #f6f4fc;
      padding: 10px;

      .main-container {
        height: 90%;
      }

      .footer {
        height: 10%;
      }
    }
  }
  .menu {
    @include back;

    ul {
      border: 0;
    }
  }
}

</style>