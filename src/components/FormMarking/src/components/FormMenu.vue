<template>
  <div class="group-option" draggable="true" v-for="item in menuList">
    <span>{{ item.text }}</span>
  </div>
</template>

<script>
// import type { PropType } from 'vue';

import { toRefs } from 'vue';

export default {
  props: {
    menuList: {
      type: Array,
    },
  },
  setup(props) {
    const { menuList } = toRefs(props);
    return {
      menuList
    };
  },
};
</script>

<style lang="scss" scoped>
.group-option {
  background: #e5e6eb;
  padding: 10px;
  font-size: 13px;
  width: 40%;
  margin: 5px;
  cursor: move;
}
</style>
