<template>
  <div class="datalistwrap">
    <div class="main">
      <div class="con">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{
            background: '#42bec3',
            color: '#fff',
            border: '0',
          }"
        >
          <el-table-column
            fixed
            prop="title"
            :label="$t('personal.thumbnail')"
            align="center"
            width="100px"
          >
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
              <!-- id: {{scope.row.id}}
                panelnum: {{scope.row.panelnum}}
                treeid: {{scope.row.tree}}
                tree_type:{{scope.row.tree_type}}
                mapid: {{scope.row.map}} -->
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            :label="$t('personal.datatype')"
            align="center"
            width="100px"
          >
            <template #default="scope">
              <a class="typea" v-for="item2 in scope.row.type">
                {{ sharetypeopts[item2].label }}
              </a>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            :label="$t('personal.uploadtime')"
            align="center"
            width="120px"
          />
          <el-table-column
            prop=""
            :label="$t('personal.isshared')"
            align="center"
            width="80px"
          >
            <template #default="scope">
              <el-switch
                v-model="scope.row.share"
                @click="clickShare(scope.row)"
              />
            </template>
          </el-table-column>
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
                @click="setEdit(scope.row)"
              >
                {{ $t("personal.edit") }}
              </el-button>
              <el-button
                link
                type="primary"
                size="small"
                @click="
                  goApplication({
                    id: scope.row.id,
                    panelnum: scope.row.panelnum,
                    treeid: scope.row.tree,
                    tree_type: scope.row.tree_type,
                    mapid: scope.row.map,
                    map_type: JSON.stringify(scope.row.map_type),
                  })
                "
              >
                {{ $t("common.application") }}
              </el-button>
              <el-button
                link
                type="primary"
                size="small"
                @click="setDelete({ id: scope.row.id })"
                >{{ $t("personal.del") }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 共享 -->
        <el-dialog
          v-model="dialogShareFormVisible"
          :title="$t('application.share')"
        >
          <el-form ref="shareformRef" :model="shareform" :rules="sharerules">
            <el-form-item
              :label="$t('application.imgs')"
              :label-width="formLabelWidth"
              prop="img"
            >
              <el-upload
                class="upload-demo"
                action=""
                accept=".png,.jpg"
                :max-size="1024 * 1024 * 100"
                :limit="1"
                :on-change="uploadimghandleChange"
                :auto-upload="false"
              >
                <el-button color="#42be43" style="color: white"
                  >Click to upload</el-button
                >
              </el-upload>
              {{ shareform.img!="[object File]"?shareform.img:"" }}
            </el-form-item>
            <el-form-item
              :label="$t('application.title')"
              :label-width="formLabelWidth"
              prop="title"
            >
              <el-input v-model="shareform.title" autocomplete="off" />
            </el-form-item>
            <el-form-item
              :label="$t('application.abs')"
              :label-width="formLabelWidth"
              prop="des"
            >
              <el-input v-model="shareform.des" autocomplete="off" :rows="2" />
            </el-form-item>
            <el-form-item
              :label="$t('application.type')"
              :label-width="formLabelWidth"
              prop="type"
            >
              <el-select
                v-model="shareform.type"
                multiple
                placeholder="Please select a type"
              >
                <el-option
                  v-for="item in sharetypeopts"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogShareFormVisible = false"
                >Cancel</el-button
              >
              <el-button
                color="#42be43"
                style="color: white"
                @click="saveShare(shareformRef)"
              >
                Confirm
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
      <el-pagination
        style="float: right"
        layout="prev, pager, next"
        :total="tableTotal"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
import { sharetypeopts } from "@/utils/utils";
import { useRouter } from "vue-router";
import {
  jhscenter,
  jhspersondel,
  jhspersonput,
  jhspersonpost,
} from "@/api/accounts/index.js";
import { ElMessage, ElMessageBox } from "element-plus";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const formLabelWidth = "140px";
const shareformRef = ref(null);
const fileList = ref([])
const shareform = reactive({
  id: "",
  img: "",
  title: "",
  des: "",
  type: [],
});
const sharerules = reactive({
  img: [
    {
      required: true,
      message: "Please upload image!",
      trigger: "blur",
    },
  ],
  title: [
    {
      required: true,
      message: "Please input title!",
      trigger: "blur",
    },
  ],
  des: [
    {
      required: true,
      message: "Please input describe!",
      trigger: "blur",
    },
  ],
  type: [
    {
      required: true,
      message: "Please select type!",
      trigger: "change",
    },
  ],
});
const listparams = reactive({
  name: "",
  type: 0,
  share: false,
  pagesize: 10,
  pageNum: 1,
});
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
const dialogShareFormVisible = ref(false);
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
  jhscenter(listparams).then((res) => {
    if (res.code === 0) {
      tableData.value = res.data;
      tableTotal.value = res.total;
    }
  });
};
// 树部分功能  初始化树
const uploadimghandleChange = (file) => {
  const maxSize = 1024 * 1024 * 100; // 100 MB
  if (file.size > maxSize) {
    ElMessage({
      message: t("application.curfileexceed"),
      type: "error",
    });
    return false;
  } else {
    shareform.img = file.raw;
  }
};
const setEdit = (row) => {
  if (row.id) {
    shareform.id = row.id;
    shareform.img = row.img;
    shareform.title = row.title;
    shareform.des = row.abs;
    shareform.type = row.type;
    dialogShareFormVisible.value = true;
  }
};
const saveShare = async (formEl) => {
  let treeid = "";
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      let formData = new FormData();
      // formData.append("id",shareform.id);
      formData.append("img", shareform.img);
      formData.append("title", shareform.title);
      formData.append("des", shareform.des);
      formData.append("type", shareform.type);
      formData.append("tree", treeid);
      jhspersonpost(shareform.id, formData).then((res) => {
        if (res.code == 0) {
          ElMessage({
            message: t("application.curshareedit"),
            type: "success",
          });
          dialogShareFormVisible.value = false;
          getMydataList();
        } else {
          ElMessage({
            message: res.msg,
            type: "error",
          });
        }
      });
    } else {
      console.log("error submit!");
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
      },
    });
  }
};
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
const setDelete = (params) => {
  ElMessageBox.confirm("Do you want to delete this record!", "Warning", {
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
const handleCurrentChange = (val) => {
  listparams.pageNum = val;
  getMydataList();
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
