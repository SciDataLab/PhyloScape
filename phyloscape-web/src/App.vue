<template>
  <div v-cloak id="app">
    <router-view></router-view>
  </div>
</template>

<script setup>
import {ref,onMounted} from "vue"
const beforeunloadTime = ref(0)
const uploadTime = ref(0)




onMounted(()=>{
})

</script>

<style>
#app{
  min-width:1230px;
  font-family:微软雅黑
}
  iframe{
    border:0;
  }
  /* 整个滚动条 */
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

/* 滚动条有滑块的轨道部分 */
::-webkit-scrollbar-track-piece {
  background-color: transparent;
  border-radius: 5px;
}

/* 滚动条滑块(竖向:vertical 横向:horizontal) */
::-webkit-scrollbar-thumb {
  cursor: pointer;
  background-color: #43bec4;
  border-radius: 5px;
}

/* 滚动条滑块hover */
::-webkit-scrollbar-thumb:hover {
  background-color: #999999;
}

/* 同时有垂直和水平滚动条时交汇的部分 */
::-webkit-scrollbar-corner {
  display: block;
  /* 修复交汇时出现的白块 */
}
/* 修改滑块轨道背景颜色 */
.el-slider__bar {
  background-color: #42bec3;
}
/* 修改滑块按钮（Thumb）的颜色 */
.el-slider__button {
  background-color: white;
  border: solid 2px #42bec3;
}

/* 如果需要，也可以修改滑块按钮 hover、active 或 disabled 状态的颜色 */
.el-slider.is-vertical .el-slider__button-wrapper:hover .el-slider__button,
.el-slider__button-wrapper:hover .el-slider__button,
.el-slider__button-wrapper.active .el-slider__button {
  /* background-color: #hover-color; */
}
/* 修改标记点颜色 */
.el-slider__marks-text {
  color: #42bec3;
}

/* 修改提示线颜色 */
.el-slider.is-vertical .el-slider__track-mark,
.el-slider__track-mark {
  background-color: #42bec3;
}


/* el-select */
.el-select .el-input__inner {
  /* color: #42bec3; */
}
.el-select .el-input.is-focus .el-input__wrapper{
  box-shadow: 0 0 0 1px #42bec3!important;
  border-right: 1px solid #42bec3;
}
.el-select:focus .el-input__inner {
  border-color: #42bec3;
  outline: 0;
}
.el-select.is-active .el-select__caret-position {
  /* caret 图标颜色 */
  color: #42bec3;
}
.el-select-dropdown__item.is-selected {
  color: #42bec3;
  /* background-color: #42bec3; */
}
.el-select-dropdown {
  /* background-color: #42bec3; */
}
.el-select{
  --el-select-input-focus-border-color:#42bec3
}
.el-select-dropdown__item.selected{
  color:#42bec3;
}
.el-button--text{
  color:black;
  font-weight:bold;
}
.el-input__wrapper.is-focus{
  box-shadow:0 0 0 1px #42bec3!important;
  border-right:1px solid #42bec3;
}
.el-pagination button[type=button] {
  color: #42bec3 !important; /* 文字颜色 */
  /* border-color: #your-border-color !important; 边框颜色 */
  /* background-color: #42bec3 !important; 背景颜色 */
  
  &:hover,
  &.is-disabled {
    /* 鼠标悬停或禁用状态的颜色 */
    color: #42bec3 !important;
    background-color: #42bec3 !important;
  }

  &.is-current {
    /* 当前选中页的颜色 */
    color: #42bec3 !important;
    background-color: #42bec3 !important;
  }
}
.el-pagination .el-pagination__sizes select {
  background-color: #42bec3 !important;
}
.el-pagination.is-background .btn-next.is-active, .el-pagination.is-background .btn-prev.is-active, .el-pagination.is-background .el-pager li.is-active{
  background-color: #42bec3 !important;
}



</style>
