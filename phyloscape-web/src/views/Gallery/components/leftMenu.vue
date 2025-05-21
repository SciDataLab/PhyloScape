<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenyan
 * @Date: 2023-05-26 14:07:55
 * @LastEditors: chenyan
 * @LastEditTime: 2023-05-26 14:11:33
-->
<template>
<div class="leftmenuwrap">
  <el-menu :default-active="activeIndex2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" text-color="#555" active-text-color="#fdae61">
    <el-menu-item v-for="item in leftmenu" :index="item.value">
      <span>{{ item.label }}</span>
    </el-menu-item>
  </el-menu>
</div>
</template>

<script setup>
   import {ref } from 'vue'
   const activeIndex2 = ref('all')
   const leftmenu = [{
      label: '全部',
      value: 'all',
    },
    {
      label: '进化树与地图传播用例',
      value: 'home1',
    },
    {
      label: '进化树与地图着色用例',
      value: 'home2',
    },
    {
      label: '进化树与核密度图用例',
      value: 'home3',
    },
    {
      label: '进化树与网络图用例',
      value: 'home5',
    },
    {
      label: '进化树与统计图样例-1',
      value: 'home61',
    },
    {
      label: '进化树与统计图样例-2',
      value: 'home62',
    },
    {
      label: '进化树与统计图样例-3',
      value: 'home63',
    }
  ]
</script>