<template>
  <el-menu
    :default-active="index"
    class="el-menu-vertical"
    @select="handleSelect"
    v-bind="$attrs"
    router
    :collapse="isCollapse"
    unique-opened
  >
    <MenuItem :menuList="menuList"></MenuItem>
  </el-menu>
</template>

<script lang="ts">
import { onMounted, defineComponent, PropType, toRefs } from 'vue';
import MenuItem from './MenuItem.vue';
import menuListData from './data.json';
import { getSession, setSession } from '/@/utils';
import { useRoute } from 'vue-router';
import { menuItem } from './types';

export default defineComponent({
  name: 'Menu',
  components: {
    MenuItem
  },
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

    const handleSelect = (index: string): void => {
      return setSession('menuIndex', index);
    };

    const menuList: menuItem[] = list || menuListData;

    const dps = (menuList) => {
      menuList.forEach((item) => {
        if (!/\-/.test(item.index)) {
          item.index = '' + item.id;
        }
        
        if (item.children?.length > 0) {
          for (let i = 0; i < item.children.length; i++) {
            item.children[i].index = item.index + '-' + item.children[i].id;
          }
          dps(item.children);
        }
      })
    }

    dps(menuList);

    return {
      index,
      handleSelect,
      menuList,
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
