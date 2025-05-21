<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenyan
 * @Date: 2023-06-05 09:53:10
 * @LastEditors: chenyan
 * @LastEditTime: 2023-06-06 09:40:34
-->
<template>
  <div class="datalistwrap">
    <div class="main">
      <div class="example-pagination-block">
        <!-- <el-row>
          <el-col :span="12">
            <el-input
              v-model="listparams.searchinput"
              placeholder="Please input"
            >
              <template #append>
                <el-button :icon="Search" />
              </template>
            </el-input>
          </el-col>
          <el-col :span="12">
            <el-pagination
              style="float: right"
              layout="prev, pager, next"
              :total="tableTotal"
            />
          </el-col>
        </el-row> -->
      </div>
      <div class="con">
        <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#42bec3', color: '#fff', border: '0', }">
          <el-table-column fixed prop="title" :label="$t('personal.thumbnail')" align="center">
            <template #default="scope">
              <el-image :src="'/PhyloScape/' + scope.row.img"></el-image>
            </template>
          </el-table-column>
          <el-table-column fixed prop="title" :label="$t('personal.dataname')">
            <template #default="scope">
              <p style="font-size: 16px; color: black">{{ scope.row.title }}</p>
              <p style="font-size: 12px; text-indent: 2em">
                {{ scope.row.abs }}
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="type" :label="$t('personal.datatype')">
            <template #default="scope">
              <a class="typea" v-for="item2 in scope.row.type">
                {{ sharetypeopts[item2].label }}
              </a>
            </template>
          </el-table-column>
          <el-table-column prop="date" :label="$t('personal.uploadtime')" width="120px"></el-table-column>
          <el-table-column
            fixed="right"
            :label="$t('personal.opt')"
            width="180px"
            align="center"
          >
            <template #default="scope">
              <el-button
                link
                type="primary"
                size="small"
                @click="
                  goApplication({
                    id: scope.row.id,
                    panelnum: scope.row.panelnum,
                    treeid: scope.row.tree,
                    layer: scope.row.layer,
                    tree_type: scope.row.tree_type,
                    mapid:scope.row.map,
                    map_type:JSON.stringify(scope.row.map_type)
                  })
                "
              >
                {{$t('common.application')}}
              </el-button>
              <el-button
                link
                type="primary"
                size="small"
                @click="setDelete({ id: scope.row.id })"
                >{{$t('personal.del')}}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        style="float: right"
        layout="prev, pager, next"
        :total="tableTotal"
      />
    </div>
  </div>
</template>

<script setup>
import img1 from "@/assets/plugins/maptransmission.png";
import img2 from "@/assets/plugins/mapcolor.png";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {sharetypeopts} from "@/utils/utils"
import { Search } from "@element-plus/icons-vue";
import { jhscenter, jhspersondel, jhslike } from "@/api/accounts/index.js";
import { ElMessage, ElMessageBox } from "element-plus";
const listparams = {
  searchinput: "",
  pageSize: 10,
  pageNo: 1,
};
const router = useRouter();
const godetail = (params) => {
  router.push({
    path: "/gallerydetail",
    query: {
      path: params.path,
      name: params.name,
    },
  });
};
const tableData = ref([]);
const tableTotal = ref(0);
const dataType = {
  0: "MapTransmission",
  1: "MapColor",
  2: "MapRegion",
  3: "PieNetwork",
  4: "FreqStack",
  5: "GroupBar",
  6: "ACMap",
};
const getMydataList = () => {
  jhscenter({ share: true }).then((res) => {
    if (res.code === 0) {
      tableData.value = res.data;
      tableTotal.value = res.total;
    }
  });
};
const handleClick = () => {};
const clickShare = (row) => {
  const params = {
    share: row.share,
    id: row.id,
  };
  jhspersonput(params).then((res) => {
    if (res.code === 0) {
      getMydataList();
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
      },
    });
  }
  else if (params.panelnum == 2) {
    router.push({
      path: "/applicationtwo",
      query: {
        id: params.id,
        panelnum:params.panelnum,
        treeid: params.treeid,
        tree_type:params.tree_type,
        mapid: params.mapid,
        map_type:params.map_type
      },
    });
  }
  else {
    router.push({
      path: "/application",
      query: {
        id: params.id,
        panelnum: params.panelnum,
        treeid: params.treeid,
        tree_type: params.tree_type,
        mapid: params.mapid,
        map_type: params.map_type,
      },
    });
  }
};
const setDelete = (params) => {
  ElMessageBox.confirm("是否删除该条记录！", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      jhspersondel({ id: params.id }).then((res) => {
        if (res.code === 0) {
          ElMessage({
            type: "success",
            message: "Delete completed",
          });
          getMydataList();
        }
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};

onMounted(() => {
  getMydataList();
});
</script>
<style lang="scss" scoped>
.datalistwrap {
  .main {
    width: 90%;
    margin: 0 auto;
    padding: 20px 10px;
    flex: 1;

    .con {
      margin-top: 30px;
      min-height: 500px;
      .typea{
                &:after{
                  content:'、'
                }
                &:last-child{
                  &:after{
                    content:''
                  }
                }
              }
    }

    .right-con {
      display: flex;
      padding: 25px 10px 10px;
      border-bottom: 1px solid #eee;
      margin-top: 10px;
      align-items: center;

      &:hover {
        background: #f4f5f7;
      }

      .right-l {
        width: 200px;
        overflow: hidden;

        // iframe {
        //   width: 100%;
        //   height: 140px;
        // }
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
