<template>
  <el-menu
    :default-active="index"
    class="el-menu-vertical-demo"
    @select="handleSelect"
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    unique-opened
  >
    <MenuItem :menuList="menuList"></MenuItem>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import MenuItem from "./MenuItem.vue";
import menuList from "./data.json";
import { getSession, setSession } from "../../utils";
import { useRouter, useRoute } from "vue-router";

console.log(menuList);

const index = Number(getSession("menuIndex"));
const router = useRouter();
const route = useRoute();

onMounted(() => {
  console.log(route.query)
})

const handleSelect = (index: any, indexPath: any): void => {
  setSession("menuIndex", index);

  const findRoute = () => {
    
  }

  // router.push({
  //   name: 'test',
  //   path: "/test"
  // });
};
</script>

<style lang="scss" scoped>
</style>