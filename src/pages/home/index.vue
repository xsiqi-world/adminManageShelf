<template>
  <div>
    这是首页
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from "/@/components/HelloWorld.vue"
export default {
  name: 'default',
  components: {
    HelloWorld
  },
  setup() {
    console.log('首页')
  }
}
</script>

<style lang="scss" scoped>

</style>