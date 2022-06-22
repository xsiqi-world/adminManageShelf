<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../../assets/images/author.jpg" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-s-custom"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            prefix-icon="el-icon-lock"
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha">
          <div class="captcha_flex">
            <el-input
              v-model="loginForm.captcha"
              prefix-icon="el-icon-lock"
              class="captcha"
            ></el-input>
            <div id="v_container" style="width: 200px;height: 50px;"></div>
          </div>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="doLogin()">登录</el-button>
          <el-button type="info" @click="resetForm(loginFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import '/@/assets/css/common.scss';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import GVerify from '/@/utils/captcha';
import { setSession } from '/@/utils/index';

export default {
  name: 'Login',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const loginForm = reactive({
      username: 'admin',
      password: '123456',
      captcha: ''
    });
    const loginFormRules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
      ],
    };
    type FormInstance = InstanceType<typeof ElForm>;
    const loginFormRef = ref<FormInstance>();
    let verifyCode: any = function () {};

    // 获取验证码
    const getCaptcha = () => {};
    // 重置登录表单
    const resetForm = (formEl) => {
      if (!formEl) return;
      formEl.resetFields();
    }

    // 表单验证登陆
    const doLogin = () => {
      const valid = verifyCode.validate(loginForm.captcha);
      if (valid) {
        setSession('AccessToken', loginForm.username);
        router.push({
          name: 'home',
          path: '/home',
          query: {
            ...route.query,
          },
        })
      } else {
        return ElMessage({
          message: '验证码错误！',
          type: 'error',
        });
      }
    };

    onMounted(() => {
      verifyCode = new GVerify("v_container");
    });

    return {
      doLogin,
      loginForm,
      loginFormRules,
      getCaptcha,
      resetForm,
      loginFormRef
    }
  },
};
</script>

<style lang="scss" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;

  .login_box {
    width: 450px;
    height: 350px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%); //偏移上下,左右各百分之50
  }

  .avatar_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee; //边框
    border-radius: 50%; //圆角
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

  .btns {
    display: flex; //弹性盒模型
    justify-content: flex-end; //右边对齐
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px; //上下内边距0,左右内边距20px
    box-sizing: border-box;
  }
  .captcha_flex {
    display: flex !important;
    align-items: center;
  }

  .captcha_img {
    width: 150px;
    margin-left: 30px;
  }
}

</style>
