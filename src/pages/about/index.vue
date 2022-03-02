<template>
  <div>
    <h1>关于我们</h1>
    <h1>姓名：{{ state.name }}</h1>
    <h1>年龄：{{ state.age }}</h1>
    <h1>性别：{{ state.sex }}</h1>
    <h1>{{ state1 }}</h1>

    <div>
      <el-radio v-model="radio1" label="1" size="large">Option 1</el-radio>
      <el-radio v-model="radio1" label="2" size="large">Option 2</el-radio>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
export default {
  setup() {
    const state = reactive({
      name: "小明",
      age: 20,
      sex: 1,
    });

    const state1 = ref(111);
    const radio1 = ref('1')

    return {
      state,
      state1,
      radio1
    };
  },
};
</script>

<style lang="scss" scoped>
</style>