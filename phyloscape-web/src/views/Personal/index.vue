<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenyan
 * @Date: 2023-05-17 11:12:36
 * @LastEditors: chenyan
 * @LastEditTime: 2023-06-06 09:48:24
-->
<template>
  <div class="personalwrap">
    <div class="topbg">
      <div class="con">
        <!-- <div class="left">
          <el-image :src="headimg"></el-image>
        </div> -->
        <div class="right">
          <p class="name-likes">
            <span class="name">{{guserinfo.username}}{{ $t('personal.pcenter') }}</span>
            <!-- <span class="likes">1<a>个赞</a></span> -->
          </p>
        </div>
      </div>
    </div>

    <div class="centermain">
      <div class="left">
        <el-menu class="el-menu-vertical-demo" :default-active="curactive" mode="vertical" text-color="#555" active-text-color="#fdae61"
          @select="handleSelect" style="border:0;">
          <el-menu-item :index="item.index" v-for="item in leftmenurouter">
            {{ item.name }}
          </el-menu-item>
        </el-menu>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup>
  import {
    ref,
    onMounted
  } from 'vue'
  import {useRouter,
    useRoute} from 'vue-router'
  import headimg from '@/assets/gallery/headimg.png'
  import {
    useUserInfo
  } from '@/store/userinfo.js'

  const guserinfo = useUserInfo()


  const curactive = ref(null)
  const router = useRouter();
  const route = useRoute();
  const leftmenurouter = [
    {
      index: "/personal/data/list",
      name: "我的数据",
    },
    {
      index: "/personal/share/list",
      name: "我的共享",
    }
  ];
  const handleSelect = (key) =>{
    router.push({
      path: key,
    });
  }

  onMounted(()=>{
    curactive.value = route.path
   
  })
</script>
<style lang="scss" scoped>
  .personalwrap {
    .topbg {
      width:100%;
      background: #3fa2bc;

      .con {
        width: 80%;
        margin: 0 auto;
        display: flex;
        height: 180px;
        align-items: center;

        .left {
          width: 200px;

          .el-image {
            width: 150px;
          }
        }

        .right {
          flex: 1;
          color: white;

          .name-likes {
            font-weight: bold;
            font-size: 28px;

            .name {
              padding-right: 20px;
            }

            .likes {
              border-left: 1px solid white;
              padding-left: 20px;

              a {
                padding-left: 5px;
                font-size: 14px
              }
            }
          }
        }
      }
    }

    .centermain{
      width:80%;
      display:flex;
      margin:0 auto;
      padding:30px 0 30px;
      .left{
        width:200px;
        border-right:1px solid #eee;
      }
      .right{
        flex:1;
      }
    }

  }
</style>