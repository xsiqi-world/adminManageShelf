<script lang="ts">
import { h, defineComponent, toRefs, ref } from 'vue';
import type { PropType } from 'vue';
import { ElFormItem, ElDatePicker } from 'element-plus';

export default defineComponent({
  name: 'datePicker',
  props: {
    itemConfig: {
      type: Object as PropType<object>,
    },
    itemValue: {
      type: [Date, Array],
    },
  },
  setup(props, { attrs, emit }) {
    const { itemConfig }: { itemConfig: any } = props;
    const { itemValue } = toRefs(props);
    const compValue = ref();

    return () =>
      // h(
      //   ElFormItem,
      //   {
      //     label: itemConfig.title,
      //     labelWidth: itemConfig.labelWidth || '',
      //   },
      //   () => [
      //     h(ElDatePicker, {
      //       ...attrs,
      //       type: itemConfig.type,
      //       modelValue: compValue.value,
      //       'onUpdate:modelValue': value => {
      //         // console.log(value);
      //         compValue.value = value;
      //         emit('update:itemValue', value);
      //       },
      //     }),
      //   ]
      // );


      [
        h(ElDatePicker, {
          ...attrs,
          type: itemConfig.type,
          style: ['width', 'height'].map(item => `${item}:${itemConfig[item]}px`).join(';'),
          modelValue: compValue.value,
          'onUpdate:modelValue': value => {
            // console.log(value);
            compValue.value = value;
            emit('update:itemValue', value);
          },
        })
      ];
  },
});
</script>

<style lang="scss" scoped></style>
