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

      <div class="operation">
        <el-button type="primary" @click="addRole" v-auth="'role:add'">添加角色</el-button>
      </div>

      <el-table class="table-box" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="title" label="角色名" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="editAuth(scope.row)"
              v-auth="'role:rule:edit'"
            >
              权限分配
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="editInfo(scope.row)"
              v-auth="'role:edit'"
            >
              编辑信息
            </el-button>
            <el-button
              link
              type="primary"
              size="small"
              @click="delInfo(scope.row)"
              v-auth="'role:del'"
            >
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

    <el-dialog v-model="dialogVisible" title="权限编辑" width="30%" :before-close="handleClose">
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
          <el-button type="primary" @click="submitRole(1)">提交</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="authVisible" title="权限编辑" width="30%">
      <!-- <div class="custom-tree-node-container">
        <el-tree
          v-if="authVisible"
          :data="menuList"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          :props="treeProps"
          :default-checked-keys="defaultCheckedKeys"
          ref="treeRef"
        />
      </div> -->

      <Auth v-if="authVisible" :menuList="menuList" v-model:checkedKeys="checkedKeys"></Auth>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="authVisible = false">关闭</el-button>
          <el-button type="primary" @click="submitRole(2)">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ref, provide, reactive, getCurrentInstance, unref } from 'vue';
import Increasing from '../../components/Increasing.vue';
import { Pagination } from '/@/components/Pagination/index';
import { FormInstance, FormRules, ElMessage, ElMessageBox } from 'element-plus';
import type Node from 'element-plus/es/components/tree/src/model/node';
import { menuParse } from '/@/utils/menu';
import Auth from './auth.vue';
import { useTableList } from '/@/hooks/useTable';
import { useRouter } from 'vue-router';

export default {
  name: 'role',
  components: { Increasing, Pagination, Auth },
  setup() {
    const { proxy, ctx }: any = getCurrentInstance();
    const num = ref(10);
    provide('level', 123);
    const tableData: any[] = reactive([]);
    const total = ref(0);
    const authVisible = ref(false);
    const queryParams = reactive({
      pageNum: 1,
      pageSize: 20,
    });
    const dialogVisible = ref(false);
    const formData: any = reactive({});
    const ruleFormRef = ref<FormInstance>();
    const rules = reactive<FormRules>({
      title: [{ required: true, message: '请输入', trigger: 'blur' }],
    });
    const defaultCheckedKeys: any[] = reactive([]);
    // const treeRef = ref();
    const checkedKeys: any[] = reactive([]) as any[];

    const router = useRouter();

    interface Tree {
      id: number;
      label: string;
      isPenultimate?: boolean;
      children?: Tree[];
    }

    const customNodeClass = (data: Tree, node: Node) => {
      if (data.isPenultimate) {
        return 'is-penultimate';
      }
      return null;
    };

    const menuList: any[] = reactive([]);
    const treeProps = {
      class: customNodeClass,
      label: 'title',
      value: 'id',
    };

    const init = () => {
      getTableData(); // 角色列表
      getRuleList(); // 菜单列表
    };

    // NOTE:菜单列表
    const getRuleList = async () => {
      const res = await proxy.$http.getRuleList({
        pageNum: 1,
        pageSize: 999,
      });
      if (res.code == 200) {
        menuList.length = 0;
        menuList.push(...menuParse(res.data.datas, true));
      }
    };

    // NOTE:获取角色列表数据
    const getTableData = async () => {
      useTableList(proxy.$http.getGroupList, queryParams, res => {
        tableData.length = 0;
        tableData.push(...res.tableData);
        total.value = unref(res.total);
      });
    };

    // NOTE:获取角色的权限
    const getGroupRuleList = async (id: number) => {
      const res = await proxy.$http.getGroupRuleList({ id });
      if (res.code == 200) {
        defaultCheckedKeys.length = 0;
        res.data.datas.forEach(item => {
          // if (item.pid != 0) {
          defaultCheckedKeys.push(item.id);
          // }
        });
      }
    };

    const editAuth = async (rows: any) => {
      // defaultCheckedKeys.length = 0;
      // defaultCheckedKeys.push(...rows.rules.split(","));
      // await getGroupRuleList(rows.id);

      checkedKeys.length = 0;
      checkedKeys.push(...rows.rules.split(','));

      Object.assign(formData, rows);
      authVisible.value = true;
    };

    // 编辑角色
    const editInfo = rows => {
      Object.assign(formData, rows);
      dialogVisible.value = true;
    };

    const handleClose = () => {
      dialogVisible.value = false;
    };

    const submitRole = async (type: number) => {
      // if (type != 1) {
      //   const rules = treeRef.value.getCheckedNodes(false, true);
      //   formData.rules = rules.map(item => item.id).join(',');
      // }

      if (type != 1) {
        formData.rules = checkedKeys.join(',');
      }

      const res = await proxy.$http.updateGroup(formData);

      if (res.code == 200) {
        ruleFormRef.value?.resetFields();
        ElMessage({
          message: '操作成功！',
          type: 'success',
        });
        authVisible.value = false;
        dialogVisible.value = false;
        getTableData();
      }
    };

    // 添加角色
    const addRole = () => {
      router.push({
        path: '/system/role/add',
      });
    };

    // 删除权限菜单
    const delInfo = async rows => {
      const id = rows.id;
      ElMessageBox.confirm('确定是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const res = await proxy.$http.deleteGroup({ id });

          if (res.code == 200) {
            ElMessage({
              message: '操作成功！',
              type: 'success',
            });
            getTableData();
          }
        })
        .catch(() => {});
    };

    // provide('checkedKeys', checkedKeys);

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
      submitRole,
      authVisible,
      // treeProps,
      menuList,
      // defaultCheckedKeys,
      // treeRef,
      checkedKeys,
      addRole,
      delInfo,
    };
  },
};
</script>

<style lang="scss" scoped>
.role-container {
  .content {
    background-color: #fff;
    .operation {
      margin: 10px 0;
    }

    .checkbox {
      margin: 10px;
    }
  }
}
</style>

<style>
.is-penultimate > .el-tree-node__content {
  color: #626aef;
}

.el-tree-node.is-expanded.is-penultimate > .el-tree-node__children {
  display: flex;
  flex-direction: row;
}
.is-penultimate > .el-tree-node__children > div {
  width: 25%;
}
</style>
