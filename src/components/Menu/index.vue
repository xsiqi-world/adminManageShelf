<template>
  <el-menu
    :default-active="Number(index)"
    class="el-menu-vertical-demo"
    @select="handleSelect"
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    unique-opened
    router
    :collapse="isCollapse"
  >
    <MenuItem :menuList="menuList"></MenuItem>
  </el-menu>
</template>

<script lang="ts">
import { onMounted, defineComponent } from "vue";
import MenuItem from "./MenuItem.vue";
import menuListData from "./data.json";
import { getSession, setSession } from "../../utils";
import { useRoute } from "vue-router";
import { menuItem } from "./types";

export default defineComponent({
  name: 'Menu',
  setup() {
    const index: string | null = getSession("menuIndex");
    const route = useRoute();
    const isCollapse = false;

    onMounted(() => {
      console.log(route.query)
    });

    const handleSelect = (index: any): void => {
      setSession("menuIndex", index);
    };

    const menuList: menuItem[] = menuListData;

    return {
      index,
      handleSelect,
      menuList,
      MenuItem,
      isCollapse
    }
  }
});


</script>

<style lang="scss" scoped>
</style>