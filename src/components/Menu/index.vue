<template>
  <el-menu
    :default-active="Number(index)"
    class="el-menu-vertical"
    @select="handleSelect"
    v-bind="$attrs"
    unique-opened
    router
    :collapse="isCollapse"
  >
    <MenuItem :menuList="menuList"></MenuItem>
  </el-menu>
</template>

<script lang="ts">
import { onMounted, defineComponent, PropType, computed, reactive, toRefs } from 'vue';
import MenuItem from './MenuItem.vue';
import menuListData from './data.json';
import { getSession, setSession } from '../../utils';
import { useRoute } from 'vue-router';
import { menuItem } from './types';

export default defineComponent({
  name: 'Menu',
  props: {
    list: {
      type: Array as PropType<menuItem[]>
    },
    isCollapse: {
      type: Boolean as PropType<boolean>
    }
  },
  setup(props) {
    const { list } = props;
    // const state = reactive(props);
    const { isCollapse } = toRefs(props);
    const index: string | null = getSession('menuIndex');
    const route = useRoute();

    onMounted(() => {
      console.log(route.query);
    });

    const handleSelect = (index: any): void => {
      setSession('menuIndex', index);
    };

    const menuList: menuItem[] = list || menuListData;

    return {
      index,
      handleSelect,
      menuList,
      MenuItem,
      isCollapse,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
