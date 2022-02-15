<template>
  <h2 @click="increasing()">计数器：{{ title }}</h2>
</template>

<script lang="ts">
import { ref, defineEmits, defineProps, defineComponent } from "vue";
export default defineComponent({
  props: {
    title: Number,
  },
  setup(props, context) {
    // defineProps({ modelValue: Number });
    console.log("props", props.title);
    function increasing() {
      context.emit("update:title", props.title + 1);
    }

    return {
      increasing,
    };
    // return () => <div onClick={increasing}">计数器：{title}</button>
  }
});
</script>

<style lang="scss" scoped>
</style>