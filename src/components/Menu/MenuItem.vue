<template>
  <div v-for="(item, key) in menuList" v-bind:key="key" >
    <el-sub-menu 
      v-if="item.children && item.children.length > 0"
      :index="item.id"
    >
      <template #title>
        <span>{{ item.name }}</span>
      </template>
      
      <MenuItem v-if="item.children && item.children.length > 0" :menuList="item.children"></MenuItem>
      
    </el-sub-menu>
    <el-menu-item 
      v-if="!item.children || item.children.length == 0" 
      :index="item.id"
      :route="{
        path: '/about'
      }"
      @click="handleClick"
    >
      <span>{{ item.name }}</span>
    </el-menu-item>
  </div>
</template>

<script lang="ts">
import { menuItem } from './types';
import { useRouter } from "vue-router";

export default {
  name: 'MenuItem',
  props: {
    menuList: {
      type: Array,
      default: []
    }
  },
  setup(props) {
    const { menuList } = props;

    const router = useRouter();
    const handleClick = () => {
      // router.push({
      //   name: 'test',
      //   path: "/test"
      // });
    }
    return {
      menuList,
      handleClick
    }
  }
}


</script>

<style lang="scss" scoped>

</style>