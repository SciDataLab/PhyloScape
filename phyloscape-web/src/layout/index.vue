<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenyan
 * @Date: 2022-07-26 10:43:58
 * @LastEditors: chenyan
 * @LastEditTime: 2023-04-10 09:59:12
-->

<template>
  <div>
    <top-menu></top-menu>
    <router-view></router-view>
  </div>
</template>

<script setup>
import topMenu from '@/components/topMenu.vue'
import { onMounted } from "vue";
import router from "@/router/router";
import { useStore } from "@/store/index";

const store = useStore();

// const updateName = () => {
//   // $patch修改store中的数据
//   store.$patch({
//     name: "名称被修改了，nameLegth也随之改变",
//   });
// };

onMounted(() => {
});
</script>

<style scoped>
[v-cloak] {
  display: none;
}
body {
  margin: 0;
  font-family:Quotes, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  text-rendering:unset!important;
}
#app {
  padding: 0;
  margin: 0;
}
</style>
