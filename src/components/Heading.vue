
<script lang="tsx">
import { inject, PropType } from 'vue'
export default {
  name: "Heading",
  props: {
    level: {
      type: Number as PropType<number>,
      default: 1
    }
  },
  setup(props, { slots }): () => JSX.Element {
    console.log('level', props)
    const level = inject('level');
    const Tag = "h" + level;

    console.log('heading', level)
    return () => <Tag>{slots}</Tag>
  },
};
</script>

<style lang="scss" scoped>
</style>