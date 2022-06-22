<template>
  <div>
    <FormMarking></FormMarking>
    <el-button @click="loading">loading</el-button>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted } from 'vue';
import { FormMarking } from '/@/components/FormMarking/index';
export default {
  components: {
    FormMarking,
  },
  setup() {
    // 获取全局数据
    const { proxy }: any = getCurrentInstance();
    onMounted(() => {});

    const loading = () => {
      // const destroy = proxy.$loading();
      const { destroy } = proxy.$renderLoading();

      setTimeout(() => {
        destroy();
      }, 5000);
    };

    return {
      loading,
    };
  },
};
</script>

<style lang="scss" scoped></style>
