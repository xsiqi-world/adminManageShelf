<template>
  <div></div>
</template>

<script lang="ts">
import { h, defineComponent, ref, resolveComponent } from 'vue';
export default defineComponent({
  name: 'inputComp',
  setup(props, { slots, attrs, emit }) {
    const testValue = ref();
    const ElFormItem = resolveComponent('ElFormItem');
    const ElInput = resolveComponent('ElInput');

    return () =>
      h(
        ElFormItem,
        {
          label: '活动名称',
        },
        [
          h(ElInput, {
            style: "margin-left: 50px",
            modelValue: testValue.value,
            'onUpdate:modelValue': value => {
              console.log(value)
              testValue.value = value;
              // this.$emit('update:modelValue', value)
            },
            onFocus: () => {
              console.log('onFocus');
            },
          }), // input组件
        ]
      );

  },
});
</script>

<style lang="scss" scoped></style>
