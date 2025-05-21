<template>
  <div class="appmenu">
    <el-row>
      <el-col :span="12" style="display: flex; align-items: center">
        <ul ref="firststep" style="width: 220px">
          <li
            v-for="item in panelli"
            :key="item.num"
            @click="curPanel(item.num)"
            :class="{ active: curpanelnum == item.num }"
          >
            <el-button class="btn" :disabled="curpanelnum == item.num">
              <el-image :src="item.name"></el-image>
            </el-button>
          </li>
        </ul>
        <el-button
          type="warning"
          round
          style="margin-left: 30px"
          size="small"
          @click="startIntro"
          >Guideline</el-button
        >
      </el-col>
      <el-col :span="12" class="right12">
        <el-select
          style="width: 350px"
          placeholder="Select demo"
          v-model="selectdemo1"
          @change="selectdemo1Change"
          clearable
        >
          <el-option
            v-for="item in curdemoopt"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="resetbtn">
          <el-tooltip content="reset" placement="top" effect="light">
            <el-button type="warning" @click="resetPage">
              {{ $t("application.reset") }}
            </el-button>
          </el-tooltip>
        </div>
        <div ref="sixthstep" class="sharebtn">
          <el-button
            v-if="guserinfo.username"
            color="#42bec3"
            @click="openShare"
            >{{ $t("application.share") }}</el-button
          >
          <el-tooltip
            v-else
            :content="$t('application.sharetip')"
            placement="top"
            effect="light"
          >
            <el-button color="#42bec3" @click="openShare" :disabled="true">{{
              $t("application.share")
            }}</el-button>
          </el-tooltip>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="applicationwrap">
    <div ref="thirdstep" :class="leftshow ? 'leftconfig' : 'leftconfighide'">
      <div v-show="leftshow">
        <el-image :src="close" @click="closeLeftConfig"></el-image>
        <div class="toptree">
          <div class="title">
            <el-image :src="treeicon"></el-image>
            <span>{{ $t("application.treetitle") }}</span>
          </div>
          <div class="treeindexwrap">
            <el-tabs
              type="border-card"
              @tab-change="tabTreeChange"
              v-model="panel1curtype"
            >
              <el-tab-pane name="ordinary">
                <template #label>
                  <span class="custom-tabs-label">
                    <el-tooltip
                      content="*Recommend for nodes < 10,000"
                      placement="top"
                      effect="dark"
                    >
                      <el-button link>
                        {{ $t("application.basictree") }}
                      </el-button>
                    </el-tooltip>
                  </span>
                </template>
                <tree-ordinary
                  @treeOrdinaryConfigTrans="panel1getOrdinaryConfig"
                  :treeordinaryMessage="treeordinaryMessage"
                ></tree-ordinary>
              </el-tab-pane>
              <el-tab-pane name="big">
                <template #label>
                  <span class="custom-tabs-label">
                    <el-tooltip
                      content="*Recommend for nodes > 10,000"
                      placement="top"
                      effect="dark"
                    >
                      <el-button link>
                        {{ $t("application.bigtree") }}
                      </el-button>
                    </el-tooltip>
                  </span>
                </template>
                <tree-big
                  @treeBigConfigTrans="panel1getBigConfig"
                  :treebigMessage="treebigMessage"
                ></tree-big>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
      <div v-show="!leftshow">
        <el-image :src="open" @click="openLeftConfig"></el-image>
      </div>
    </div>
    <div class="panelwrap">
      <div class="panel">
        <div class="panel1">
          <div id="tree-ordinary" v-show="panel1curtype == 'ordinary'">
            <div class="tips" v-show="!treeOridinaryConfig.content">
              {{ $t("application.uploadtreedatashow") }}
            </div>
          </div>
          <div id="tree-big" v-show="panel1curtype == 'big'">
            <div class="tips" v-show="!treeBigConfig.content">
              {{ $t("application.uploadtreedatashow") }}
            </div>
          </div>
        </div>
      </div>
    </div>
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
            :max-size="maxFileSize"
            :limit="1"
            :on-change="uploadimghandleChange"
            :auto-upload="false"
          >
            <el-button color="#42be43" style="color: white"
              >Click to upload</el-button
            >
          </el-upload>
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
          <el-input v-model="shareform.des" autocomplete="off" />
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
          <el-button @click="dialogShareFormVisible = false">Cancel</el-button>
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
</template>
<script setup>
import { ref, reactive, watch,nextTick, onMounted } from "vue";
import { jhscentent, jhssave, jhscfg } from "@/api/application/index.js";
import { ElMessage, ElMessageBox } from "element-plus";
import treeicon from "@/assets/application/treeicon.png";
import open from "@/assets/application/open.png";
import close from "@/assets/application/close.png";
import tree from "@/assets/application/tree.png";
import {
  maxFileSize,
  panelli,
  sharetypeopts,
  selectdemoopt1,
  selectdemoopt1large,
  openLoading,
  closeLoading,
  sharerules,
} from "@/utils/utils.js";
import { userinfo } from "@/api/accounts";
import TreeOrdinary from "./components/treeordinary.vue";
import TreeBig from "./components/treebig.vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useUserInfo } from "@/store/userinfo.js";
import { useStore } from "@/store";
import introJs from "intro.js";
import "intro.js/introjs.css"; // 引入 intro.js 的样式
const guserinfo = useUserInfo();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const store = useStore();
const curpanelnum = ref(1);
const selectdemo1 = ref("odemo1");
const shareid = ref(0);
const fromtype = ref(null);
const dialogShareFormVisible = ref(false);
const resetparams = reactive({
  treeid: null,
  treetype: null,
});
const firststep = ref(null);
const secondstep = ref(null);
const thirdstep = ref(null);
const fourthstep = ref(null);
const fifthstep = ref(null);
const sixthstep = ref(null);
const shareform = reactive({
  img: "",
  title: "",
  des: "",
  type: [],
  tree: "",
  map: "",
});
const formLabelWidth = "140px";
const shareformRef = ref(null);
const leftshow = ref(true);
// 开
const openLeftConfig = () => {
  leftshow.value = true;
};
// 关
const closeLeftConfig = () => {
  leftshow.value = false;
};
// // 超大树 树部分功能
let treeBIG = "";
let treeBigConfig = reactive({
  id: "",
  // source:
  //   "(Bovine:0.69395,(Gibbon:0.36079,(Orangutan:0.33636,(Gorilla:0.17147,(Chimp:1.19268,Human:0.11927):0.08386):0.06124):0.15057):0.54939,Mouse:1.21460);",
  source: "",
  type: "rc",
  fontColour: "#555",
  fontFamily: "Microsoft YaHei",
  fontSize: 12,
  padding: 30,
  zoom: 0,
  alignLabels: true,
  alignLineWidth: 1,
  alignLineOpacity: 0.1,
  showShapes: false,
  shapeBorderAlpha: 0.28,
  shapeBorderWidth: 1,
  fillColour: "rgba(0,0,0)",
  nodeSize: 6,
  nodeShape: "circle",
  showLabels: true,
  showBranchLengths: false,
  branchZoom: 0,
  haloRadius: 3,
  haloWidth: 2,
  highlightColour: "rgba(255, 0, 0, 1)",
  highFillColour: "rgba(255, 0, 0, 1)",
  showLeafLabels: true,
  showControlGui: false,
});
const curdemoopt = ref(selectdemoopt1)
const getInitBigTree = () => {
  console.log(treeBigConfig,'treeBigConfig')
  nextTick(() => {
    treeBIG = new PhyloScapeGL(
      document.querySelector("#tree-big"),
      treeBigConfig
    );
  });
};
let treeORDINARY = "";
let treeOridinaryConfig = reactive({
  id: "",
  content: "",
  leafs: { show: true },
  position: [20, 20],
  separation: 35,
  scale: 1,
  rotationAngle: -1,
  isPhylogram: true,
  isNodesShape: false,
  isWheelZoom: true,
  highlight: {
    leafs: [],
    style: {
      fill: "red",
    },
  },
});
const getInitOrdinaryTree = () => {
  nextTick(() => {
    if (treeOridinaryConfig.layout == "radial") {
      treeORDINARY = new phyloscape.InitRadialStructure(
        "#tree-ordinary",
        treeOridinaryConfig
      );
    } else {
      treeORDINARY = new phyloscape.InitTreeStructure(
        "#tree-ordinary",
        treeOridinaryConfig
      );
    }
  });
};
const initPage = () => {
  initresetTree();
};
const resetPage = () => {
  panel1curtype.value = resetparams.treetype ?? panel1curtype.value;
  initresetTree();
};
// 重置树
const initresetTree = () => {
  openLoading();
  if (panel1curtype.value == "ordinary" && treeOridinaryConfig.id) {
    setTree({ id: treeOridinaryConfig.id });
  } else if (panel1curtype.value == "big" && treeBigConfig.id) {
    setTree({ id: treeBigConfig.id });
  } else {
    ElMessage({
      message: t("application.curnotreefile"),
      type: "warning",
    });
  }
};
const setTree = (params) => {
  jhscentent(params).then((res) => {
    closeLoading();
    if (res.code == "0") {
      if (panel1curtype.value == "big") {
        treeBigConfig.source = res.content;
        getInitBigTree();
        if (shareid.value || selectdemo1.value) {
          getTreeBigTrans();
        }
      } else if (panel1curtype.value == "ordinary") {
        treeOridinaryConfig.content = res.content;
        getInitOrdinaryTree();
        if (shareid.value || selectdemo1.value) {
          getTreeOrdinaryTrans();
        }
      }
    }
  });
};
// 树部分功能  初始化树
const uploadimghandleChange = (file) => {
  if (file.size > maxFileSize) {
    ElMessage({
      message: t("application.curfileexceed"),
      type: "error",
    });
    return false;
  } else {
    shareform.img = file.raw;
  }
};
// 分享
const openShare = () => {
  // 未登录提示
  if (localStorage.getItem("token")) {
    if (shareid.value) {
      if (treeBigConfig.id || treeOridinaryConfig.id) {
        dialogShareFormVisible.value = true;
      } else {
        ElMessage({
          message: t("application.curuploadtreeormapfile"),
          type: "warning",
        });
      }
    } else {
      dialogShareFormVisible.value = true;
    }
  } else {
    // ElMessage({
    //   message: t('common.nologin'),
    //   type: "warning",
    // })
    // 未登录判断
    userinfo().then((res) => {
      userinfo.$patch({
        email: res.email,
        username: res.username,
      });
    });
  }
};
let tree_file_cfg = {};
// 保存分享
const saveShare = async (formEl) => {
  let treeid = "";
  let tree_cfg = {};

  if (panel1curtype.value == "ordinary") {
    treeid = treeOridinaryConfig.id;
    tree_cfg = treeOridinaryConfig;
    tree_file_cfg = treeOridinaryConfig.tree_file_cfg;
    let nodessymbol = {
      show: treeOridinaryConfig.nodes.symbol.show,
      type: treeOridinaryConfig.nodes.symbol.type, //pie circle bar
      mark: treeOridinaryConfig.nodes.symbol.mark,
      dx: treeOridinaryConfig.nodes.symbol.dx,
      dy: treeOridinaryConfig.nodes.symbol.dy,
      size: treeOridinaryConfig.nodes.symbol.size,
      distance: treeOridinaryConfig.nodes.symbol.distance,
      maxLength: treeOridinaryConfig.nodes.symbol.maxLength,
      innerRadius: treeOridinaryConfig.nodes.symbol.innerRadius,
      outerRadius: treeOridinaryConfig.nodes.symbol.outerRadius,
      style: JSON.parse(JSON.stringify(treeOridinaryConfig.nodes.symbol.style)),
    };
    // 将上传的文件置空
    tree_cfg.highlight.leafs = [];
    tree_cfg.content = "";
    tree_cfg.leafs.data = {};
    tree_cfg.sign.data = [];
    tree_cfg.tooltip.data = {};
    // tree_cfg.collapse.data = [];
    tree_cfg.legend.data = [];
    tree_cfg.division.data = [];
    tree_cfg.nodes.symbol = JSON.parse(JSON.stringify(nodessymbol));
  } else if (panel1curtype.value == "big") {
    treeid = treeBigConfig.id;
    tree_cfg = treeBigConfig;
    // delete tree_cfg.source;
    tree_cfg.source = "";
  }
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      let formData = new FormData();
      formData.append("img", shareform.img);
      formData.append("title", shareform.title);
      formData.append("des", shareform.des);
      formData.append("type", shareform.type);
      formData.append("tree", treeid);
      formData.append("tree_cfg", JSON.stringify(tree_cfg));
      formData.append("tree_type", panel1curtype.value);
      formData.append("tree_file_cfg", JSON.stringify(tree_file_cfg));
      if (shareid.value && !fromtype.value) {
        formData.append("id", shareid.value);
      }
      jhssave(formData).then((res) => {
        if (res.code == "0") {
          ElMessage({
            message: t("application.cursharesuccess"),
            type: "success",
          });
          dialogShareFormVisible.value = false;
          router.push({
            path: "/gallery",
          });
        } else {
          ElMessage({
            message: res.msg,
            type: "success",
          });
          dialogShareFormVisible.value = false;
        }
      });
    } else {
      console.log("error submit!");
    }
  });
};
const curPanel = (num) => {
  ElMessageBox.confirm(t("application.curpanelchangetips"), "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      curpanelnum.value = num;
      if (curpanelnum.value == 1) {
        router.push({
          path: "/applicationone",
        });
      } else if (curpanelnum.value == 2) {
        router.push({
          path: "/applicationtwo",
        });
      } else {
        router.push({
          path: "/application",
          query: {
            panelnum: num,
          },
        });
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "canceled",
      });
    });
};
const setTreeBigConfig = () => {
  treeBIG.setProps({ type: treeBigConfig.type });
  treeBIG.setProps({ fontColour: treeBigConfig.fontColour });
  treeBIG.setProps({ fontFamily: treeBigConfig.fontFamily });
  treeBIG.setProps({ fontSize: treeBigConfig.fontSize });
  treeBIG.setProps({ padding: treeBigConfig.padding });
  treeBIG.setProps({ zoom: treeBigConfig.zoom });
  treeBIG.setProps({ alignLabels: treeBigConfig.alignLabels });
  treeBIG.setProps({ alignLineColour: treeBigConfig.alignLineColour });
  treeBIG.setProps({ alignLineWidth: treeBigConfig.alignLineWidth });
  treeBIG.setProps({ alignLineOpacity: treeBigConfig.alignLineOpacity });
  treeBIG.setProps({ showShapes: treeBigConfig.showShapes });
  treeBIG.setProps({ showShapeBorders: treeBigConfig.showShapeBorders });
  treeBIG.setProps({ shapeBorderAlpha: treeBigConfig.shapeBorderAlpha });
  treeBIG.setProps({ shapeBorderWidth: treeBigConfig.shapeBorderWidth });
  treeBIG.setProps({ fillColour: treeBigConfig.fillColour });
  treeBIG.setProps({ nodeSize: treeBigConfig.nodeSize });
  treeBIG.setProps({ nodeShape: treeBigConfig.nodeShape });
  treeBIG.setProps({ showLabels: treeBigConfig.showLabels });
  treeBIG.setProps({ showBranchLengths: treeBigConfig.showBranchLengths });
  treeBIG.setProps({ branchZoom: treeBigConfig.branchZoom });
  treeBIG.setProps({ haloRadius: treeBigConfig.haloRadius });
  treeBIG.setProps({ haloWidth: treeBigConfig.haloWidth });
  treeBIG.setProps({ highlightColour: treeBigConfig.highlightColour });
  treeBIG.setProps({ highFillColour: treeBigConfig.highFillColour });
};
const panel1getBigConfig = (data) => {
  for (const key in data) {
    treeBigConfig[key] = data[key];
  }
  if (treeBigConfig.source) {
    getInitBigTree();
  }
  setTreeBigConfig();
};
const panel1getOrdinaryConfig = (data) => {
  for (const key in data) {
    treeOridinaryConfig[key] = data[key];
    if (key == "tree_file_cfg") {
      for (let i in data["tree_file_cfg"]) {
        if (data["tree_file_cfg"][i]) {
          treeOridinaryConfig["tree_file_cfg"][i] = data["tree_file_cfg"][i];
        } else {
          treeOridinaryConfig["tree_file_cfg"][i] = "";
        }
      }
    }
  }
  if (treeOridinaryConfig.content) {
    getInitOrdinaryTree();
  }
};
const treebigMessage = ref({});
const getTreeBigTrans = () => {
  treebigMessage.value = {
    id: shareid.value,
    ctype: "tree",
  };
};
const treeordinaryMessage = ref({});
const getTreeOrdinaryTrans = () => {
  treeordinaryMessage.value = {
    id: shareid.value,
    ctype: "tree",
  };
};
const panel1curtype = ref("ordinary");
const tabTreeChange = () => {
  if (panel1curtype.value == "ordinary") {
    curdemoopt.value = selectdemoopt1;
    selectdemo1.value = "odemo1"
    getInitOrdinaryTree();
  } else if (panel1curtype.value == "big") {
    curdemoopt.value = selectdemoopt1;
    selectdemo1.value = "ldemo1"
    showselectdemo1()
  }
};
const selectdemo1Change = () => {
  router.push({
    path: "/applicationone",
  });
  showselectdemo1();
};
const showselectdemo1 = () => {
  let params = {
    id: 0,
    panelnum: 1,
    treeid: 0,
    tree_type: "ordinary",
  };
  if (selectdemo1.value == "odemo1") {
    params.id = -1;
    params.treeid = -1;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "odemo2") {
    params.id = 53;
    params.treeid = 1804;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "gorGor6") {
    params.id = 128;
    params.treeid = 2525;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "oryCun2") {
    params.id = 127;
    params.treeid = 2521;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "oviAri4") {
    params.id = 126;
    params.treeid = 2519;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "pteVam1") {
    params.id = 125;
    params.treeid = 2517;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "rheMac10") {
    params.id = 124;
    params.treeid = 2515;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "rn7") {
    params.id = 123;
    params.treeid = 2513;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "sacCer3") {
    params.id = 122;
    params.treeid = 2510;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "susScr11") {
    params.id = 121;
    params.treeid = 2508;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "xenTro10") {
    params.id = 120;
    params.treeid = 2506;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "mm39") {
    params.id = 119;
    params.treeid = 2504;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "loxAfr3") {
    params.id = 118;
    params.treeid = 2502;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "hs1") {
    params.id = 117;
    params.treeid = 2500;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "galGal6") {
    params.id = 116;
    params.treeid = 2496;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "felCat9") {
    params.id = 115;
    params.treeid = 2494;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "eriEur2") {
    params.id = 114;
    params.treeid = 2492;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "equCab3") {
    params.id = 113;
    params.treeid = 2490;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "dm6") {
    params.id = 112;
    params.treeid = 2488;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "danRer11") {
    params.id = 111;
    params.treeid = 2482;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "ce11") {
    params.id = 110;
    params.treeid = 2480;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "bosTau9") {
    params.id = 109;
    params.treeid = 2468;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "canFam6") {
    params.id = 107;
    params.treeid = 2474;
    selectdemo1Int(params);
  } else if (selectdemo1.value == "ldemo1") {
    params.id = 300;
    params.treeid = 3540;
    params.tree_type = "big";
    selectdemo1Int(params);
  } else {
    location.reload();
  }
};
const selectdemo1Int = (params) => {
  shareid.value = params.id;
  if (params.id) {
    panel1curtype.value = params.tree_type;
    curpanelnum.value = params.panelnum;
    if (panel1curtype.value == "big") {
      treeBigConfig.id = params.treeid;
    } else if (panel1curtype.value == "ordinary") {
      treeOridinaryConfig.id = params.treeid;
    }
    initPage();
  }
};
const shareidselectValue = (value) => {
  switch (value) {
    case "128":
      selectdemo1.value = "gorGor6";
      break;
    case "127":
      selectdemo1.value = "oryCun2";
      break;
    case "126":
      selectdemo1.value = "oviAri4";
      break;
    case "125":
      selectdemo1.value = "pteVam1";
      break;
    case "124":
      selectdemo1.value = "rheMac10";
      break;
    case "123":
      selectdemo1.value = "rn7";
      break;
    case "122":
      selectdemo1.value = "sacCer3";
      break;
    case "121":
      selectdemo1.value = "susScr11";
      break;
    case "120":
      selectdemo1.value = "xenTro10";
      break;
    case "119":
      selectdemo1.value = "mm39";
      break;
    case "118":
      selectdemo1.value = "loxAfr3";
      break;
    case "117":
      selectdemo1.value = "hs1";
      break;
    case "116":
      selectdemo1.value = "galGal6";
      break;
    case "115":
      selectdemo1.value = "felCat9";
      break;
    case "114":
      selectdemo1.value = "eriEur2";
      break;
    case "113":
      selectdemo1.value = "equCab3";
      break;
    case "112":
      selectdemo1.value = "dm6";
      break;
    case "111":
      selectdemo1.value = "danRer11";
      break;
    case "110":
      selectdemo1.value = "ce11";
      break;
    case "109":
      selectdemo1.value = "bosTau9";
      break;
    case "107":
      selectdemo1.value = "canFam6";
      break;
    default:
      selectdemo1.value = "";
      break;
  }
};
const startIntro = () => {
  const intro = introJs();
  intro.setOptions({
    prevLabel: "Prev",
    nextLabel: "Next",
    skipLabel: "Skip",
    doneLabel: "Done",
    // 当前引导页只展示一次，设置dontShowAgain:true即可，默认提示语是英文的，dontShowAgainLabel可自定义设置，之后不在展示，会用cookie存储判断，可设置 名称及有效期
    // dontShowAgain: true,
    // dontShowAgainLabel: '当前引导页提示后，不在显示',
    tooltipClass: "intro-tooltip" /* 引导说明文本框的样式 */,
    exitOnEsc: true /* 是否使用键盘Esc退出 */,
    exitOnOverlayClick: false /* 是否允许点击空白处退出 */,
    keyboardNavigation: true /* 是否允许键盘来操作 */,
    showBullets: false /* 是否显示小圆点 */,
    showStepNumbers: true /* 是否显示数字 */,
    showProgress: false /* 是否显示进度条 */,
    scrollToElement: true /* 是否滑动到高亮的区域 */,
    overlayOpacity: 0.65, // 遮罩层的透明度 0-1之间
    positionPrecedence: [
      "bottom",
      "top",
      "right",
      "left",
    ] /* 当位置选择自动的时候，位置排列的优先级 */,
    disableInteraction: true /* 是否禁止与元素的相互关联 */,
    hidePrev: false /* 是否在第一步隐藏上一步 */,
    hideNext: false /* 是否在最后一步隐藏下一步 */,
    steps: [
      {
        element: firststep.value,
        intro: "1.Please select a panel",
      },
      {
        // element 选中第一个el-collapse-item
        element: document.querySelector(
          ".collapsewrap .el-collapse-item:nth-child(1)"
        ),
        intro: "2.Upload a tree",
      },
      {
        // 选择collapsewrap下除了第一个外的el-collapse-item
        element: thirdstep.value,
        intro: "3.Edit and design your tree",
      },
      // {
      //   element: fourthstep.value,
      //   intro: "4.Select and set plugin",
      // },
      // {
      //   element: fifthstep.value,
      //   intro: '5.Show a demo',
      // },
      {
        element: sixthstep.value,
        intro: "4.Share your tree",
      },
    ],
  });
  intro.start(); // 开始引导
};
onMounted(() => {
  //如果是gallery传过来的值获取
  if (route.query.id) {
    shareid.value = route.query.id;
    fromtype.value = route.query.from;
    panel1curtype.value = route.query.tree_type;
    shareidselectValue(shareid.value);
    curpanelnum.value = route.query.panelnum ? route.query.panelnum : 1;
    if (panel1curtype.value == "big") {
      treeBigConfig.id = route.query.treeid;
    } else if (panel1curtype.value == "ordinary") {
      treeOridinaryConfig.id = route.query.treeid;
    }

    resetparams.treeid = route.query.treeid;
    resetparams.treetype = route.query.tree_type;

    // 得到树数据
    setTimeout(() => {
      initPage();
    }, 2000);
  } else {
    getInitOrdinaryTree();
    if (selectdemo1.value) {
      showselectdemo1();
    }
  }
});
</script>

<style lang="scss" scoped>
.appmenu {
  border-bottom: 1px solid #ccc;

  ul,
  li {
    list-style: none;
    padding: 0;
    margin: 0;

    .el-image {
      width: 30px;
      height: 30px;
    }

    .active {
      border: 2px dotted #ccc;
    }

    .btn {
      padding: 0;
      margin: 0;
      height: 30px;
      border: 0;

      .el-image {
        width: 30px;
        height: 30px;
      }
    }
  }

  ul {
    display: flex;
    margin: 5px;

    li {
      cursor: pointer;
      height: 30px;
      width: 30px;
      padding: 5px;
      border: 2px solid white;
    }
  }

  .right12 {
    display: flex;
    align-items: center;
    justify-content: end;

    .resetbtn {
      margin-left: 20px;
      cursor: pointer;
    }
  }

  .sharebtn {
    box-sizing: border-box;
    margin-left: 20px;
    margin-right: 10px;
    width: 70px;
    float: right;

    .el-button {
      width: 70px;
      color: white;
      line-height: auto;
    }
  }
}

.applicationwrap {
  min-height: calc(100vh - 114px);
  display: flex;

  .el-image {
    width: 30px;
    float: right;
    cursor: pointer;
  }

  .treeindexwrap {
    :deep(.el-tabs__item) {
      width: 148.5px;
      border: 0;
    }

    :deep(.el-tabs__content) {
      padding: 0;
    }
  }

  .el-collapse-item__content {
    padding-bottom: 10px;
  }

  .firstline {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 2px dotted #ccc;

    label {
      width: 20px;
      padding-right: 5px;
    }

    .el-select {
      width: 60%;
    }
  }

  .leftconfig {
    width: 300px;
    height: calc(100vh - 114px);
    border-right: 1px solid #ccc;
    overflow: auto;
  }

  .leftconfighide {
    width: 30px;
    height: calc(100vh - 118px);
    border-right: 1px solid #ccc;
    overflow: auto;
  }

  .toptree {
    box-sizing: border-box;
    padding: 10px 2px;

    .title {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: bold;
      padding-bottom: 10px;

      span {
        flex: 1;
      }

      .el-image {
        cursor: pointer;
        width: 20px;
        padding-right: 10px;
      }
    }
  }

  .panelwrap {
    flex: 1;
    height: calc(100vh - 118px);
    width: calc(100vw - 300px);

    .tips {
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #bbb;
      transform: translate(0, -50%);
      top: 50%;
      position: relative;
    }

    .panel {
      width: 100%;
    }

    .panel1 {
      #tree-ordinary,
      #tree-big {
        height: calc(100vh - 118px);
        overflow-y: scroll;
        box-sizing: border-box;
      }
    }
  }
}

.bottomwrap {
  display: none;
}
</style>
