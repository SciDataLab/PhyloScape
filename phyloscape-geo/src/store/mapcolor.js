//想要使用必须先引入defineStore


import { defineStore } from "pinia";
export const mapcolorStore = defineStore("mapcolor", {
  state() {
    return {
      ftype:'',
      map_id:'',
      iframe:''
    };
  },
  getters: {
    //相当于vue里面的计算属性，可以缓存数据
   
  },
  actions: {
    //可以通过actions方法，改变state里面的值
  },
});
