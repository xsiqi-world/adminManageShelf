<template>
  <div
    class="group-option"
    draggable="true"
    v-for="(item, compType) of menuList"
    :data-type="compType"
  >
    <span>{{ item.label }}</span>
  </div>
</template>

<script>
import comp from '../index';

export default {
  props: {},
  setup(props) {
    const menuList = {};
    for (let key in comp) {
      menuList[key] = comp[key].props.itemConfig;
    }
    // console.log(menuList);
    return {
      menuList,
      comp
    };
  },
};
</script>

<style lang="scss" scoped>
.group-option {
  background: #e5e6eb;
  padding: 10px;
  font-size: 13px;
  width: 48%;
  margin: 1%;
  display: inline-block;
  cursor: move;

  &:hover {
    color: #409eff;
    background: #ecf5ff;
    border: 1px dashed #409eff;
  }
}
</style>
