<template>
  <div class="role-container">
    <div class="content">
      test
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.role-container {
  .content {
    background-color: #fff;
    .breadcrumb {
      padding: 10px;
    }
  }
}
</style>
