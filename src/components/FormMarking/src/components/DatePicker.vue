<script lang="ts">
import { h, defineComponent, toRefs } from 'vue';
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

    return () =>
      h(
        ElFormItem,
        {
          label: itemConfig.title,
          labelWidth: itemConfig.labelWidth || 'auto',
        },
        () => [
          h(ElDatePicker, {
            ...attrs,
            type: itemConfig.type,
            modelValue: itemValue.value,
            'onUpdate:modelValue': value => {
              // console.log(value);
              emit('update:itemValue', value);
            },
          }),
        ]
      );
  },
});
</script>

<style lang="scss" scoped></style>
