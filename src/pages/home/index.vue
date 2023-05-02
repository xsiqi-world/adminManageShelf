<template>
  <div>
    这是首页
    <!-- <HelloWorld></HelloWorld> -->
  </div>
</template>

<script>
import { getCurrentInstance, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import HelloWorld from '/@/components/HelloWorld.vue';
export default {
  name: 'default',
  components: {
    HelloWorld,
  },
  setup() {
    const pageParams = reactive({
      pageNum: 1,
      pageSize: 20,
    });
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance();
  },
};
</script>

<style lang="scss" scoped></style>
