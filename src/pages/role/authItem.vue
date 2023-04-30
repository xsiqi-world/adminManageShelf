<template>
  <div class="tree-children" v-if="childList.length > 0">
    <div class="tree-node" v-for="child in childList">
      <div :style="{ 'padding-left': 18 * index + 'px' }" class="tree-content">
        <!-- <el-icon><CaretRight /></el-icon> -->
        <!-- <span>test-level1-1</span> -->
        <div
          class="checkbox"
          :class="[checkedKeys.indexOf(String(child.id)) >= 0 ? 'is-checked' : '']"
          @click="checkedChange(child)"
        >
          <span>{{ child.title }}</span>
        </div>
      </div>
      <!-- <div class="tree-children"></div> -->
      <AuthItem
        v-if="child.children.length > 0"
        :index="index + 1"
        :childList="child.children"
      ></AuthItem>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

export default defineComponent({
  props: {
    childList: {
      type: Array,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props, ctx) {
    const { childList, index }: { childList: any[]; index: number } = props;

    const checkedChange: any = inject('checkedChange');
    const checkedKeys: any = inject('checkedKeys');
    return {
      checkedChange,
      childList,
      checkedKeys,
      index,
    };
  },
});
</script>

<style lang="scss" scoped>
.role-container {
  .content {
    background-color: #fff;
    .breadcrumb {
      padding: 10px;
    }
  }
}

.tree-node {
  .tree-content {
    display: flex;
    align-items: center;
    margin: 10px 0;
    position: relative;
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
