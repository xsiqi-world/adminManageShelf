<template>
  <div v-for="(item, key) in menuList" v-bind:key="key" >
    <el-sub-menu 
      v-if="item.children && item.children.length > 0"
      :index="item.id"
    >
      <template #title>
        <span>{{ item.name }}</span>
      </template>
      
      <MenuItem :menuList="item.children"></MenuItem>
      
    </el-sub-menu>
    <el-menu-item 
      v-if="!item.children || item.children.length == 0" 
      :index="item.id"
      :route="{
        path: item.path
      }"
    >
      <span>{{ item.name }}</span>
    </el-menu-item>
  </div>
</template>

<script lang="ts">
// import { useRouter } from "vue-router";
import { defineComponent, PropType } from 'vue';
import { menuItem } from './types';

export default defineComponent({
  name: 'MenuItem',
  props: {
    menuList: {
      type: Array as PropType<menuItem[]>,
      default: []
    }
  },
  setup(props) {
    const { menuList } = props;

    // const router = useRouter();
    // router.push({
    //   name: 'test',
    //   path: "/test"
    // });

    return {
      menuList
    }
  }
})


</script>

<style lang="scss" scoped>

</style>