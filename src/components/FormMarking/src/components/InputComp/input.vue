<script lang="ts">
import { h, defineComponent, ref, resolveComponent, toRefs } from 'vue';
import type { PropType } from 'vue';

export default defineComponent({
  name: 'inputComp',
  props: {
    itemConfig: {
      type: Object as PropType<object>
    },
    itemValue: {
      type: [String, Number] as PropType<string>
    },
  },
  setup(props, { slots, attrs, emit }) {
    const { itemConfig, itemValue } = toRefs(props);
    const testValue = ref();
    const ElFormItem = resolveComponent('ElFormItem');
    const ElInput = resolveComponent('ElInput');

    console.log('hh',itemConfig.value)

    return () =>
      h(
        ElFormItem,
        {
          label: itemConfig?.value?.title,
        },
        () => [
          h(ElInput, {
            style: "margin-left: 50px",
            modelValue: testValue.value,
            'onUpdate:modelValue': value => {
              // console.log(value)
              // console.log(itemValue);
              testValue.value = value;
              emit('update:itemValue', value);
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
