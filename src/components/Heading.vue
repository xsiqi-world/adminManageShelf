<template>
  <div></div>
</template>

<script lang="ts">
export default {
  name: "Heading",
  setup(props, { slots }) {
    const tag = "h" + props.level;
    // return () => <tag>{slots}</tag>
  },
};
</script>

<style lang="scss" scoped>
</style>