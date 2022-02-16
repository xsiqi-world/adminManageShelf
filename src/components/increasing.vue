<template>
  <h2 @click="increasing()">计数器：{{ title }}</h2>
</template>

<script lang="tsx">
import { ref, defineEmits, defineProps, defineComponent, inject } from "vue";
export default defineComponent({
  props: {
    title: Number,
  },
  setup(props, context) {
    console.log("props", props.title);

    let location = inject('location');
    console.log('increasing', location)

    function increasing() {
      context.emit("update:title", props.title + 1);
    }

    // return {
    //   increasing,
    // };
    return () => <div onClick={increasing}>计数器：{props.title}</div>
  }
});
</script>

<style lang="scss" scoped>
</style>