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
    <div class="topsearch">
      <el-row>
        <el-col :span="12">
          <el-input
            v-model="listparams.name"
            placeholder="Please input"
            class="input-with-select"
            @keyup.enter.native="getGalleryList"
          >
            <template #prepend>
              <el-select
                v-model="listparams.type"
                placeholder="Select"
                style="width: 115px"
                @change="getGalleryList"
              >
                <el-option
                  v-for="opt in gallerytypeopts"
                  :label="opt.label"
                  :value="opt.value"
                />
              </el-select>
            </template>
            <template #append>
              <el-button :icon="Search" @click="getGalleryList" />
            </template>
          </el-input>
        </el-col>
        <el-col :span="12" style="text-align: right">
          <el-select
            v-model="listparams.order"
            placeholder="Select"
            tyle="width: 180px"
            @change="getGalleryList"
          >
            <el-option
              v-for="opt in gallerysortopts"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="maincon">
      <el-row class="mainrow" v-if="gallerylisttotal > 0" :gutter="50">
        <el-col :span="8" v-for="item in gallerylist">
          <div class="colli">
            <div class="fimg">
              <el-image :src="item.img"></el-image>
            </div>
            <div class="textcon">
              <p class="title">
                {{ item.title }}
              </p>

              <div class="con topic">
                <span>{{ $t("gallery.topic") }}：</span>
                <el-popover
                  placement="top-start"
                  title="Detail"
                  :width="400"
                  trigger="hover"
                  :content="item.udate"
                >
                  <template #reference>
                    <div class="show1" style="flex: 1">
                      <a class="typea" v-for="item2 in item.type">
                        {{ sharetypeopts[item2].label }}
                      </a>
                    </div>
                  </template>
                </el-popover>
              </div>
              <div class="con time">
                <span>{{ $t("gallery.time") }}：</span>
                <el-popover
                  placement="top-start"
                  title="Detail"
                  :width="400"
                  trigger="hover"
                  :content="item.udate"
                >
                  <template #reference>
                    <div class="show1" style="flex: 1">{{ item.udate }}</div>
                  </template>
                </el-popover>
              </div>
              <div class="con">
                <span>{{ $t("gallery.des") }}：</span>
                <el-popover
                  placement="top-start"
                  title="Detail"
                  :width="400"
                  trigger="hover"
                  :content="item.abs"
                >
                  <template #reference>
                    <div class="abs" style="flex: 1">{{ item.abs }}</div>
                  </template>
                </el-popover>
              </div>
              <!-- <div class="con abs" @mouseover = "showalldes">{{ $t("gallery.des") }}：{{ item.abs }}</div> -->

              <div class="con author">
                <span>{{ $t("gallery.author") }}：</span>
                {{ item.author }}
              </div>
              <div class="lastline">
                <div class="fbtn">
                  <el-row>
                    <el-col :span="12">
                      <el-button
                        color="#42bec3"
                        style="color: white"
                        size="small"
                        @click="
                          goApplication({
                            id: item.id,
                            panelnum: item.panelnum,
                            treeid: item.tree,
                            tree_type: item.tree_type,
                            mapid: item.map,
                            map_type: JSON.stringify(item.map_type),
                            from: 'gallery',
                          })
                        "
                        >{{ $t("gallery.preview") }}</el-button
                      >
                      <!-- <el-button type="warning" size="small">{{$t('gallery.copy')}}</el-button> -->
                    </el-col>
                    <el-col :span="12" style="text-align: right">
                      <p class="icons">
                        <!-- <span>
                        <el-image :src="pageviews"></el-image>
                        <a>{{ item.pageviews }}</a>
                      </span> -->
                        <span style="cursor: pointer" @click="clickLikes(item)">
                          <!-- <el-image v-if="islikes" :src="likes_c"></el-image> -->
                          <!-- v-else -->
                          <el-image :src="likes"></el-image>
                          <a>{{ item.likes }}</a>
                        </span>
                      </p>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div v-else class="contentnull">
        <el-empty :image-size="200" />
      </div>
    </div>
    <el-pagination
      background
      style="float: right"
      layout="prev, pager, next"
      :total="gallerylisttotal"
      :page-size="listparams.pagesize"
      @current-change="currentchange"
    />
    <div class="topsearch">
      <el-row>
        <el-col :span="12"> </el-col>
        <el-col :span="12">
          <!-- <el-pagination
            style="float: right"
            layout="prev, pager, next"
            :total="gallerylisttotal"
            :page-size="listparams.pagesize"
          /> -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup>
import { ref, nextTick, onMounted } from "vue";
const curtype = ref("thumbnail");
import { jhsgallery } from "@/api/gallery/index.js";
import { jhslike } from "@/api/accounts/index.js";
import { useRouter } from "vue-router";
import { sharetypeopts, gallerytypeopts } from "@/utils/utils";
import { Search } from "@element-plus/icons-vue";
import likes from "@/assets/gallery/likes.png";
import { useI18n } from "vue-i18n";
import domtoimage from "dom-to-image";
const { t } = useI18n();
const listparams = ref({
  type: "-1",
  name: "",
  order: "time",
  name: "",
  pagesize: 9,
  pageNum: 1,
});
const router = useRouter();
const gallerylist = ref([]);
const gallerylisttotal = ref(0);
const setList = () => {
  curtype.value = "list";
};
const gallerysortopts = [
  {
    label: t("gallery.sort1"),
    value: "like",
  },
  {
    label: t("gallery.sort2"),
    value: "time",
  },
];
const setThumbnail = () => {
  curtype.value = "thumbnail";
};
const getGalleryList = () => {
  jhsgallery(listparams.value).then((res) => {
    if (res.code === 0) {
      gallerylist.value = res.data;
      gallerylisttotal.value = res.total;
    }
  });
};
const goApplication = (params) => {
  if (params.panelnum == 1) {
    router.push({
      path: "/applicationone",
      query: {
        id: params.id,
        panelnum: params.panelnum,
        treeid: params.treeid,
        tree_type: params.tree_type,
        from: params.from,
      },
    });
  } else if (params.panelnum == 2) {
    router.push({
      path: "/applicationtwo",
      query: {
        id: params.id,
        panelnum: params.panelnum,
        treeid: params.treeid,
        tree_type: params.tree_type,
        mapid: params.mapid,
        map_type: params.map_type,
        from: params.from,
      },
    });
  } else {
    router.push({
      path: "/application",
      query: {
        id: params.id,
        panelnum: params.panelnum,
        treeid: params.treeid,
        tree_type: params.tree_type,
        mapid: params.mapid,
        map_type: params.map_type,
        from: params.from,
      },
    });
  }
};
const godetail = (params) => {
  router.push({
    path: "/gallerydetail",
    query: {
      path: params.path,
      name: params.name,
    },
  });
};
const clickLikes = (item) => {
  // islikes.value = islikes.value ? false : true;
  const params = {
    id: item.id,
    favor: item.favor ? "0" : "1",
  };
  jhslike(params).then((res) => {
    if (res.code === 0) {
      getGalleryList();
    }
  });
};
const currentchange = (val) => {
  listparams.value.pageNum = val;
  getGalleryList();
};

onMounted(() => {
  getGalleryList();
});
</script>
<style lang="scss">
.gallerywrap {
  width: 80%;
  min-height: calc(100vh - 160px);
  margin: 0 auto;
  .topsearch {
    width: 100%;
    margin: 20px auto;
  }
  .maincon {
    margin-top: 50px;
    min-height: 480px;
    display: flex;
    justify-content: center;
    .mainrow {
      width: 100%;
      & > .el-col {
        margin-bottom: 20px;

        .colli {
          padding: 5px;
          border-radius: 5px;
          border: 2px dashed #ddd;
          height: 380px;
          position: relative;

          .fimg {
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            margin-bottom: 20px;
            height: 150px;
          }
          .textcon {
            padding: 0 10px;
            .title {
              font-size: 16px;
              color: #242424;
              font-weight: bold;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .show1 {
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .abs {
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .con {
              font-size: 14px;
              color: #707070;
              line-height: 25px;
              display: flex;
              // white-space: nowrap;
              // overflow: hidden;
              // text-overflow: ellipsis;
              // width: 360px;
              // display: inline-block;
              .typea {
                &:after {
                  content: "、";
                }
                &:last-child {
                  &:after {
                    content: "";
                  }
                }
              }
            }
            .lastline {
              position: absolute;
              bottom: 10px;
              width: calc(100% - 10px);
              .fbtn {
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
            }
          }
        }
      }
    }
  }
}
</style>
