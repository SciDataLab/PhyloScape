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
            <el-button class="btn"  :disabled="curpanelnum == item.num">
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
        <div ref="fifthstep" class="rselect">
        <el-select
          style="width: 350px"
          placeholder="Select demo"
          v-model="selectdemo2"
          @change="changeDemo"
          clearable
        >
          <el-option
            v-for="item in selectdemoopt2"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
        <div class="resetbtn">
          <!-- <el-button @click="takeSnapshot('oIframe2')">Take Snapshot</el-button> -->
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
        <div class="bottommap" ref="fourthstep">
          <div class="title">
            <el-image :src="mapicon"></el-image>
            {{ $t("application.maptitle") }}
          </div>
          <el-collapse v-model="activeNames12" accordion>
            <el-collapse-item
              :title="$t('application.panel2con')"
              name="22"
              v-show="panel2show"
            >
              <el-row class="line">
                <el-col :span="12">
                  <label>{{ $t("application.pluginsel") }}</label>
                </el-col>
                <el-col :span="12">
                  <el-select v-model="panel2curtype" @click="panel2clearUpload">
                    <el-option
                      v-for="item in apptypeopts"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.value == 0"
                    ></el-option>
                  </el-select>
                </el-col>
              </el-row>
              <div class="line">
                <el-row>
                  <el-col :span="12">
                    <label>{{ $t("application.mapfileupload") }}</label>
                  </el-col>
                  <el-col :span="12">
                    <el-upload
                      ref="mapupload"
                      class="upload-demo"
                      accept=".csv,.tsv,.zip"
                      :max-size="maxFileSize"
                      :limit="1"
                      :on-exceed="handlePanel2MapExceed"
                      :on-change="handlePanel2MapChange"
                      :auto-upload="false"
                    >
                      <el-button size="small" color="#42bec3">
                        {{ $t("application.mapbtn") }}
                      </el-button>
                    </el-upload>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" style="text-indent: 2em">{{
                    $t("application.downloadtemplate")
                  }}</el-col>
                  <el-col :span="12">
                    <a :href="pluginurl[panel2curtype]">
                      <el-button
                        size="small"
                        color="#42bec3"
                        :icon="Download"
                      />
                    </a>
                  </el-col>
                </el-row>
              </div>

              <div class="pluginconfig">
                <mapcolor-config
                  v-show="panel2curtype == '1'"
                  @colorTrans="panel2getValue"
                  :mapcolorMessage="mapcolorMessage"
                ></mapcolor-config>
                <maptransmission-config
                  v-show="panel2curtype == '2'"
                  @transmissionTrans="panel2getValue"
                  :maptransmissionMessage="maptransmissionMessage"
                >
                </maptransmission-config>
                <mapdensity-config
                  v-show="panel2curtype == '3'"
                  @densityTrans="panel2getValue"
                  :mapdensityMessage="mapdensityMessage"
                >
                </mapdensity-config>
                <mpienetwork-config
                  v-show="panel2curtype == '4'"
                  @pienetworkTrans="panel2getValue"
                  :mpienetworkMessage="mpienetworkMessage"
                ></mpienetwork-config>
                <mfreqstack-config
                  v-show="panel2curtype == '5'"
                  @freqstackTrans="panel2getValue"
                  :mfreqstackMessage="mfreqstackMessage"
                ></mfreqstack-config>
                <mgroupbar-config
                  v-show="panel2curtype == '6'"
                  @groupbarTrans="panel2getValue"
                  :mgroupbarMessage="mgroupbarMessage"
                ></mgroupbar-config>
                <macmap-config
                  v-show="panel2curtype == '7'"
                  @acmapTrans="panel2getValue"
                  :macmapMessage="macmapMessage"
                ></macmap-config>

                <mheatmap-config
                  v-show="panel2curtype == '9'"
                  @heatmapTrans="panel2getValue"
                  :mheatmapMessage="mheatmapMessage"
                ></mheatmap-config>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
      <div v-show="!leftshow">
        <el-image :src="open" @click="openLeftConfig"></el-image>
      </div>
    </div>
    <div class="panelwrap" id="panel2download">
      <div class="panel">
        <div class="panel1">
          <div
            class="tips"
            v-if="panel1curtype == 'ordinary' && !treeOridinaryConfig.content"
          >
            <el-image class="panel1tree" :src="tree"></el-image>
            <p>{{ $t("application.uploadtreedatashow") }}</p>
          </div>
          <div
            class="tips"
            v-else-if="panel1curtype == 'big' && !treeBigConfig.source"
          >
            <el-image class="panel1tree" :src="tree"></el-image>
            <p>{{ $t("application.uploadtreedatashow") }}</p>
          </div>
          <div id="tree-ordinary" v-show="panel1curtype == 'ordinary'"></div>
          <div id="tree-big" v-show="panel1curtype == 'big'"></div>
        </div>
        <div class="panel2" v-show="panel2show" ref="panel2">
          <iframe
            id="oIframe2"
            class="oIframe2"
            frameborder="no"
            ref="oIframe2"
            :src="geoUrl + plugintypevalue[panel2curtype]"
          ></iframe>
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
            :on-change="sharehandleChange"
            accept=".png,.jpg"
            :limit="1"
            :auto-upload="false"
          >
            <el-button color="#42bec3" style="color: white"
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
            color="#42bec3"
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
import { ref, reactive, nextTick, onMounted, onBeforeUnmount } from "vue";
import { Download } from "@element-plus/icons-vue";
import introJs from "intro.js";
import "intro.js/introjs.css"; // 引入 intro.js 的样式
import {
  jhsupload,
  jhsprunetree,
  jhscounty,
  jhscentent,
  jhssave,
  jhscfg,
  jhslineage,
  jhsdrawmap,
} from "@/api/application/index.js";
import { ElMessage, ElMessageBox } from "element-plus";
import mapicon from "@/assets/application/mapicon.png";
import treeicon from "@/assets/application/treeicon.png";
import open from "@/assets/application/open.png";
import close from "@/assets/application/close.png";
import tree from "@/assets/application/tree.png";
import html2canvas from "html2canvas";
import {
  maxFileSize,
  webUrl,
  geoUrl,
  panelli,
  plugintypevalue,
  apptypeopts,
  sharetypeopts,
  selectdemoopt2,
  openLoading,
  closeLoading,
  collectChildrenNames,
  sharerules,
} from "@/utils/utils.js";
import { useRouter, useRoute } from "vue-router";
import MapcolorConfig from "./components/mapcolorconfig.vue";
import MaptransmissionConfig from "./components/maptransmissionconfig.vue";
import MapdensityConfig from "./components/mapdensityconfig.vue";
import MpienetworkConfig from "./components/mpienetworkconfig.vue";
import MfreqstackConfig from "./components/mfreqstackconfig.vue";
import MgroupbarConfig from "./components/mgroupbarconfig.vue";
import MacmapConfig from "./components/macmapconfig.vue";
import MheatmapConfig from "./components/mheatmapconfig.vue";

import TreeOrdinary from "./components/treeordinary.vue";
import TreeBig from "./components/treebig.vue";
import { userinfo } from "@/api/accounts";
import { useI18n } from "vue-i18n";
import { useUserInfo } from "@/store/userinfo.js";
import domtoimage from "dom-to-image";

const firststep = ref(null);
const secondstep = ref(null);
const thirdstep = ref(null);
const fourthstep = ref(null);
const fifthstep = ref(null);
const sixthstep = ref(null);

const guserinfo = useUserInfo();
const { t } = useI18n();
const panel2download = ref(null);
const mapcolorMessage = ref({});
const maptransmissionMessage = ref({});
const mapdensityMessage = ref({});
const mpienetworkMessage = ref({});
const mfreqstackMessage = ref({});
const mgroupbarMessage = ref({});
const macmapMessage = ref({});
const mheatmapMessage = ref({});

const router = useRouter();
const route = useRoute();
const curpanelnum = ref(2);
const selectdemo2 = ref("");
const panel2show = ref(true);
const panel2curtype = ref(0);
const dialogShareFormVisible = ref(false);
const cwidth = ref(0);
const cheight = ref(0);
const resetparams = reactive({
  treeid: null,
  treetype: null,
  mapid: null,
  maptype: null,
});
const pluginurl = {
  1: webUrl + "jhs/download/1940",
  2: webUrl + "jhs/download/1938",
  3: webUrl + "jhs/download/1936",
  4: webUrl + "jhs/download/1939",
  5: webUrl + "jhs/download/1934",
  6: webUrl + "jhs/download/1935",
  7: webUrl + "jhs/download/1937",
  8: webUrl + "jhs/download/0",
  9: webUrl + "jhs/download/3281",
};
const shareform = reactive({
  img: "",
  title: "",
  des: "",
  type: [],
  tree: "",
  map: "",
});

let oIframe2 = ref(null);
let panel2 = ref(null);
const formLabelWidth = "140px";
const shareid = ref(0);
const fromtype = ref(null);
const shareformRef = ref(null);
const mapupload = ref(null);
const panel2valueid = ref(0);
const activeNames12 = ref(["22"]);
let treeBIG = "";
let treeBigConfig = reactive({
  id: "",
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
const leftshow = ref(true);
const openLeftConfig = () => {
  leftshow.value = true;
};
const closeLeftConfig = () => {
  leftshow.value = false;
};
const curids = ref([]);
const changeMapPlugin = ({ nodes }) => {
  curids.value = Array.from(nodes);
  if (panel2valueid.value) {
    if (curpanelnum.value == 2) {
      drawPage(
        {
          ids: Array.from(nodes),
          map_id: panel2valueid.value,
          gla_id: shareid.value,
          ftype: panel2curtype.value,
          mapconfig: panel2config.value,
        },
        "2"
      );
    }
  } else {
    ElMessage({
      message: t("application.curuploadmapfile"),
      type: "warning",
    });
  }
};
const treeBigNodes = ref([]);
const getInitBigTree = () => {
  nextTick(() => {
    treeBIG = new PhyloScapeGL(
      document.querySelector("#tree-big"),
      treeBigConfig
    );

    treeBIG.onClick = (node, e) => {
      let leafs = treeBIG.getNodeLeafs(node);
      treeBigNodes.value = leafs.map((leaf) => {
        return leaf.label;
      });
      treeBIG.setProps({
        highlightedIds: leafs.map((node) => node.id),
      });
      changeMapPlugin({ nodes: treeBigNodes.value });
    };
  });
  // treeBIG.onHover = (node, e) => {
  // };
};
let treeORDINARY = "";
let treeOridinaryConfig = reactive({
  content: "",
  leafs: { show: true },
  position: [20, 20],
  separation: 35,
  language: "zh",
  scale: 1,
  rotationAngle: -1,
  isPhylogram: true,
  isNodesShape: false,
  isWheelZoom: true,
  nodes: {
    symbol: {
      show: false,
    },
  },
  highlight: {
    leafs: [],
    style: {
      fill: "red",
    },
  },
});
let treeOrdinaryNodes = ref([]);
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
    treeORDINARY.onClick = (data) => {
      treeOridinaryConfig.highlight.leafs = [];
      // if (data.type == "link") {
      //   treeOrdinaryNodes.value = collectChildrenNames(data.data.target.data);
      // } else if (data.type == "leaf") {
      //   if (treeOridinaryConfig.layout == "tree") {
      //     treeOrdinaryNodes.value = collectChildrenNames(data.data.data);
      //   } else if (treeOridinaryConfig.layout == "radial") {
      //     treeOrdinaryNodes.value = collectChildrenNames(data.data.target.data);
      //   }
      // } else if (data.type == "node") {
      //   treeOrdinaryNodes.value = collectChildrenNames(data.data.target.data);
      // }
      if (data.type == "leaf") {
        if (treeOridinaryConfig.layout == "tree") {
          treeOrdinaryNodes.value = collectChildrenNames(data.data.data);
        } else if (treeOridinaryConfig.layout == "radial") {
          treeOrdinaryNodes.value = collectChildrenNames(data.data.target.data);
        }
      } else {
        treeOrdinaryNodes.value = collectChildrenNames(data.data.target.data);
      }
      if (treeOrdinaryNodes.value) {
        treeOridinaryConfig.highlight.leafs = treeOrdinaryNodes.value;
        getInitOrdinaryTree();
        changeMapPlugin({ nodes: treeOrdinaryNodes.value });
      }
    };
  });
};
const initPage = () => {
  initresetTree();
  initMap();
  if (shareid.value) {
    getShareMapConfig();
  }
};
// 重置
const resetPage = () => {
  curids.value = [];
  panel1curtype.value = resetparams.treetype ?? panel1curtype.value;
  initresetTree();
  resetMap();
  if (shareid.value) {
    getShareMapConfig();
  }
};
const initresetTree = () => {
  if (panel1curtype.value == "ordinary" && treeOridinaryConfig.id) {
    treeOrdinaryNodes.value = [];
    treeOridinaryConfig.highlight.leafs = [];
    setTree({ id: resetparams.treeid ?? treeOridinaryConfig.id });
  } else if (panel1curtype.value == "big" && treeBigConfig.id) {
    treeBigNodes.value = [];
    setTree({ id: resetparams.treeid ?? treeBigConfig.id });
  } else {
    ElMessage({
      message: t("application.curnotreefile"),
      type: "warning",
    });
  }
};
const setTree = (params) => {
  jhscentent(params)
    .then((res) => {
      if (res.code == "0") {
        // closeLoading();
        if (panel1curtype.value == "big") {
          treeBigConfig.source = res.content;
          getInitBigTree();
          if (shareid.value || selectdemo2.value) {
            getTreeBigTrans();
          }
        } else if (panel1curtype.value == "ordinary") {
          treeOridinaryConfig.content = res.content;
          getInitOrdinaryTree();
          if (shareid.value || selectdemo2.value) {
            getTreeOrdinaryTrans();
          }
        }
      } else {
        closeLoading();
      }
    })
    .catch((error) => {
      closeLoading();
    });
};
const initMap = () => {
  openLoading();
  drawPage(
    {
      ids:
        panel1curtype.value == "ordinary"
          ? Array.from(treeOrdinaryNodes.value)
          : Array.from(treeBigNodes.value),
      map_id: panel2valueid.value,
      gla_id: shareid.value,
      ftype: panel2curtype.value,
    },
    "2"
  );
};
const resetMap = () => {
  panel2valueid.value = resetparams.mapid ?? panel2valueid.value;
  panel2curtype.value = resetparams.maptype ?? panel2curtype.value;
  drawPage(
    {
      ids:
        panel1curtype.value == "ordinary"
          ? Array.from(treeOrdinaryNodes.value)
          : Array.from(treeBigNodes.value),
      map_id: resetparams.mapid ?? panel2valueid.value,
      gla_id: shareid.value,
      ftype: resetparams.maptype ?? panel2curtype.value,
    },
    "2"
  );
};
const handlePanel2MapExceed = (files) => {
  mapupload.value.clearFiles();
  nextTick(() => {
    mapupload.value.handleStart(files[0]);
  });
};
const handlePanel2MapChange = (file) => {
  if (file.size > maxFileSize) {
    ElMessage({
      message: t("application.curfileexceed"),
      type: "error",
    });
    return false;
  } else {
    openLoading();
    let mfile = file.raw;
    let formData = new FormData();
    formData.append("ds", mfile);
    jhsupload(formData)
      .then((res) => {
        if (res.code == 0) {
          closeLoading();
          panel2valueid.value = res.id;
          panel2changeType();
        }
      })
      .catch((error) => {
        closeLoading();
      });
  }
};
const drawPage = async (params, panel) => {
  if (params.mapconfig && typeof params.mapconfig.legend == "object") {
    params.mapconfig.legend = params.mapconfig.legend.show;
  }
  openLoading();
  if (params.ftype == 4) {
    params.cwidthheight = {
      cwidth: cwidth.value,
      cheight: cheight.value,
    };
  }
  if (params.ftype == 8) {
    closeLoading();
    let node = params.ids.length > 0 ? params.ids[0] : "";
    let id = params.map_id;
    setTimeout(() => {
      oIframe2.value.contentWindow.postMessage({ id: id, node: node }, "*");
    }, 1000);
  } else {
    await jhsdrawmap(params)
      .then((res) => {
        if (res.code == "0") {
          closeLoading();
          if (panel == 2) {
            setTimeout(() => {
              oIframe2.value.contentWindow.postMessage(res, "*");
            }, 1000);
            //修改了1000
            if (panel2curtype.value == 1) {
              getMapcolorTrans(res.content);
            } else if (panel2curtype.value == 2) {
              getMaptransmissionTrans(res.content);
            } else if (panel2curtype.value == 3) {
              getMapdensityTrans(res.content);
            } else if (panel2curtype.value == 4) {
              getMpienetworkTrans(res.content);
            } else if (panel2curtype.value == 5) {
              getMfreqstackTrans(res.content);
            } else if (panel2curtype.value == 6) {
              getMgroupbarTrans(res.content);
            } else if (panel2curtype.value == 7) {
              getMacmapTrans(res.content);
            } else if (panel2curtype.value == 9) {
              getHeatmapTrans(res.content);
            }
          }
        }
      })
      .catch((error) => {
        closeLoading();
      });
  }
};

let panel_params = [
  mapcolorMessage.value,
  maptransmissionMessage.value,
  mapdensityMessage.value,
  mpienetworkMessage.value,
  mfreqstackMessage.value,
  mgroupbarMessage.value,
  macmapMessage.value,
  mheatmapMessage.value,
];
const getMapcolorTrans = (res) => {
  mapcolorMessage.value = res;
  panel_params[0] = {
    color: mapcolorMessage.value.color,
    legend: mapcolorMessage.value.legend.show,
    maptype: mapcolorMessage.value.maptype,
  };
};
const getMaptransmissionTrans = (res) => {
  maptransmissionMessage.value = res;
  panel_params[1] = {
    color: maptransmissionMessage.value.color,
    legend: maptransmissionMessage.value.legend,
    maptype: maptransmissionMessage.value.maptype,
    zoom: maptransmissionMessage.value.zoom,
  };
};
const getMapdensityTrans = (res) => {
  mapdensityMessage.value = res;
  panel_params[2] = {
    color: mapdensityMessage.value.color,
    legend: mapdensityMessage.value.legend,
    maptype: mapdensityMessage.value.maptype,
    outline: mapdensityMessage.value.outline,
  };
};
const getMpienetworkTrans = (res) => {
  mpienetworkMessage.value = res;
  panel_params[3] = {
    color: mpienetworkMessage.value.color,
    legend: mpienetworkMessage.value.legend,
    maptype: mpienetworkMessage.value.maptype,
    linecurveness: mpienetworkMessage.value.linecurveness,
    linetype: mpienetworkMessage.value.linetype,
    linewidth: mpienetworkMessage.value.linewidth,
    linecolor: mpienetworkMessage.value.linecolor,
  };
};
const getMfreqstackTrans = (res) => {
  mfreqstackMessage.value = res;
  panel_params[4] = {
    color: mfreqstackMessage.value.color,
    legend: mfreqstackMessage.value.legend,
  };
};
const getMgroupbarTrans = (res) => {
  mgroupbarMessage.value = res;
  panel_params[5] = {
    color: mgroupbarMessage.value.color,
    legend: mgroupbarMessage.value.legend,
  };
};
const getMacmapTrans = (res) => {
  macmapMessage.value = res;
  panel_params[6] = {
    circleradius: macmapMessage.value.circleradius,
    color: macmapMessage.value.color,
    legend: macmapMessage.value.legend,
    maptype: macmapMessage.value.maptype,
  };
};
const getHeatmapTrans = (res) => {
  mheatmapMessage.value = res;
  panel_params[8] = {
    legend: mheatmapMessage.value.legend,
    rowname: mheatmapMessage.value.rowname,
    colname: mheatmapMessage.value.colname,
    showtext: mheatmapMessage.value.showtext,
    map_type: mheatmapMessage.value.map_type,
    color: mheatmapMessage.value.color,
    fontsize: mheatmapMessage.value.fontsize,
    bggrid: mheatmapMessage.value.bggrid,
    max: mheatmapMessage.value.max,
    min: mheatmapMessage.value.min,
  };
};
const panel2clearUpload = () => {
  mapupload.value.clearFiles();
};
const panel2changeType = () => {
  drawPage(
    {
      ids:
        panel1curtype.value == "ordinary"
          ? Array.from(treeOrdinaryNodes.value)
          : Array.from(treeBigNodes.value),
      map_id: panel2valueid.value,
      gla_id: shareid.value,
      ftype: panel2curtype.value,
    },
    "2"
  );
};

const handleMessageTwo = (event) => {
  if (event.data.type == "1") {
    getmapcolornodes(event.data.tparams);
  } else if (event.data.type == "2") {
    getmaptransmissionnodes(event.data.tparams);
  } else if (event.data.type == "3") {
    getmapdensity(event.data.tparams);
  } else if (event.data.type == "9") {
    getmheatmap(event.data.tparams);
  }
};
// 2.1mapcolor      根据城市code，得到树的结点
const getmapcolornodes = (tdata) => {
  jhscounty(tdata).then((res) => {
    if (res.code == 0) {
      if (treeOridinaryConfig.id || treeBigConfig.id) {
        if (res.names) {
          prune_tree(res.names);
        } else {
          ElMessage({
            message: t("application.curnonodeinfo"),
            type: "warning",
          });
        }
      } else {
        ElMessage({
          message: t("application.uploadtreefile"),
          type: "warning",
        });
      }
    } else {
      ElMessage({
        message: t("application.curnonodeinfo"),
        type: "warning",
      });
    }
  });
};
// 2.2 maptransmission
const getmaptransmissionnodes = (tdata) => {
  jhslineage(tdata).then((res) => {
    if (res.code == 0) {
      if (treeOridinaryConfig.id || treeBigConfig.id) {
        prune_tree(res.names);
      } else {
        ElMessage({
          message: t("application.uploadtreefile"),
          type: "warning",
        });
      }
    } else {
      ElMessage({
        message: t("application.curnonodeinfo"),
        type: "warning",
      });
    }
  });
};
// 2.3 mapdensity
const getmapdensity = (tdata) => {
  jhslineage(tdata).then((res) => {
    if (res.code == 0) {
      if (treeOridinaryConfig.id || treeBigConfig.id) {
        prune_tree(res.names);
      } else {
        ElMessage({
          message: t("application.uploadtreefile"),
          type: "warning",
        });
      }
    } else {
      ElMessage({
        message: t("application.curnonodeinfo"),
        type: "warning",
      });
    }
  });
};
// 2.4 mheatmap
const getmheatmap = (tdata) => {
  // 得到热力图部分的结点信息，并在树部分标红
  highlight_tree(tdata.names);
};
// 3.1 标红树状图
const highlight_tree = (names) => {
  nextTick(() => {
    treeOridinaryConfig.highlight.leafs = names;
    getInitOrdinaryTree();
  });
};

// 3.根据树的结点，裁切该树
const prune_tree = (names) => {
  if (panel1curtype.value == "ordinary") {
    if (treeOridinaryConfig.id) {
      getJhsPrunetree({ id: treeOridinaryConfig.id, names: names });
    }
    treeOridinaryConfig.highlight.leafs = [];
    getInitOrdinaryTree();
  } else if (panel1curtype.value == "big" && treeBigConfig.id) {
    getJhsPrunetree({ id: treeBigConfig.id, names: names });
    treeBIG.setProps({ highlightedIds: [] });
  } else {
    ElMessage({
      message: t("application.curnotreefile"),
      type: "warning",
    });
  }
  changeMapPlugin({ nodes: names.split(",") });
};
const getJhsPrunetree = (params) => {
  jhsprunetree(params).then((res) => {
    if (res.code == "0") {
      if (panel1curtype.value == "big") {
        treeBigConfig.source = res.tree;
        getInitBigTree();
      } else if (panel1curtype.value == "ordinary") {
        treeOridinaryConfig.content = res.tree;
        getInitOrdinaryTree();
      }
    }
  });
};
const sharehandleChange = (file) => {
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
const openShare = () => {
  if (localStorage.getItem("token")) {
    if (shareid.value) {
      if ((treeBigConfig.id || treeOridinaryConfig.id) && panel2valueid.value) {
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
    userinfo().then((res) => {
      userinfo.$patch({
        email: res.email,
        username: res.username,
      });
    });
  }
};
const saveShare = async (formEl) => {
  let map_id = { panel2valueid: panel2valueid.value };
  let map_type = { panel2curtype: panel2curtype.value };
  let map_cfg = {
    panel2_cfg: panel_params[panel2curtype.value - 1],
  };
  let treeid = "";
  let tree_cfg = {};
  let tree_file_cfg = {};
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
      formData.append("map", JSON.stringify(map_id));
      formData.append("map_cfg", JSON.stringify(map_cfg));
      formData.append("map_type", JSON.stringify(map_type));
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
          router.replace({
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
  }
  getInitOrdinaryTree();
};
let panel2config = ref({});
const panel2getValue = (data) => {
  panel2config.value = { ...data };
  drawPage(
    {
      ids: curids.value,
      map_id: panel2valueid.value,
      ftype: panel2curtype.value,
      mapconfig: panel2config.value,
    },
    "2"
  );
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
    getInitOrdinaryTree();
  } else if (panel1curtype.value == "big") {
    getInitBigTree();
  }
};
const getShareMapConfig = () => {
  let params = {
    id: shareid.value,
    ctype: "map",
  };
  jhscfg(params).then((res) => {
    if (res.code == 0) {
      let panel2_cfg = res.cfg["panel2_cfg"];
      if (panel2curtype.value == 1) {
        mapcolorMessage.value = panel2_cfg;
      } else if (panel2curtype.value == 2) {
        maptransmissionMessage.value = panel2_cfg;
      } else if (panel2curtype.value == 3) {
        mapdensityMessage.value = panel2_cfg;
      } else if (panel2curtype.value == 4) {
        mpienetworkMessage.value = panel2_cfg;
      } else if (panel2curtype.value == 5) {
        mfreqstackMessage.value = panel2_cfg;
      } else if (panel2curtype.value == 6) {
        mgroupbarMessage.value = panel2_cfg;
      } else if (panel2curtype.value == 7) {
        macmapMessage.value = panel2_cfg;
      } else if (panel2curtype.value == 9) {
        mheatmapMessage.value = panel2_cfg;
      }
    }
  });
};
const changeDemo = () => {
  router.replace({
    path: "/applicationtwo",
  });
  showselectdemo2();
};
const showselectdemo2 = () => {
  let params = {};
  panel2config.value = {};
  if (selectdemo2.value == "tdemo1") {
    params = {
      id: 149,
      panelnum: 2,
      treeid: 2766,
      tree_type: "ordinary",
      mapid: { panel2valueid: 2807 },
      map_type: { panel2curtype: 1 },
    };
    selectdemo2Int(params);
  } else if (selectdemo2.value == "tdemo2") {
    params = {
      id: 167,
      panelnum: 2,
      treeid: 2819,
      tree_type: "ordinary",
      mapid: { panel2valueid: 2810 },
      map_type: { panel2curtype: 2 },
    };
    selectdemo2Int(params);
  } else if (selectdemo2.value == "tdemo3") {
    params = {
      id: 261,
      panelnum: 2,
      treeid: 3234,
      tree_type: "ordinary",
      mapid: { panel2valueid: 3235 },
      map_type: { panel2curtype: 3 },
    };
    selectdemo2Int(params);
  } else if (selectdemo2.value == "tdemo4") {
    params = {
      id: 263,
      panelnum: 2,
      treeid: 3243,
      tree_type: "ordinary",
      mapid: { panel2valueid: 3245 },
      map_type: { panel2curtype: 4 },
    };
    selectdemo2Int(params);
  } else if (selectdemo2.value == "tdemo5") {
    params = {
      id: 260,
      panelnum: 2,
      treeid: 3227,
      tree_type: "ordinary",
      mapid: { panel2valueid: 3231 },
      map_type: { panel2curtype: 5 },
    };
    selectdemo2Int(params);
  } else if (selectdemo2.value == "tdemo6") {
    params = {
      id: 262,
      panelnum: 2,
      treeid: 3236,
      tree_type: "ordinary",
      mapid: { panel2valueid: 3238 },
      map_type: { panel2curtype: 6 },
    };
    selectdemo2Int(params);
  } else if (selectdemo2.value == "tdemo7") {
    params = {
      id: 161,
      panelnum: 2,
      treeid: 2835,
      tree_type: "ordinary",
      mapid: { panel2valueid: 2836 },
      map_type: { panel2curtype: 7 },
    };
    selectdemo2Int(params);
  } else if (selectdemo2.value == "tdemo8") {
    params = {
      id: 255,
      panelnum: 2,
      treeid: 3203,
      tree_type: "ordinary",
      mapid: { panel2valueid: 3205 },
      map_type: { panel2curtype: 8 },
    };
    selectdemo2Int(params);
  } else if (selectdemo2.value == "tdemo9") {
    params = {
      id: 298,
      panelnum: 2,
      treeid: 3474,
      tree_type: "ordinary",
      mapid: { panel2valueid: 3475 },
      map_type: { panel2curtype: 9 },
    };
    selectdemo2Int(params);
  } else {
    location.reload();
  }
};
const selectdemo2Int = (params) => {
  shareid.value = params.id;
  resetparams.treeid = params.treeid;
  resetparams.treetype = params.tree_type;

  let p2id = params.mapid.panel2valueid;
  let p2type = params.map_type.panel2curtype;

  resetparams.mapid = p2id;
  resetparams.maptype = p2type;

  if (params.id) {
    panel1curtype.value = params.tree_type;
    curpanelnum.value = params.panelnum;
    if (panel1curtype.value == "big") {
      treeBigConfig.id = params.treeid;
    } else if (panel1curtype.value == "ordinary") {
      treeOridinaryConfig.id = params.treeid;
    }
    panel2valueid.value = p2id;
    panel2curtype.value = p2type;
    setTimeout(() => {
      initPage();
    }, 1000);
  }
};

onMounted(() => {
  treeOridinaryConfig.language = localStorage.getItem("language") || "en";
  cwidth.value = panel2.value.offsetWidth;
  cheight.value = panel2.value.offsetHeight;
  if (route.query.id) {
    shareid.value = route.query.id;
    //如果是gallery传过来的值获取
    fromtype.value = route.query.from;
    panel1curtype.value = route.query.tree_type;
    curpanelnum.value = route.query.panelnum ? route.query.panelnum : 2;
    if (panel1curtype.value == "big") {
      treeBigConfig.id = route.query.treeid;
    } else if (panel1curtype.value == "ordinary") {
      treeOridinaryConfig.id = route.query.treeid;
    }
    let mapid = JSON.parse(route.query.mapid);
    let map_type = JSON.parse(route.query.map_type);
    let p2id = mapid ? mapid.panel2valueid : 0;
    let p2type = map_type.panel2curtype ? map_type.panel2curtype : "";
    panel2valueid.value = p2id;
    panel2curtype.value = p2type;

    resetparams.treeid = route.query.treeid;
    resetparams.treetype = route.query.tree_type;
    resetparams.mapid = p2id;
    resetparams.maptype = p2type;
    openLoading();
    setTimeout(() => {
      initPage();
    }, 1000);
  } else {
    getInitOrdinaryTree();
  }
  selectdemo2.value = route.query.selectdemo2;
  if (selectdemo2.value) {
    showselectdemo2();
  }
  //map传过来的id
  watchMap();
});

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
        element: panel1curtype == 'ordinary'? document.querySelector(
          ".treeordinarywrap .el-collapse-item:nth-child(1)"
        ): document.querySelector(
          ".treebigwrap .el-collapse-item:nth-child(1)"
        ),
        intro: "2.Upload a tree",
      },
      {
        // 选择collapsewrap下除了第一个外的el-collapse-item
        element: thirdstep.value,
        intro: "3.Edit and design your tree",
      },
      {
        element: fourthstep.value,
        intro: "4.Select and set plugin",
      },
      // {
      //   element: fifthstep.value,
      //   intro: '5.Show a demo',
      // },
      {
        element: sixthstep.value,
        intro: '5.Share your tree',
      }
    ],
  });

  intro.start(); // 开始引导
};
// 1.监听地图点击事件，获取地图code
const watchMap = () => {
  window.addEventListener("message", handleMessageTwo, false);
};
onBeforeUnmount(() => {
  window.removeEventListener("message", handleMessageTwo, false);
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
    // padding: 10px;
    margin-left:20px;
    margin-right:10px;
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

  .line {
    min-height: 36px;
    line-height: 36px;
    border-left: 4px solid #42bec3;
    padding-left: 5px;
    margin-bottom: 2px;

    .el-button {
      color: white;
    }
  }

  .pluginconfig {
    width: 95%;
    margin-left: 5%;

    :deep(.el-form-item) {
      font-size: 12px !important;
    }

    :deep(.el-form-item__label) {
      font-size: 12px !important;
    }
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
    height: calc(100vh - 120px);
    border-right: 1px solid #ccc;
    overflow: auto;
  }

  .leftconfighide {
    width: 30px;
    height: calc(100vh - 120px);
    border-right: 1px solid #ccc;
    overflow: auto;
  }

  .collapsewrap {
    .slider {
      display: flex;
      align-items: center;
    }

    :deep(.el-slider) {
      width: 80%;
      padding-left: 5px;
    }

    span {
      width: 30px;
      padding-left: 10px;
      font-size: 14px;
      color: #fdae61;
      font-weight: bold;
    }
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

    .tips {
      font-size: 12px;
      color: red;
      text-align: right;
    }
  }

  .bottommap {
    box-sizing: border-box;
    padding: 10px;

    .title {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: bold;
      padding-bottom: 10px;

      .el-image {
        width: 20px;
        padding-right: 10px;
      }
    }

    .tips {
      font-size: 12px;

      span:first-child {
        display: inline-block;
        width: 40%;
        font-weight: bold;
        cursor: pointer;
        border: 1px solid #ddd;
        text-align: center;

        .downbtn {
          background: none;
          color: black;
          border: none;
        }
      }

      span:last-child {
        text-align: right;
        width: 58%;
        display: inline-block;
        color: red;
      }
    }

    .pluginsel {
      display: flex;
      padding-bottom: 5px;

      label {
        color: #606266;
        font-size: 14px;
        padding: 0 12px 0 0;
        width: 70px;
      }

      .el-select {
      }
    }
  }

  .centertree {
    box-sizing: border-box;
    flex: 1;
    border-right: 1px solid #ccc;
    padding: 20px;

    #tree-gl {
      min-height: calc(100vh - 98px);
    }
  }

  .rightmap {
    flex: 1;
    height: calc(100vh - 58px);

    iframe {
      width: 100%;
      height: calc(100vh - 58px);
    }
  }

  .panelwrap {
    flex: 1;
    height: calc(100vh - 114px);
    width: calc(100vw - 300px);
    overflow: auto;

    .selectposition {
      width: 100%;
      text-align: right;
    }

    .tips {
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #bbb;
      transform: translate(0, -50%);
      top: 50%;
      position: absolute;

      p {
        margin-top: 40px;
      }
    }

    .panel {
      display: flex;
      height: calc(100vh - 114px);

      .panel1,
      .panel2 {
        flex: 1;
      }

      .panel1 {
        position: relative;

        .panel1tree {
          height: 30px;
          position: absolute;
          left: 50%;
          transform: translate(-50%);
        }

        #tree-ordinary,
        #tree-big {
          height: calc(100vh - 120px);
          box-sizing: border-box;
          overflow-y: hidden;
        }
      }

      .panel2 {
        // border-left: thin solid rgb(187, 187, 187);

        .oIframe2 {
          height: calc(100vh - 120px);
        }
      }
    }

    iframe {
      width: 100%;
      height: 400px;
    }
  }
}

.bottomwrap {
  display: none;
}
</style>
