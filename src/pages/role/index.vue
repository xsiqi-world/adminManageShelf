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
        <el-table-column prop="remark" label="备注" />
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
          <el-button type="primary" @click="submitRole(1)">提交</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="authVisible" title="Tips" width="30%">
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

      <div class="tree-box">
        <!-- <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M384 192v640l384-320.064z"></path></svg> -->
        <div class="tree-node">
          <div class="tree-content" @click="openHandler(1)">
            <!-- <el-icon><CaretRight /></el-icon> -->
            <!-- <span>test-level1</span> -->
            <div class="checkbox">
              <span>test-level1</span>
            </div>
          </div>
          <div class="tree-children">
            <div class="tree-node">
              <div style="padding-left: 18px" class="tree-content">
                <!-- <el-icon><CaretRight /></el-icon> -->
                <!-- <span>test-level1-1</span> -->
                <div class="checkbox">
                  <span>test-level1-1</span>
                </div>
              </div>
              <div class="tree-children"></div>
            </div>
            <div class="tree-node">
              <div style="padding-left: 18px" class="tree-content">
                <div class="checkbox">
                  <span>test-level1-1</span>
                </div>
              </div>
              <div class="tree-children"></div>
            </div>
            
          </div>
        </div>
      </div>

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
import { ref, provide, reactive, getCurrentInstance } from 'vue';
import Increasing from '../../components/Increasing.vue';
import { Pagination } from '/@/components/Pagination/index';
import { FormInstance, FormRules, ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import type Node from 'element-plus/es/components/tree/src/model/node'
import { getSession } from '/@/utils';
import { menuParse } from '/@/utils/menu';

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
    const authVisible = ref(false);
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
    const defaultCheckedKeys: any[] = reactive([]);
    const treeRef = ref();

    interface Tree {
      id: number
      label: string
      isPenultimate?: boolean
      children?: Tree[]
    };

    const customNodeClass = (data: Tree, node: Node) => {
      if (data.isPenultimate) {
        return 'is-penultimate'
      }
      return null
    };

    const router = useRouter();
    // const menuList = getSession('menuTree');
    const menuList: any[] = reactive([]);
    const treeProps = {
      class: customNodeClass,
      label: 'title',
      value: 'id'
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
        menuList.push(...menuParse(res.data.datas));
      }
    }

    // NOTE:获取角色列表数据
    const getTableData = async () => {
      const res = await proxy.$http.getGroupList(queryParams);
      if (res.code == 200) {
        tableData.length = 0;
        tableData.push(...(res.data.datas || []));
        total.value = res.data.total;
        ctx.$forceUpdate();
      }
    };

    // NOTE:获取角色的权限
    const getGroupRuleList = async (id: number) => {
      const res = await proxy.$http.getGroupRuleList({id});
      if (res.code == 200) {
        defaultCheckedKeys.length = 0;
        res.data.datas.forEach(item => {
          if (item.pid != 0) {
            defaultCheckedKeys.push(item.id);
          }
        });
      }
    }

    const editAuth = async (rows: any) => {
      console.log(rows);
      // defaultCheckedKeys.length = 0;
      // defaultCheckedKeys.push(...rows.rules.split(","));
      await getGroupRuleList(rows.id);

      Object.assign(formData, rows);
      authVisible.value = true;
      // router.push({
      //   path: '/authAllot'
      // });
    };

    const editInfo = (rows) => {
      Object.assign(formData, rows);
      dialogVisible.value = true;
    };

    const handleClose = () => {
      dialogVisible.value = false;
    };

    const submitRole = async (type: number) => {
      if (type != 1) {
        const rules = treeRef.value.getCheckedNodes(false, true);
        formData.rules = rules.map(item => item.id).join(',');
      }
      
      const res = await proxy.$http.updateGroup(formData);
      
      if (res.code == 200) {
        ruleFormRef.value?.resetFields();
        ElMessage({
          message: '操作成功！',
          type: 'success',
        });
        authVisible.value = false;
        getTableData();
      }
    };

    const openHandler = () => {

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
      submitRole,
      authVisible,
      treeProps,
      menuList,
      defaultCheckedKeys,
      treeRef,
      openHandler
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

.checkbox {
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  // width: 81px;
  height: 32px;
  line-height: 1;
  padding: 6px 18px;
  // height: 93px;
  // line-height: 93px;
  // margin: 0 auto;
  padding: 6px 18px;
  text-align: center;
  color: #4abe84;
  background-color: #fff;
  box-shadow: 0px 2px 7px 0px rgba(85, 110, 97, 0.35);
  border-radius: 7px;
  border: 1px solid rgba(74, 190, 132, 1);
  cursor: pointer;
}
.checkbox > span {
  display: inline-flex;
  align-items: center;
}
.checkbox:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  border: 10px solid #4abe84;
  border-left-color: transparent;
  border-bottom-color: transparent;
}
.checkbox:after {
  content: "";
  position: absolute;
  width: 3px;
  height: 7px;
  right: 1px;
  top: -2px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-left-color: transparent;
  transform: rotate(45deg);
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
