<script lang="ts">
import { h, defineComponent, toRefs, ref } from 'vue';
import type { PropType } from 'vue';
import { ElFormItem, ElCheckboxGroup, ElCheckbox } from 'element-plus';

export default defineComponent({
  name: 'checkboxComp',
  props: {
    itemConfig: {
      type: Object as PropType<object>,
    },
    itemValue: {
      type: Array,
    },
  },
  setup(props, { attrs, emit }) {
    const { itemConfig }: { itemConfig: any } = props;
    const { itemValue } = toRefs(props);
    const compValue = ref();

    return () =>
      h(
        ElFormItem,
        {
          label: itemConfig.title,
          labelWidth: itemConfig.labelWidth || 'auto',
        },
        () => [
          h(
            ElCheckboxGroup,
            {
              ...attrs,
              modelValue: compValue.value,
              'onUpdate:modelValue': value => {
                // console.log(value);
                compValue.value = value;
                emit('update:itemValue', value);
              },
            },
            () => [
              itemConfig.options.map(item => {
                return h(ElCheckbox, {
                  label: item.label
                });
              }),
            ]
          ),
        ]
      );
  },
});
</script>

<style lang="scss" scoped></style>
