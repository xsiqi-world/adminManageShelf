<template>
  <div class="tree-children" v-if="childList.length > 0">
    <div class="tree-node" v-for="child in childList" :key="child.id">
      <div :style="{ 'padding-left': 18 * index + 'px' }" class="tree-content">
        <!-- <el-icon><CaretRight /></el-icon> -->
        <!-- <span>test-level1-1</span> -->

        <Checkbox :id="child.id" :title="child.title" :checkedKeys="checkedKeys" @change="checkedChange"></Checkbox>
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
import { Checkbox } from '/@/components/Checkbox/index'

export default defineComponent({
  components: {
    Checkbox
  },
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
    const checkedKeys: any[] = inject('checkedKeys') as any[];

    return {
      checkedChange,
      checkedKeys,
      childList,
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

</style>

<style>
/* .tree-children {
  display: flex;
  flex: 0 0 100px;
} */
</style>