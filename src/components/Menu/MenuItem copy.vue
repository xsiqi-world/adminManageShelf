<template>
  <el-sub-menu v-if="menuItem.children && menuItem.children.length > 0" :index="menuItem.id">
    <template #title>
      <el-icon :size="20"><location /></el-icon>
      <span>{{ menuItem.name }}</span>
    </template>

    <template v-for="item in menuItem.children" v-bind:key="item.id">
      <MenuItem :menuItem="item"></MenuItem>
    </template>
    
  </el-sub-menu>
  <el-menu-item
    v-if="!menuItem.children || menuItem.children.length == 0"
    :index="menuItem.id"
    :route="{
      path: menuItem.path,
    }"
  >
    <el-icon><setting /></el-icon>
    <template #title>{{ menuItem.name }}</template>
  </el-menu-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { menuItem } from './types';

export default defineComponent({
  name: 'MenuItem',
  props: {
    menuItem: {
      type: Object as PropType<menuItem>,
      default: {},
    },
  },
  setup(props) {
    const { menuItem } = props;

    return {
      menuItem
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
