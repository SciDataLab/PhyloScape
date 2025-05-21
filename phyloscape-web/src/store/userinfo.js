//想要使用必须先引入defineStore
import { defineStore } from "pinia";

export const useUserInfo = defineStore('userinfo',{
  state(){
    return {
      email:'',
      username:''
    }
  },
  getters:{

  },
  actions:{

  }
})