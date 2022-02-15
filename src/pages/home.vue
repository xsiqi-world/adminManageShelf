<template>
  <div>
    <h1>这是首页{{count}}</h1>
    <h1>姓名：{{state.name}}</h1>
    <h1>年龄：{{state.age}}</h1>
    <h1>性别：{{state.sex}}</h1>

    {{x}},{{y}}
    <button @click="add">增加</button>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useMouse } from '../utils/mouse'

let count = ref(1);
let state = reactive({
  name: 'jack',
  age: 18,
  sex: 1
})
function add () {
  count.value++;
  state.age++
}

let {x, y} = useMouse();
</script>

<style lang="scss" scoped>

</style>