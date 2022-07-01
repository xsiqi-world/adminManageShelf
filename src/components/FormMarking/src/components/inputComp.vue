<script lang="ts">
import { h, defineComponent, resolveComponent, toRefs } from 'vue';
import type { PropType } from 'vue';
import { ElFormItem, ElInput } from 'element-plus';

export default defineComponent({
  name: 'inputComp',
  props: {
    itemConfig: {
      type: Object as PropType<object>,
    },
    itemValue: {
      type: [String, Number] as PropType<string>,
    },
  },
  setup(props, { slots, attrs, emit }) {
    const { itemConfig } = props;
    const { itemValue } = toRefs(props);
    // const ElFormItem = resolveComponent('ElFormItem');
    // const ElInput = resolveComponent('ElInput');

    return () =>
      h(
        ElFormItem,
        {
          label: itemConfig?.title,
        },
        () => [
          h(ElInput, {
            ...attrs,
            type: itemConfig?.type,
            style: ['width', 'height'].map(item => `${item}:${itemConfig?.[item]}px`).join(';'),
            modelValue: itemValue.value,
            'onUpdate:modelValue': value => {
              // console.log(value)
              emit('update:itemValue', value);
            },
            onFocus: () => {
              console.log('onFocus');
            },
          }),
        ]
      );
  },
});
</script>

<style lang="scss" scoped></style>
