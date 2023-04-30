<template>
  <el-sub-menu 
    v-for="item in parentList" 
    v-bind:key="item.id" 
    :index="String(item.id)"
  >
    <template #title>
      <el-icon :size="20"><location /></el-icon>
      <span>{{ item.title }}</span>
    </template>

    <!-- 递归组件 -->
    <MenuItem v-if="item.children && item.children.length > 0" :menuList="item.children"></MenuItem>
  </el-sub-menu>
  <el-menu-item
    v-for="item in childList"
    v-bind:key="item.id"
    :index="String(item.id)"
    :route="{
      path: '/' + item.url,
    }"
  >
    <el-icon><setting /></el-icon>
    <template #title>{{ item.title }}</template>
  </el-menu-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { menuItem } from '../../types/index';

export default defineComponent({
  name: 'MenuItem',
  props: {
    menuList: {
      type: Array as PropType<any[]>,
      default: [],
    },
  },
  setup(props) {
    const { menuList } = props;

    const parentList = computed(() => {
      return menuList.filter(item => item.children && item.children.length > 0);
    });

    const childList = computed(() => {
      return menuList.filter(item => !item.children || item.children.length === 0);
    });

    return {
      parentList,
      childList
    };
  },
});
</script>

<style lang="scss" scoped></style>
