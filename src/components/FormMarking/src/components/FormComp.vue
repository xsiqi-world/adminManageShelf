<script lang="ts">
import { h, defineComponent, ref, toRefs } from 'vue';
import type { PropType } from 'vue';
import { ElForm } from "element-plus";

export default defineComponent({
  name: 'formComp',
  props: {},
  setup(props, { slots, attrs, emit }) {

    return () =>
      h(
        ElForm,
        attrs,
        slots
      );
  },
});
</script>

<style lang="scss" scoped></style>
