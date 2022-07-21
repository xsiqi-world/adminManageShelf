<template>
  <div v-if="!hidden" class="pagination-container">
    <div class="pc-total">共 {{ total }} 条</div>
    <el-pagination
      :background="background"
      v-model:current-page="page"
      v-model:page-size="limit"
      v-model:page-sizes="pageSizes"
      :layout="layout"
      :total="total"
      @current-change="pageChangeHandle"
      @size-change="sizeChangeHandle"
    />
  </div>
</template>

<script lang="ts">
// import { scrollTo } from '@/utils/scrollTo';
import { computed, defineComponent, reactive, toRefs, unref } from 'vue';
import type { PropType, Ref } from 'vue';

export default defineComponent({
  name: 'Pagination',
  props: {
    total: {
      type: Number as PropType<number>,
      required: true,
    },
    page: {
      type: Number as PropType<number>,
      default: 1,
    },
    limit: {
      type: Number as PropType<number>,
      default: 10,
    },
    pageSizes: {
      type: Array as PropType<number[]>,
      default: () => [20, 30, 50],
    },
    layout: {
      type: String as PropType<string>,
      default: 'sizes, prev, pager, next, jumper',
    },
    background: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    autoScroll: {
      type: Boolean as PropType<boolean>,
      default: true,
    },
    hidden: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, ctx) {
    const {
      page,
      limit,
      autoScroll,
    }: { page: Ref<number>; limit: Ref<number>; autoScroll: Ref<boolean> } = toRefs(props);

    const pageChangeHandle = val => {
      ctx.emit('update:page', val);
      ctx.emit('pagination', { page: val, limit: unref(limit) });
      if (autoScroll) {
        // scrollTo(0, 800);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    };

    const sizeChangeHandle = val => {
      ctx.emit('update:limit', val);
      ctx.emit('pagination', { page: unref(page), limit: val });
      if (autoScroll) {
        // scrollTo(0, 800);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    };

    return {
      pageChangeHandle,
      sizeChangeHandle,
      ...props,
    };
  },
});
</script>

<style lang="scss" scoped>
.pagination-container {
  padding: 10px 16px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;

  // position: fixed;
  // bottom: 10px;
  // right: 40px;
  background-color: rgba(255, 255, 255, 1);
  z-index: 999;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.pc-total {
  font-size: 14px;
}
.pagination-container.hidden {
  display: none;
}
</style>
