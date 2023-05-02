<template>
  <div class="role-add-container">
    <el-form ref="formRef" :model="formData" labelWidth="100px">
      <el-form-item label="角色名" labelWidth="">
        <el-input v-model="formData.title" />
      </el-form-item>
      <el-form-item label="描述" labelWidth="">
        <el-input v-model="formData.remark" />
      </el-form-item>
      <el-form-item label="权限" labelWidth="">
        <div class="auth-box">
          <Auth
            :menuList="menuList"
            v-model:checkedKeys="checkedKeys"
          ></Auth>
        </div>
      </el-form-item>

      <el-form-item label="" labelWidth="">
        <el-button type="primary" @click="goPrev">返回</el-button>
        <el-button type="primary" @click="confirmRole">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, provide, reactive, ref, toRefs } from 'vue';
import { menuParse } from '/@/utils/menu';
import Auth from './auth.vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

export default {
  components: {
    Auth,
  },
  setup() {
    const state = reactive({
      count: 0,
    });
    const { proxy }: any = getCurrentInstance();
    const router = useRouter();
    const formData: any = reactive({});
    const menuList: any[] = reactive([]);
    const formRef = ref();
    const checkedKeys = reactive([]); // 选中权限

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

    // 返回上一页
    const goPrev = () => {
      router.go(-1);
    };

    // 提交表单
    const confirmRole = async () => {
      formData.rules = checkedKeys.join(',');

      const res = await proxy.$http.addGroup(formData);

      if (res.code == 200) {
        formRef.value?.resetFields();
        ElMessage({
          message: '操作成功！',
          type: 'success',
        });
        goPrev();
      }
    };

    const init = () => {
      getRuleList();
    };

    init();

    return {
      ...toRefs(state),
      formData,
      menuList,
      formRef,
      checkedKeys,
      goPrev,
      confirmRole,
    };
  },
};
</script>

<style lang="scss" scoped>
.auth-box {
  border: 1px solid #dcdfe6;
  border-radius: 10px;
  padding: 10px;
  width: 100%;
}
</style>
