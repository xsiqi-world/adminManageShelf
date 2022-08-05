<script lang="ts">
import { h, defineComponent } from 'vue';
import { ElForm } from "element-plus";

export default defineComponent({
  name: 'formComp',
  props: {},
  setup(props, { slots, attrs }) {

    return () =>
      h(
        ElForm,
        {...props, ...attrs},
        slots
      );
  },
});
</script>

<style lang="scss" scoped></style>
