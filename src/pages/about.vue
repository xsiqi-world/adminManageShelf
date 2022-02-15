<template>
  <div>
    <h1>关于我们</h1>
    <h1>姓名：{{ state.name }}</h1>
    <h1>年龄：{{ state.age }}</h1>
    <h1>性别：{{ state.sex }}</h1>
    <h1>{{ state1 }}</h1>
  </div>
</template>

<script lang="ts">
import { reactive } from "@vue/reactivity";
export default {
  setup() {
    const state = reactive({
      name: "小明",
      age: 20,
      sex: 1,
    });

    const state1 = reactive(111);

    return {
      state,
      state1,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>