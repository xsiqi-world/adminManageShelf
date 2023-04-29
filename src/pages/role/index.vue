<template>
  <div class="role-container">
    <!-- <Increasing v-model:num="num"></Increasing> -->

    <div class="content">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table class="table-box" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="title" label="角色名" />
        <el-table-column prop="name" label="备注" />
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="editAuth(scope.row)">
              权限分配
            </el-button>
            <el-button link type="primary" size="small" @click="editInfo(scope.row)">
              编辑信息
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <Pagination
        v-if="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="getTableData"
        :total="total"
        :pageSizes="[1, 10, 20, 30]"
      ></Pagination>
    </div>

    <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
      <el-form ref="ruleFormRef" :model="formData" labelWidth="100px">
        <el-form-item label="角色名" labelWidth="">
          <el-input v-model="formData.title" />
        </el-form-item>
        <el-form-item label="描述" labelWidth="">
          <el-input v-model="formData.remark" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="submitRole">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ref, provide, reactive, getCurrentInstance } from 'vue';
import Increasing from '../../components/Increasing.vue';
import { Pagination } from '/@/components/Pagination/index';
import { FormInstance, FormRules, ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

export default {
  name: 'role',
  components: { Increasing, Pagination },
  setup() {
    const { proxy, ctx }: any = getCurrentInstance();
    const num = ref(10);
    provide('level', 123);
    const tableData: any[] = reactive([]);
    const total = ref(0);
    const dialogVisible = ref(false);
    const queryParams = reactive({
      pageNum: 1,
      pageSize: 20,
    });
    const formData: any = reactive({});
    const ruleFormRef = ref<FormInstance>();
    const rules = reactive<FormRules>({
      title: { required: true, message: '请输入', trigger: 'blur' },
      url: { required: true, message: '请输入', trigger: 'blur' },
    });

    const router = useRouter();

    const init = () => {
      getTableData();
    };

    // 获取列表数据
    const getTableData = async () => {
      const res = await proxy.$http.getGroupList(queryParams);
      if (res.code == 200) {
        tableData.length = 0;
        tableData.push(...(res.data.datas || []));
        total.value = res.data.total;
        ctx.$forceUpdate();
      }
    };

    const editAuth = () => {
      dialogVisible.value = true;
      // router.push({
      //   path: '/authAllot'
      // });
    };

    const editInfo = () => {
      dialogVisible.value = true;
    };

    const handleClose = () => {
      dialogVisible.value = false;
    };

    const submitRole = async () => {
      const res = await proxy.$http.updateRule(formData);
      
      if (res.code == 200) {
        ruleFormRef.value?.resetFields();
        ElMessage({
          message: '操作成功！',
          type: 'success',
        });
        dialogVisible.value = false;
        getTableData();
      }
    }

    init();

    return {
      num,
      tableData,
      total,
      dialogVisible,
      handleClose,
      editAuth,
      editInfo,
      formData,
      queryParams,
      getTableData,
      ruleFormRef,
      rules,
      submitRole
    };
  },
};
</script>

<style lang="scss" scoped>
.role-container {
  .content {
    background-color: #fff;
    .breadcrumb {
      padding: 10px;
    }
  }
}
</style>
