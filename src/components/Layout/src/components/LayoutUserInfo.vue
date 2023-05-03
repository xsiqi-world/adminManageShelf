<template>
  <div class="user-info">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        个人信息
        <el-icon class="el-icon--right"><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { clearSession } from '/@/utils';

export default defineComponent({
  name: 'LayoutUserInfo',
  setup() {
    const router = useRouter();
    const logout = () => {
      clearSession();
      ElMessage({
        message: '退出登录！',
        type: 'success',
      });
      setTimeout(() => {
        router.push({
          path: '/login',
        });
      }, 1000);
    };

    return {
      logout,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-info {
  margin-right: 30px;
}
</style>
