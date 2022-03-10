<script setup lang="ts"></script>

<template>
  <router-view></router-view>
</template>

<style lang="scss">
html,
body,
ul,
li,
p,
h1,
h2,
h3,
form,
img {
  margin: 0;
  padding: 0;
}

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
ol {
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
