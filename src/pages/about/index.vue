<template>
  <div>
    <h1>关于我们</h1>
    <h1>姓名：{{ state.name }}</h1>
    <h1>年龄：{{ state.age }}</h1>
    <h1>性别：{{ state.sex }}</h1>
    <el-pagination 
    layout="prev, pager, next" 
    :total="1000"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { usePagination } from '/@/hooks/usePagination';
export default {
  setup() {
    const state = reactive({
      name: "小明",
      age: 20,
      sex: 1,
    });

    const list = ref([
      {
        id: 1,
        name: '小明'
      },
      {
        id: 1,
        name: '小红'
      },
      {
        id: 1,
        name: '小刚'
      },
      {
        id: 1,
        name: '小明'
      },
      {
        id: 1,
        name: '小明'
      },
      {
        id: 1,
        name: '小明'
      },
      {
        id: 1,
        name: '小明'
      }
    ]);

    const { setCurrentPage, getTotal, setPageSize, getPaginationList } = usePagination(list, 2);

    console.log(getPaginationList.value)

    list.value[0].id = 2;

    console.log(getPaginationList.value)

    return {
      state
    };
  },
};
</script>

<style lang="scss" scoped>
</style>