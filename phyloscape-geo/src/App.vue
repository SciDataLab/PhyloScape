<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenyan
 * @Date: 2022-07-26 10:43:58
 * @LastEditors: chenyan
 * @LastEditTime: 2023-04-10 13:55:57
-->
<template>
  <div v-cloak id="app">
    <router-view></router-view>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
onMounted(() => {

});
</script>

<style>
[v-cloak] {
  display: none;
}

body {
  margin: 0;
}

#app {
  padding: 0;
  margin: 0;
}

</style>
