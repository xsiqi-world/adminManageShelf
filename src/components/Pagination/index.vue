<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <div class="pc-total">共 {{ total }} 条</div>
    <el-pagination
      :background="background"
      v-model:currentPage="currentPage"
      v-model:page-size="pageSize"
      v-model:page-sizes="pageSizes"
      :layout="layout"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scrollTo';

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default() {
        return [20, 30, 50];
      },
    },
    layout: {
      type: String,
      default: 'sizes, prev, pager, next, jumper',
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit('update:page', val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit('update:limit', val);
      },
    },
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize });
      if (this.autoScroll) {
        scrollTo(0, 800);
      }
    },
  },
  setup () {

  }
};
</script>

<style lang="scss" scoped>
.pagination-container {
  padding: 10px 16px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  bottom: 10px;
  right: 40px;
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
