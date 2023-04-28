<template>
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
      <div>菜单管理</div>
      <el-table class="table-box menu-table" :data="menuData" stripe style="width: 100%">
        <el-table-column prop="title" label="菜单名" width="150" />
        <el-table-column prop="url" label="跳转链接" width="600" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default>
            <!-- <el-button link type="primary" size="small" @click="handleClick"
              >Detail</el-button
            > -->
            <el-button link type="primary" size="small" @click="editMenu">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div>权限管理</div>
      <el-table class="table-box auth-table" :data="authData" stripe style="width: 100%">
        <el-table-column prop="title" label="权限名" width="150" />
        <el-table-column prop="name" label="权限标识" width="600" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default>
            <!-- <el-button link type="primary" size="small" @click="handleClick"
              >Detail</el-button
            > -->
            <el-button link type="primary" size="small" @click="editAuth">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
      :before-close="handleClose"
    >
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
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

export default {
  setup() {
    const { proxy }: any = getCurrentInstance();
    const menuList = reactive([]);
    const menuData: any[] = reactive([]); // 菜单列表
    const authData: any[] = reactive([]); // 权限列表

    const dialogVisible = ref(false);

    menuList.push(...(getSession('menuTree') as never[]));
    console.log('menuList', menuList);

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
      getTableList(id);
    };

    const editMenu = (): void => {
      dialogVisible.value = true;
    }

    const editAuth = (): void => {
      dialogVisible.value = true;
    }

    const handleClose = (): void => {

    }

    return {
      menuList,
      activeHandler,
      menuData,
      authData,
      editMenu,
      editAuth,
      dialogVisible,
      handleClose
    };
  },
};
</script>

<style lang="scss" scoped>
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
          background-color: #D4DFE6;
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
