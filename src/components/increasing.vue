<template>
  <div @click="increasing">
    计数器：{{ num }}

    Pagination
    <Pagination
      v-model:page="page"
      v-model:limit="limit"
      @pagination="pagination"
      :total="100"
      :pageSizes="[10, 20, 30]"
    ></Pagination>

    <button @click="checkLimit">切换limit</button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, inject, PropType, toRefs } from 'vue';
import { Pagination } from './index';
export default defineComponent({
  components: {
    Pagination,
  },
  props: {
    num: {
      type: Number as PropType<number>,
    },
  },
  // setup(props, context): () => JSX.Element {
  setup(props, context) {
    const { num } = toRefs(props);
    console.log('props', num);

    let level = inject('level');
    console.log('increasing', level);

    // const slots = useSlots();

    function increasing(): void {
      context.emit('update:num', (props.num as number) + 1);
    }

    function pagination(obj) {
      console.log(obj);
    }

    const page = ref(1);
    const limit = ref(10);

    // 跨域测试接口请求
    const getList = async () => {
      const response = await fetch("/api/todolist", {
        method: 'get'
      });
      const posts = await response.json();
      console.log('list', posts)
    }
    getList();

    const checkLimit = () => {
      limit.value = 20;
    }

    return {
      page,
      limit,
      increasing,
      pagination,
      num,
      checkLimit
    }

    // return () => (
    //   <div onClick={increasing}>
    //     计数器：{props.num}
    //     <Pagination
    //       page={page}
    //       limit={limit}
    //       onPagination={pagination}
    //       total={100}
    //       pageSizes={[10, 20, 30]}
    //     ></Pagination>
    //   </div>
    // );
  },
});
</script>

<style lang="scss" scoped></style>
