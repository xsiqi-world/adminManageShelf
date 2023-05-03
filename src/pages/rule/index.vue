<template>
  <div class="operation">
    <el-button type="primary" @click="addAuth(1)" v-auth="'rule:add'">添加菜单</el-button>
  </div>
  <div class="rule-container">
    <Menu
      class="menu-box"
      active-text-color="#409eff"
      background-color="#d9e1e8"
      text-color="#000"
      :isCollapse="false"
      :list="menuList"
      :isJump="false"
      :default-active="'0'"
      @active="activeHandler"
    ></Menu>

    <div class="rule-box">
      <div>
        <span>菜单管理</span>
        <!-- <el-button link type="primary" size="small" @click="addAuth(1)">添加</el-button> -->
      </div>
      <el-table class="table-box menu-table" :data="menuData" stripe style="width: 100%">
        <el-table-column prop="title" label="菜单名" width="150" />
        <el-table-column prop="url" label="跳转链接" width="600" />
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button
              text
              type="primary"
              size="small"
              @click="editMenu(scope.row)"
              v-auth="'rule:edit'"
            >
              编辑
            </el-button>
            <el-button
              text
              type="primary"
              size="small"
              @click="delAuth(scope.row)"
              v-auth="'rule:del'"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div>
        <span>权限管理</span>
        <el-button text type="primary" @click="addAuth(2)" v-auth="'rule:add'">添加</el-button>
      </div>
      <el-table class="table-box auth-table" :data="authData" stripe style="width: 100%">
        <el-table-column prop="title" label="权限名" width="150" />
        <el-table-column prop="name" label="权限标识" width="600" />
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="scope">
            <el-button
              text
              type="primary"
              size="small"
              @click="editAuth(scope.row)"
              v-auth="'rule:edit'"
            >
              编辑
            </el-button>
            <el-button
              text
              type="primary"
              size="small"
              @click="delAuth(scope.row)"
              v-auth="'rule:del'"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="dialogVisible" title="Tips" width="30%" :before-close="handleClose">
      <el-form ref="ruleFormRef" :model="formData" labelWidth="100px">
        <el-form-item :label="titleObj[dialogType].titleLabel" labelWidth="">
          <el-input v-model="formData.title" />
        </el-form-item>
        <el-form-item v-if="dialogType == 1" label="链接url" labelWidth="">
          <el-input v-model="formData.url" />
        </el-form-item>
        <el-form-item v-if="dialogType == 2" label="标识" labelWidth="">
          <el-input v-model="formData.name" />
        </el-form-item>
        <el-form-item label="所属菜单分类" v-if="dialogType == 1">
          <el-cascader
            v-model="menuGroup"
            :options="menuList"
            :props="cascaderProps"
            @change="cascaderChange"
            clearable
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="submitAuth">提交</el-button>
        </span>
      </template>
    </el-dialog>

    <div class="tree-box">
      <!-- <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M384 192v640l384-320.064z"></path></svg> -->
      <!-- <div class="tree-node">
        <div class="tree-content" @click="openHandler(1)">
          <el-icon><CaretRight /></el-icon>
          <span>test-level</span>
        </div>
        <div class="tree-children">
          <div class="tree-node">
            <div class="tree-content">
              <el-icon><CaretRight /></el-icon>
              <span>test-level</span>
            </div>
            <div class="tree-children"></div>
          </div>
          
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, reactive, ref, unref } from 'vue';
import { getSession } from '/@/utils';
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus';
import { menuParse } from '/@/utils/menu';

export default {
  setup() {
    const { proxy }: any = getCurrentInstance();
    const menuList: any[] = reactive([]);
    const activeId = ref<string>(); // 选中菜单
    const menuData: any[] = reactive([]); // 菜单列表
    const authData: any[] = reactive([]); // 权限列表
    const formData: any = reactive({});
    const ruleFormRef = ref<FormInstance>();
    const rules = reactive<FormRules>({
      title: [{ required: true, message: '请输入', trigger: 'blur' }],
    });
    const menuGroup = reactive([]);

    const cascaderProps = {
      checkStrictly: true,
      label: 'title',
      value: 'id',
    };

    const titleObj = {
      1: {
        titleLabel: '菜单名',
      },
      2: {
        titleLabel: '权限名',
      },
    };
    const dialogType = ref(1); // 弹窗类型: 1:菜单, 2:权限
    const isEdit = ref(false);

    const dialogVisible = ref(false);

    const init = () => {
      getRuleList();
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
    };

    // 获取菜单下的权限
    const getTableList = async id => {
      const res = await proxy.$http.ruleAuthFindById({
        id: id,
      });
      if (res.code == 200) {
        menuData.length = 0;
        authData.length = 0;
        menuData.push(...res.data.menuList);
        authData.push(...res.data.authList);
      }
    };

    // 菜单选中
    const activeHandler = (id: string) => {
      activeId.value = id;
      getTableList(id);
    };

    // 编辑菜单
    const editMenu = (rows: any): void => {
      isEdit.value = true;
      dialogType.value = 1;
      dialogVisible.value = true;
      Object.assign(formData, rows);
    };

    // 编辑权限
    const editAuth = (rows: any): void => {
      isEdit.value = true;
      dialogType.value = 2;
      dialogVisible.value = true;
      Object.assign(formData, rows);
    };

    // 添加权限
    const addAuth = (type: number) => {
      isEdit.value = false;
      dialogType.value = type;
      dialogVisible.value = true;
      for (const key in formData) {
        formData[key] = null;
      }
      formData.pid = 0;
      // 添加权限时
      if (type == 2 && unref(activeId)) {
        formData.pid = unref(activeId);
      }
      formData.is_menu = type == 1 ? 1 : 0;
    };

    // 请求提交
    const submitAuth = async () => {
      let res;
      if (formData.is_menu == 1 && !formData.url) {
        return ElMessage({
          message: 'url is required',
          type: 'error',
        });
      }
      if (formData.is_menu != 1 && !formData.name) {
        return ElMessage({
          message: 'name is required',
          type: 'error',
        });
      }

      if (!formData.pid && formData.pid != 0) {
        return ElMessage({
          message: '请选择所属菜单分类！',
          type: 'error',
        });
      }

      if (!unref(isEdit)) {
        res = await proxy.$http.addRule(formData);
      } else {
        res = await proxy.$http.updateRule(formData);
      }

      if (res.code == 200) {
        ruleFormRef.value?.resetFields();
        ElMessage({
          message: '操作成功！',
          type: 'success',
        });
        dialogVisible.value = false;
        getRuleList();
        unref(activeId) && getTableList(unref(activeId));
      }
    };

    const handleClose = (): void => {
      dialogVisible.value = false;
    };

    const cascaderChange = (val: any) => {
      console.log(val);
      formData.pid = val ? val[val.length - 1] : 0;
    };

    // 删除权限菜单
    const delAuth = async rows => {
      const id = rows.id;
      ElMessageBox.confirm('确定是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(async () => {
          const res = await proxy.$http.deleteRule({ id });

          if (res.code == 200) {
            ElMessage({
              message: '操作成功！',
              type: 'success',
            });
            unref(activeId) && getTableList(unref(activeId));
          }
        })
        .catch(() => {});
    };

    init();

    return {
      menuList,
      activeHandler,
      menuData,
      authData,
      editMenu,
      editAuth,
      dialogVisible,
      handleClose,
      formData,
      dialogType,
      titleObj,
      ruleFormRef,
      rules,
      submitAuth,
      addAuth,
      cascaderProps,
      isEdit,
      activeId,
      menuGroup,
      cascaderChange,
      delAuth,
    };
  },
};
</script>

<style lang="scss" scoped>
.operation {
  margin-bottom: 10px;
}
.rule-container {
  display: flex;
  .menu-box {
    border-radius: 10px;
    overflow: hidden;
  }
  .table-box {
    border-radius: 10px;
    margin-top: 5px;
  }
  .rule-box {
    margin-left: 20px;
    :deep(.el-table) {
      .el-table__header {
        tr th {
          background-color: #d4dfe6;
        }
      }
    }
    .menu-table {
      margin-bottom: 20px;
    }
  }
  .tree-box {
  }

  .tree-node {
    .tree-content {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
