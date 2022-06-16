<template>
  <el-sub-menu 
    v-for="(item, key) in parentList" 
    v-bind:key="key" 
    :index="item.index"
  >
    <template #title>
      <el-icon :size="20"><location /></el-icon>
      <span>{{ item.name }}</span>
    </template>

    <!-- 递归组件 -->
    <MenuItem v-if="item.children && item.children.length > 0" :menuList="item.children"></MenuItem>
  </el-sub-menu>
  <el-menu-item
    v-for="(item, key) in childList"
    v-bind:key="key"
    :index="item.index"
    :route="{
      path: item.path,
    }"
  >
    <el-icon><setting /></el-icon>
    <template #title>{{ item.name }}</template>
  </el-menu-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { menuItem } from '../../types/index';

export default defineComponent({
  name: 'MenuItem',
  props: {
    menuList: {
      type: Array as PropType<menuItem[]>,
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
