import {defineStore} from "pinia"
export const useStore = defineStore('storeId',{
  // 类似于组件中data，用于存储全局状态
  state:()=>{
    return{
      counter:0,
      name:'Eduardo',
      isAdmin:true,
      axiosvalue:{}
    }
  },
  //类似于组件中的computed，根据已有的State封装派生数据，也具有缓存的特性
  getters:{

  },
  //类似于组件中的methods，用于封装业务逻辑，同步异步均可以。可以通过actions方法，改变state里面的值
  actions:{
    
  }
})