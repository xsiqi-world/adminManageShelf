<template>
  <div class="tree-box">
    <!-- <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M384 192v640l384-320.064z"></path></svg> -->
    <div class="tree-node" v-for="item in menuList" :key="item.id">
      <div class="tree-content">
        <!-- <el-icon><CaretRight /></el-icon> -->
        <!-- <span>test-level1</span> -->
        <div
          class="checkbox"
          :class="[checkedKeys.indexOf(String(item.id)) >= 0 ? 'is-checked' : '']"
          @click="checkedChange(item)"
        >
          <span>{{ item.title }}</span>
        </div>
      </div>

      <AuthItem :childList="item.children" :index="1"></AuthItem>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue';
import AuthItem from './authItem.vue';

export default defineComponent({
  components: {
    AuthItem
  },
  props: {
    menuList: {
      type: Array,
      required: true,
    },
    checkedKeys: {
      type: Array,
      required: true,
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
    provide('checkedKeys', checkedKeys);

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

.checkbox {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  // width: 81px;
  height: 32px;
  line-height: 1;
  padding: 6px 18px;
  // height: 93px;
  // line-height: 93px;
  // margin: 0 auto;
  // padding: 6px 18px;
  text-align: center;
  color: #4abe84;
  background-color: #fff;
  border-radius: 7px;
  // box-shadow: 0px 2px 7px 0px rgba(85, 110, 97, 0.35);
  // border: 1px solid rgba(74, 190, 132, 1);
  border: 1px solid #dcdfe6;
  cursor: pointer;
  transition: all 0.3s linear;
  overflow: hidden;
}
.checkbox > span {
  display: inline-flex;
  align-items: center;
}
.checkbox.is-checked {
  border: 1px solid rgba(74, 190, 132, 1);
  box-shadow: 0px 2px 7px 0px rgba(85, 110, 97, 0.35);
}
.checkbox.is-checked:before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  border: 10px solid #4abe84;
  border-left-color: transparent;
  border-bottom-color: transparent;
}
.checkbox.is-checked:after {
  content: '';
  position: absolute;
  width: 3px;
  height: 7px;
  right: 1px;
  top: -2px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-left-color: transparent;
  transform: rotate(45deg);
}
</style>
