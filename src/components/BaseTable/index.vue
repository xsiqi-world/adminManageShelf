<!--
 * @FileDescription: table组件
 * @Author: xinsq
 * @Date: 2021-05-27
 * @LastEditors: xinsq
 * @LastEditTime: 2021-05-27
-->

<template>
  <div id="list">
    <el-table :data="tableData" v-bind="$attrs" style="width: 100%">
      <el-table-column
        v-for="(field, key) in tableFields"
        :key="key"
        :fixed="field.fixed"
        :prop="field.prop"
        :label="field.label"
        :width="field.width"
        :sortable="field.sortable || false"
        :align="field.align"
      >
        <template slot-scope="scope">
          <div
            v-if="field.slot"
            class="table-slot"
            @click.stop="field.operFun && field.operFun($event, scope.$index, scope.row)"
            v-html="field.slot(scope.$index, scope.row)"
          ></div>
          <div v-else @click.stop="field.operFun && field.operFun($event, scope.$index, scope.row)">
            {{ scope.row[field.prop] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="operations.length != 0" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            v-for="item in operations"
            :key="item.label"
            :type="item.type"
            :size="item.size"
            @click.prevent="item.operFun(scope.$index, tableData[scope.$index])"
          >
            {{ item.label }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-if="tableData.length > 0 && paginationShow"
      :style="{ width: width }"
      :total="total"
      v-model:page="currentPage"
      v-model:limit="pageSizes"
      :auto-scroll="false"
      class="pag"
      @pagination="getList"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';

export default {
  name: 'CustomerTable',
  components: {
    Pagination,
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    tableFields: {
      type: Array,
      default: () => [],
    },
    operations: {
      type: Array,
      default: () => [],
    },

    paginationShow: {
      type: Boolean,
      default: true,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageNum: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      width: 0,
    };
  },
  computed: {
    currentPage: {
      get() {
        return this.pageNum;
      },
      set(val) {
        this.$emit('update:pageNum', val);
      },
    },
    pageSizes: {
      get() {
        return this.pageSize;
      },
      set(val) {
        this.$emit('update:pageSize', val);
      },
    },
  },
  mounted() {
    const that = this;
    this.$erd.listenTo(document.getElementById('list'), function (element) {
      that.$nextTick(function () {
        this.width = element.offsetWidth + 'px';
      });
    });
  },
  methods: {
    // 页码变化触发获取数据
    getList(obj) {
      this.$emit('getList', obj);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-slot {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}
// .pag{
//   background: rgba(75,75,75,.85);
//   color: #fff;
// }

/deep/ .el-table {
  td {
    border-bottom: 0;
  }

  tr {
    th {
      border-bottom: 1px solid #eeeeee;
      border-top: 1px solid #eeeeee;
    }
  }
  tr:last-child {
    td {
      border-bottom: 1px solid #eeeeee;
    }
  }
}

/deep/ .el-table__row {
  &.hover-row {
    td {
      background-color: #fffaf8 !important;
    }
  }
  &:hover {
    td {
      background-color: #fffaf8 !important;
    }
  }
}
</style>

<style lang="scss">
.el-table thead th,
.el-table thead tr {
  background-color: #f5f5f5 !important;
}
</style>
