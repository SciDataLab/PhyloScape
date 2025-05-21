<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenyan
 * @Date: 2023-05-17 11:12:36
 * @LastEditors: chenyan
 * @LastEditTime: 2023-06-06 09:40:18
-->
<template>
  <div class="personalwrap">
    <div class="topbg">
      <div class="con">
        <div class="left">
          <el-image :src="headimg"></el-image>
        </div>
        <div class="right">
          <p class="name-likes">
            <span class="name">cy123的个人中心</span>
            <span class="likes">1<a>个赞</a></span>
          </p>
        </div>
      </div>
    </div>

    
    <div class="main">
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
                    <span>
                      <el-image :src="likes"></el-image>
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
</template>
<script setup>
  import {
    ref,
    onMounted
  } from 'vue'
  import {useRouter} from 'vue-router'
  import headimg from '@/assets/gallery/headimg.png'
  import pageviews from '@/assets/gallery/pageviews.png'
  import likes from '@/assets/gallery/likes.png'
  import topic from '@/assets/gallery/topic.png'
  import author from '@/assets/gallery/author.png'
  import time from '@/assets/gallery/time.png'
  import {
  Search,
} from '@element-plus/icons-vue'
  const router = useRouter();
  const gallerylist = ref([])
  const listparams = {
    searchinput:'',
    pageSize:10,
    pageNo:1,
  }
  const getGalleryList = () => {
    gallerylist.value = [{
      url: '/map/home1',
      title: '进化树与地图传播用例--配色',
      pageviews: '4,000',
      likes: '3,500',
      abs: '进化树与地图传播用例--配色',
      topic: '进化树与地图传播用例',
      author: '王小花',
      time: '2023-05-28'
    }, {
      url: '/map/home2',
      title: '进化树与地图着色用例--配色',
      pageviews: '4,000',
      likes: '3,500',
      abs: '进化树与地图着色用例--配色',
      topic: '进化树与地图着色用例',
      author: '王小花',
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
  onMounted(() => {
    getGalleryList()
  })
</script>
<style lang="scss" scoped>
  .personalwrap {
    .topbg {
      width:100%;
      background: #1E1E1E;

      .con {
        width: 80%;
        margin: 0 auto;
        display: flex;
        height: 240px;
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

    .main {
      width:80%;
      margin:0 auto;
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
                width: 20px;
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
</style>