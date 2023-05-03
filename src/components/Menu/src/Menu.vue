<template>
  <el-menu
    :default-active="String(defaultActive || menuIndex)"
    class="el-menu-vertical"
    @select="handleSelect"
    v-bind="$attrs"
    :router="isJump"
    :collapse="isCollapse"
    unique-opened
  >
    <MenuItem :menuList="menuList"></MenuItem>
  </el-menu>
</template>

<script lang="ts">
import { onMounted, defineComponent, PropType, toRefs } from 'vue';
import MenuItem from './components/MenuItem.vue';
import menuListData from '../data.json';
import { getSession, setSession } from '/@/utils';
import { useRoute } from 'vue-router';
import { menuItem } from '../types/index';

export default defineComponent({
  name: 'Menu',
  components: {
    MenuItem
  },
  props: {
    list: {
      type: Array as PropType<menuItem[]>
    },
    // 是否折叠
    isCollapse: {
      type: Boolean as PropType<boolean>
    },
    // 是否跳转
    isJump: {
      type: Boolean as PropType<boolean>,
      default: () => true
    },
    defaultActive: {
      type: [String, Number] as PropType<string | number>,
      default: 0
    }
  },
  setup(props, context) {
    const { list, defaultActive } = props;
    // const state = reactive(props);
    const { isCollapse } = toRefs(props);
    const menuIndex = getSession('menuIndex');
    const route = useRoute();

    onMounted(() => {
      // console.log(route.query);
    });

    const handleSelect = (index: string | number): void => {
      context.emit('active', String(index).split('-').pop());
      if (!defaultActive) {
        return setSession('menuIndex', index);
      }
    };

    // const menuList: menuItem[] = list || menuListData;
    const menuList = list || menuListData;

    const dfs = (menuList) => {
      menuList.forEach((item) => {
        if (!/\-/.test(item.index)) {
          item.index = '' + item.id;
        }
        
        if (item.children?.length > 0) {
          for (let i = 0; i < item.children.length; i++) {
            item.children[i].index = item.index + '-' + item.children[i].id;
          }
          dfs(item.children);
        }
      })
    }

    dfs(menuList);

    return {
      menuIndex,
      handleSelect,
      menuList,
      isCollapse,
    };
  },
});
</script>

<style lang="scss" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  min-width: 200px;
  min-height: 400px;
}
</style>
