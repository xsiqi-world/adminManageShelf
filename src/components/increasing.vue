
<script lang="tsx">
import index from './test';
import { ref, defineEmits, defineProps, defineComponent, inject } from "vue";
export default defineComponent({
  props: {
    num: Number,
  },
  setup(props: {num: any}, context): () => JSX.Element {
    const { num } = props;
    console.log("props", num);

    let level = inject('level');
    console.log('increasing', level)

    function increasing(): void {
      context.emit("update:num", props.num as number + 1);
    }

    return () => <div onClick={increasing}>计数器：{props.num}</div>
  }
});
</script>

<style lang="scss" scoped>
div {
  height: 500px;
}
</style>