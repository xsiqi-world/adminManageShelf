<script lang="ts">
import { h, defineComponent, toRefs, watch, ref } from 'vue';
import type { PropType } from 'vue';
import { ElFormItem, ElSelect, ElOption } from 'element-plus';

export default defineComponent({
  name: 'selectComp',
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

    return () =>
      // h(
      //   ElFormItem,
      //   {
      //     label: itemConfig.title,
      //     labelWidth: itemConfig.labelWidth || '',
      //   },
      //   () => [
      //     h(
      //       ElSelect,
      //       {
      //         ...attrs,
      //         modelValue: itemValue.value,
      //         'onUpdate:modelValue': value => {
      //           // console.log(value);
      //           emit('update:itemValue', value);
      //         },
      //       },
      //       () => [
      //         itemConfig.options.map(item => {
      //           return h(ElOption, {
      //             label: item.label,
      //             value: item.value,
      //           });
      //         }),
      //       ]
      //     ),
      //   ]
      // );

      [
        h(
          ElSelect,
          {
            ...attrs,
            style: ['width', 'height'].map(item => `${item}:${itemConfig[item]}px`).join(';'),
            modelValue: itemValue.value,
            'onUpdate:modelValue': value => {
              // console.log(value);
              compValue.value = value;
              emit('update:itemValue', value);
            },
          },
          () => [
            itemConfig.options.map(item => {
              return h(ElOption, {
                label: item.label,
                value: item.value,
              });
            }),
          ]
        )
      ];
  },
});
</script>

<style lang="scss" scoped></style>
