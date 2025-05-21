<template>
    <div class="personalwrap">
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
              <el-pagination style="float:right;" layout="prev, pager, next" :total="sharelisttotal" />
            </el-col>
          </el-row>
        </div>
        <div class="con">
          <div class="right-con" v-for="item in sharelist">
            <div class="right-r">
              <p class="title-icon">
                <el-row>
                  <el-col :span="12">
                    <p class="title">{{ item.title }}</p>
                  </el-col>
                  <el-col :span="12" style="float:right;">
                    <!-- <p class="icons">
                      <span>
                        <el-image :src="pageviews"></el-image>
                        <a>{{item.pageviews}}</a>
                      </span>
                      <span style="cursor:pointer" @click="clickLikes(item)">
                        <el-image v-if="item.favor" :src="likes_c" ></el-image>
                        <el-image v-else :src="likes" ></el-image>
                        <a>{{item.likes}}</a>
                      </span>
                    </p> -->
                  </el-col>
                </el-row>
              </p>
  
              <p class="abs">
                {{ item.abs }}
              </p>
              <p class="info">
                <!--作者、所属专题、创建时间 -->
                <span class="topic">
                  <el-image :src="topic"></el-image>{{ dataType[item.type] }}
                </span>
                <span>
                  <el-image :src="author"></el-image>{{item.author}}
                </span>
                <span>
                  <el-image :src="time"></el-image>{{item.date}}
                </span>
  
              </p>
              <p class="detail">
                <el-button link @click="goApplication({id:item.id,treeid:item.tree,layer:item.layer})">查看详情</el-button>
              </p>
            </div>
            <div class="right-l">
              <el-image :src="item.img"></el-image>
            </div>
          </div>
        </div>
        <el-pagination style="float:right;" layout="prev, pager, next" :total="sharelisttotal" />
      </div>
    </div>
  </template>
  <script setup>
    import { ref,onMounted } from 'vue'
    import {useRouter} from 'vue-router'
    import img1 from '@/assets/plugins/maptransmission.png'
    import img2 from '@/assets/plugins/mapcolor.png'
    import pageviews from '@/assets/gallery/pageviews.png'
    import likes from '@/assets/gallery/likes.png'
    import likes_c from "@/assets/gallery/likes_c.png";
  
    import topic from '@/assets/gallery/topic.png'
    import author from '@/assets/gallery/author.png'
    import time from '@/assets/gallery/time.png'
    import {jhscenter,jhspersondel,jhslike} from '@/api/accounts/index.js'
    import {
    Search,
  } from '@element-plus/icons-vue'
    const router = useRouter();
    const sharelist = ref([])
    const sharelisttotal = ref(0)
    const listparams = {
      searchinput:'',
      pageSize:10,
      pageNo:1,
    }
    const dataType = {
      0:'MapTransmission',
      1:'MapColor',
      2:'MapRegion',
      3:'PieNetwork',
      4:'FreqStack',
      5:'GroupBar',
      6:'ACMap'
    }
    const getShareList = () => {
      jhscenter({share:true}).then(res=>{
        if(res.code === 0){
          sharelist.value = res.data
          sharelisttotal.value = res.total
        }
      })
    }
    const goApplication = (params) => {
      router.push({
        path: '/application',
        query: {
          id: params.id,
          treeid: params.treeid,
          layer:params.layer
        }
      })
    }
    const clickLikes = (item) => {
      const params = {
        id:item.id,
        favor:item.favor?'0':'1'
      }
      jhslike(params).then(res=>{
        if(res.code === 0){
          getShareList()
        }
      })
    }
    onMounted(() => {
      getShareList()
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
        width:90%;
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