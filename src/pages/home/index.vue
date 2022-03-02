<template>
  <div class="home">
    <el-row class="home-header">
      <el-col :span="5" class="home-title">
        这是菜单
      </el-col>
      <el-col :span="19" class="breadcrumb">
        这是顶部右侧
      </el-col>
    </el-row>
    <el-row class="home-main">
      <el-col :span="5" class="menu">
        <Menu></Menu>
      </el-col>
      <el-col :span="19" class="main">
        <!-- {{x}},{{y}} -->
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, useSlots } from 'vue';
import { useMouse } from '../../utils/mouse';
import Menu from '../../components/Menu';

const {x, y} = useMouse();
const slots = useSlots();
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