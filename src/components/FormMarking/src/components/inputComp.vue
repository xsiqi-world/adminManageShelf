<script lang="ts">
import { h, defineComponent, resolveComponent, toRefs, ref } from 'vue';
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
  setup(props, { attrs, emit }) {
    const { itemConfig }: { itemConfig: any } = props;
    const { itemValue } = toRefs(props);
    const compValue = ref();
    // const ElFormItem = resolveComponent('ElFormItem');
    // const ElInput = resolveComponent('ElInput');

    return () =>
      // h(
      //   ElFormItem,
      //   {
      //     label: itemConfig.title,
      //     labelWidth: itemConfig.labelWidth || '',
      //   },
      //   () => [
      //     h(ElInput, {
      //       ...attrs,
      //       type: itemConfig.type,
      //       style: ['width', 'height'].map(item => `${item}:${itemConfig[item]}px`).join(';'),
      //       modelValue: itemValue.value,
      //       'onUpdate:modelValue': value => {
      //         // console.log(value);
      //         emit('update:itemValue', value);
      //       },
      //       onFocus: () => {
      //         console.log('onFocus');
      //       },
      //     }),
      //   ]
      // );

      [
        h(ElInput, {
          ...attrs,
          type: itemConfig.type,
          style: ['width', 'height'].map(item => `${item}:${itemConfig[item]}px`).join(';'),
          modelValue: itemValue.value,
          'onUpdate:modelValue': value => {
            // console.log(value);
            compValue.value = value;
            emit('update:itemValue', value);
          },
          onFocus: () => {
            console.log('onFocus');
          },
        })
      ];
  },
});
</script>

<style lang="scss" scoped></style>
