<template>
  <div class="admin-container">
    <div class="content">
      <div class="breadcrumb">
        <el-breadcrumb>
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="operation">
        <el-button type="primary" @click="addUser" v-auth="'admin:add'">添加用户</el-button>
      </div>
      <el-table class="table-box" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="username" label="账号" />
        <el-table-column prop="realname" label="姓名" />
        <el-table-column prop="mobile" label="手机号" />
        <el-table-column prop="group_id" label="所属角色">
          <template #default="scope">
            {{ getDictName(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button text type="primary" size="small" @click="editInfo(scope.row)" v-auth="'admin:edit'">
              编辑
            </el-button>
            <el-button v-if="scope.row.id != 1" text type="primary" size="small" @click="delInfo(scope.row)" v-auth="'admin:del'">
              删除
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

    <el-dialog v-model="dialogVisible" title="popup" width="30%" :before-close="handleClose">
      <el-form ref="formRef" :model="formData" labelWidth="100px">
        <el-form-item label="账号" labelWidth="">
          <el-input v-model="formData.username" />
        </el-form-item>
        <el-form-item label="手机号" labelWidth="">
          <el-input v-model="formData.mobile" />
        </el-form-item>
        <el-form-item label="姓名" labelWidth="">
          <el-input v-model="formData.realname" />
        </el-form-item>
        <el-form-item label="所属角色" prop="group_id">
          <el-select v-model="formData.group_id" placeholder="请选择角色">
            <el-option
              v-for="item in groupList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus';
import { defineComponent, getCurrentInstance, reactive, ref, unref } from 'vue';
import { useTableList } from '/@/hooks/useTable';
import { Pagination } from '/@/components/Pagination/index';

export default defineComponent({
  components: {
    Pagination,
  },
  setup() {
    class formInstance {
      username: string = '';
      mobile: string = '';
      realname: string = '';
      group_id: string | number = '';
    }

    const { proxy }: any = getCurrentInstance();
    const tableData: any[] = reactive([]);
    const total = ref(0);
    const queryParams = reactive({
      pageNum: 1,
      pageSize: 20,
    });
    const isEdit = ref(false);

    const groupList: any[] = reactive([]);
    const dialogVisible = ref(false);

    const formData: formInstance = reactive(new formInstance());
    const formRef = ref<FormInstance>();
    const rules = reactive<FormRules>({
      username: [{ required: true, message: '请输入', trigger: 'blur' }],
    });

    // 查询账户列表数据
    const getTableData = () => {
      useTableList(proxy.$http.getAdminList, queryParams, res => {
        tableData.length = 0;
        tableData.push(...res.tableData);
        total.value = unref(res.total);
      });
    };

    // 用户列表
    const getGroupList = () => {
      useTableList(
        proxy.$http.getGroupList,
        {
          pageNum: 1,
          pageSize: 999,
        },
        res => {
          groupList.length = 0;
          groupList.push(...res.tableData);
        }
      );
    };

    // 添加用户
    const addUser = () => {
      dialogVisible.value = true;
      isEdit.value = false;
      Object.assign(formData, new formInstance());
    };

    // 弹窗编辑
    const editInfo = rows => {
      dialogVisible.value = true;
      isEdit.value = true;
      Object.assign(formData, rows);
    };

    // 弹窗关闭
    const handleClose = () => {
      dialogVisible.value = false;
    };

    // 提交表单
    const submitForm = async () => {
      let res;
      if (unref(isEdit)) {
        res = await proxy.$http.updateAdmin(formData);
      } else {
        res = await proxy.$http.addAdmin(formData);
      }

      if (res.code == 200) {
        formRef.value?.resetFields();
        ElMessage({
          message: '操作成功！',
          type: 'success',
        });
        dialogVisible.value = false;
        getTableData();
      }
    };

    // NOTE:获取字典
    const getDictName = (row) => {
      let i = groupList.length;
      while (i--) {
        if (groupList[i].id == row.group_id) {
          return groupList[i].title;
        }
      }
      return '';
    }

    // 删除用户
    const delInfo = (rows) => {
      const id = rows.id;
      ElMessageBox.confirm('确定是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await proxy.$http.deleteAdmin({ id });

        if (res.code == 200) {
          ElMessage({
            message: '操作成功！',
            type: 'success',
          });
          getTableData();
        }
      });
    }

    const init = () => {
      getTableData();
      getGroupList();
    };

    init();

    return {
      tableData,
      total,
      queryParams,
      dialogVisible,
      getTableData,
      formData,
      addUser,
      editInfo,
      handleClose,
      submitForm,
      delInfo,
      groupList,
      getDictName
    };
  },
});
</script>

<style scoped lang="scss">
.admin-container {
  .content {
    .operation {
      margin: 10px 0;
    }
  }
}
</style>
