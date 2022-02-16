
<script lang="tsx">
import { inject } from 'vue'
export default {
  name: "Heading",
  props: {
    level: Number
  },
  setup(props: { level: void }, { slots }) {
    console.log('level', props)
    const level = inject('level');
    const tag = "h" + level;

    console.log('heading', level)
    return () => <tag>{slots}</tag>
  },
};
</script>

<style lang="scss" scoped>
</style>