<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { Layout } from '/@/components/Layout';

const route = useRoute();
console.log('route', route.path);
</script>

<template>
  <Layout v-if="!['/', '/login'].includes(route.path)">
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component v-if="$route.meta.keepAlive" :is="Component" :key="$route.name"></component>
      </keep-alive>
      <component v-if="!$route.meta.keepAlive" :is="Component" :key="$route.name"></component>
    </router-view>
  </Layout>
  <router-view v-else></router-view>
</template>

<style lang="scss">
/* 让元素内边距padding和外边距margin和边框border不超过宽高 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* 去掉边框 */
img {
  border: 0;
}

/* 去掉无序列表前面的小点 */
ul,
ol,
li {
  list-style: none;
}

input {
  padding-top: 0;
  padding-bottom: 0;
  border: none;
}

/* 去掉a标签的下划线 */
a {
  text-decoration: none;
}
</style>
