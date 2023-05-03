<template>
  <div class="tree-box">
    <!-- <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M384 192v640l384-320.064z"></path></svg> -->
    <div class="tree-node" v-for="item in menuList" :key="item.id">
      <div class="tree-content">
        <!-- <el-icon><CaretRight /></el-icon> -->
        <!-- <span>test-level1</span> -->

        <Checkbox :id="item.id" :title="item.title" :checkedKeys="checkedKeys" @change="checkedChange"></Checkbox>
      </div>

      <AuthItem :childList="item.children" :index="1"></AuthItem>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, provide } from 'vue';
import AuthItem from './authItem.vue';
import { Checkbox } from '/@/components/Checkbox/index';

export default defineComponent({
  components: {
    AuthItem,
    Checkbox
  },
  props: {
    menuList: {
      type: Array,
      required: true,
    },
    checkedKeys: {
      type: Array as PropType<any[]>,
      required: true,
      default: []
    },
  },
  setup(props, ctx) {
    const { menuList, checkedKeys }: { menuList: any[]; checkedKeys: any[] } = props;
    // NOTE:选中权限
    const checkedChange = (rows: any) => {
      const index = checkedKeys.indexOf(String(rows.id));
      if (index >= 0) {
        checkedKeys.splice(index, 1);
      } else {
        checkedKeys.push(String(rows.id));
      }
    };

    provide('checkedChange', checkedChange);
    provide('checkedKeys', checkedKeys as any[]);

    return {
      checkedChange,
      menuList,
    };
  },
});
</script>

<style lang="scss" scoped>
.tree-box {
}
.tree-node {
  .tree-content {
    display: flex;
    align-items: center;
    margin: 10px 0;
    .tree-children {
      display: flex;
    }
  }
}

</style>
