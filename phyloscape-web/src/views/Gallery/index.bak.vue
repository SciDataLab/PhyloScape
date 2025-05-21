<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenyan
 * @Date: 2023-04-04 09:54:59
 * @LastEditors: chenyan
 * @LastEditTime: 2023-06-06 09:40:26
-->
<template>
    <div class="gallerywrap">
      <div class="main">
        <div class="left">
          <left-menu></left-menu>
        </div>
        <div class="right">
          <div class="example-pagination-block">
            <el-row>
              <el-col :span="12">
                <el-input v-model="listparams.searchinput" placeholder="Please input">
                  <template #append>
                    <el-button :icon="Search" />
                  </template>
                </el-input>
              </el-col>
              <el-col :span="12">
                <el-pagination style="float:right;" layout="prev, pager, next" :total="1000" />
              </el-col>
            </el-row>
          </div>
          <div class="con">
            <div class="right-con" v-for="item in gallerylist">
              <div class="right-r">
                <p class="title-icon">
                  <el-row>
                    <el-col :span="12">
                      <p class="title">{{ item.title }}</p>
                    </el-col>
                    <el-col :span="12" style="float:right;">
                      <p class="icons">
                        <span>
                          <el-image :src="pageviews"></el-image>
                          <a>{{item.pageviews}}</a>
                        </span>
                        <span style="cursor: pointer;" @click="clickLikes">
                          <el-image v-if="islikes" :src="likes_c"></el-image>
                          <el-image v-else :src="likes"></el-image>
                          <a>{{item.likes}}</a>
                        </span>
                      </p>
                    </el-col>
                  </el-row>
                </p>
  
                <p class="abs">
                  {{ item.abs }}
                </p>
                <p class="info">
                  <!--作者、所属专题、创建时间 -->
                  <span class="topic">
                    <el-image :src="topic"></el-image>{{ item.topic }}
                  </span>
                  <span>
                    <el-image :src="author"></el-image>{{item.author}}
                  </span>
                  <span>
                    <el-image :src="time"></el-image>{{item.time}}
                  </span>
                </p>
                <p class="detail">
                  <el-button link @click="godetail({path:'/home1',name:'进化树与地图传播用例'})">查看详情</el-button>
                </p>
              </div>
              <div class="right-l">
                <iframe :src="item.url"></iframe>
              </div>
            </div>
          </div>
          <el-pagination style="float:right;" layout="prev, pager, next" :total="1000" />
        </div>
      </div>
    </div>
  </template>
  <script setup>
    import {
      ref,
      onMounted
    } from 'vue'
    const curtype = ref('thumbnail')
    import pageviews from '@/assets/gallery/pageviews.png'
    import likes from '@/assets/gallery/likes.png'
    import likes_c from '@/assets/gallery/likes_c.png'
  
    import topic from '@/assets/gallery/topic.png'
    import author from '@/assets/gallery/author.png'
    import time from '@/assets/gallery/time.png'
    import leftMenu from './components/leftMenu.vue'
    import {
      useRouter
    } from 'vue-router'
    import {
    Search,
  } from '@element-plus/icons-vue'
    const listparams = {
      searchinput:'',
      pageSize:10,
      pageNo:1,
    }
    const router = useRouter();
    const islikes = ref(false)
    const gallerylist = ref([])
  
    const setList = () => {
      curtype.value = 'list'
    }
    const setThumbnail = () => {
      curtype.value = 'thumbnail'
    }
    const getGalleryList = () => {
      gallerylist.value = [{
        url: '/map/home1',
        title: '进化树与地图传播用例--配色',
        pageviews: '4,000',
        likes: '3,500',
        abs: '进化树与地图传播用例--配色',
        topic: '进化树与地图传播用例',
        author: 'cy123',
        time: '2023-05-28'
      }, {
        url: '/map/home2',
        title: '进化树与地图着色用例--配色',
        pageviews: '4,000',
        likes: '3,500',
        abs: '进化树与地图着色用例--配色',
        topic: '进化树与地图着色用例',
        author: 'cy123',
        time: '2023-05-28'
      }]
    }
    const godetail = (params) => {
      router.push({
        path: '/gallerydetail',
        query: {
          path: params.path,
          name: params.name
        }
      })
    }
    const clickLikes = ()=>{
      islikes.value = islikes.value?false:true;
    }
    onMounted(() => {
      getGalleryList()
    })
  </script>
  <style lang="scss">
    .gallerywrap {
      width: 80%;
      min-height: calc(100vh - 160px);
      margin: 0 auto;
  
      .main {
        display: flex;
  
        .left {
          width: 240px;
  
          .el-menu {
            border-right: 0;
          }
        }
  
        .right {
          padding: 20px 10px;
          flex: 1;
  
          .con {
            min-height: 500px;
          }
  
          .right-con {
            display: flex;
            padding: 25px 10px 10px;
            border-bottom: 1px solid #eee;
            margin-top: 10px;
            align-items: center;
  
            &:hover {
              background: #f4f5f7
            }
  
            .right-l {
              width: 200px;
              height: 140px;
              overflow: hidden;
  
              iframe {
                width: 100%;
                height: 140px;
              }
            }
  
            .right-r {
              flex: 1;
              padding-right: 10px;
  
              .title-icon {
                .title {
                  color: #1d1d1d;
                  font-size: 20px;
                }
  
                .icons {
                  text-align: right;
  
                  .el-image {
                    width: 20px;
                    vertical-align: middle;
                  }
  
                  a {
                    color: #555555;
                    padding-right: 10px;
                  }
                }
              }
  
              .abs {
                padding-top: 10px;
                color: #555;
                font-size: 14px;
                display: block;
                text-align: justify;
              }
  
              .info {
                padding-top: 10px;
  
                span {
                  color: #888;
                  font-size: 14px;
                  padding-right: 10px;
  
                  .el-image {
                    width: 10px;
                    vertical-align: middle;
  
                    .el-image__inner {
                      vertical-align: baseline;
                    }
                  }
                }
  
                .topic {
                  color: #fdae61;
                  padding-right: 30px;
                }
              }
  
              .detail {
                padding-top: 10px;
                border-radius: 5px;
                color: #eee;
  
                .el-button {
                  cursor: pointer;
                  width: 100px;
                  padding: 10px 0;
                  background: #f4f5f7;
  
                  &:hover {
                    background: #fdae61;
                    color: white;
                  }
                }
              }
            }
          }
        }
      }
    }
  </style>