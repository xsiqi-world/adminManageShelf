
<script lang="tsx">
import { defineComponent, inject, PropType } from "vue";
export default defineComponent({
  props: {
    num: {
      type: Number as PropType<number>,
    },
  },
  setup(props, context): () => JSX.Element {
    const { num } = props;
    console.log("props", num);

    let level = inject('level');
    console.log('increasing', level)

    // const slots = useSlots();

    function increasing(): void {
      context.emit("update:num", props.num as number + 1);
    }

    return () => <div onClick={increasing}>
      计数器：{props.num}
    </div>
  }
});
</script>

<style lang="scss" scoped>
div {
  height: 200px;
}
</style>