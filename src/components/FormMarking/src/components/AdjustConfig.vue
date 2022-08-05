/**
* Module: 组件修改配置模块
* Description: 
* Author: xsq
* Date: 2022/08/04 14:01:31
* LastEditAuthor: xsq
* LastEditTime: 2022/08/04 14:01:31
*/
<template>
  <div class="config">
    <div class="config-item">
      <label class="config-label">类型</label>
      <div class="config-content">
        <span class="config-tag">{{ configs.label }}</span>
      </div>
    </div>

    <div class="config-item">
      <label class="config-label">标题</label>
      <div class="config-content">
        <el-input v-model="configs.title" placeholder="Please input" />
      </div>
    </div>
    
  </div>
</template>

<script>
import { ref, unref, toRefs, watch } from 'vue';
export default {
  props: {
    configs: {
      type: Object
    }
  },
  setup(props, { emit }) {
    const { configs } = toRefs(props);

    watch(configs, (configs, prevConfigs) => {
      console.log(configs);
      emit('update:configs', configs);
    });

    return {
      configs
    };
  },
};
</script>

<style lang="scss" scoped>
.config {
  margin-left: 5px;
  font-size: 14px;
  width: 300px;
  .config-item {
    margin-bottom: 20px;
    border-bottom: 1px solid #e1e1e1;
    padding-bottom: 10px;
    .config-label {
      line-height: 32px;
    }
    .config-tag {
      line-height: 30px;
      padding: 0 10px;
      font-size: 12px;
      display: inline-block;
      border: 1px solid #a3d3ff;
      color: #1890ff;
      border-radius: 6px;
    }

  }
}
</style>
