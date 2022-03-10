<template>
  <div class="menu-item" v-for="(item, key) in menuList" v-bind:key="key">
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.id">
      <template #title>
        <el-icon :size="20"><location /></el-icon>
        <span>{{ item.name }}</span>
      </template>

      <MenuItem :menuList="item.children"></MenuItem>
    </el-sub-menu>
    <el-menu-item
      v-if="!item.children || item.children.length == 0"
      :index="item.id"
      :route="{
        path: item.path,
      }"
    >
      <el-icon><setting /></el-icon>
      <template #title>{{ item.name }}</template>
    </el-menu-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { menuItem } from './types';

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

    return {
      menuList
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
