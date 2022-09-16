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

    <div class="config-item">
      <label class="config-label">默认值{{ compType }}</label>
      <div class="config-content">
        <component
          :is="compType"
          v-model:itemConfig="configs"
          v-model:itemValue="formVal[configs.name]"
        ></component>
      </div>
    </div>
    
  </div>
</template>

<script>
import { defineComponent, ref, unref, toRefs, watch, reactive } from 'vue';
import comp from '../index';

export default defineComponent({
  components: {
    ...comp
  },
  props: {
    configs: {
      type: Object
    },
    compType: {
      type: String
    }
  },
  setup(props, { emit }) {
    const { configs, compType } = toRefs(props);
    const formVal = reactive({});

    watch(configs, (configs, prevConfigs) => {
      console.log(configs, compType.value);
      emit('update:configs', configs);
    });

    return {
      configs,
      compType,
      formVal
    };
  },
});
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
