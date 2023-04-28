<template>
  <div>
    <h1>role</h1>
    <Increasing v-model:num="num"></Increasing>
  </div>
</template>

<script>
import { ref, provide } from "vue";
import Increasing from '../../components/Increasing.vue';
export default {
  name: 'role',
  components: { Increasing },
  setup() {
    const num = ref(10);
    provide('level', 123);
    return {
      num
    }
  },
};
</script>

<style lang="scss" scoped></style>
