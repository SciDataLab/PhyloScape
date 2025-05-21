<template>
  <div class="applicationwrap">
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
  </div>
</template>
<script setup>
import { ref, reactive, nextTick, onMounted } from "vue";
import { jhscentent, jhscfg } from "@/api/application/index.js";
import { ElMessage } from "element-plus";
import {
  openLoading,
  closeLoading,
} from "@/utils/utils.js";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const curpanelnum = ref(1);
const selectdemo1 = ref("odemo1");
const shareid = ref(0);
const fromtype = ref(null);
// // 超大树 树部分功能
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
const getInitBigTree = () => {
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
  language: "zh",
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
    treeORDINARY = new phyloscape.InitTreeStructure(
      "#tree-ordinary",
      treeOridinaryConfig
    );
    if (treeOridinaryConfig.layout == "radial") {
      treeORDINARY = new phyloscape.InitRadialStructure(
        "#tree-ordinary",
        treeOridinaryConfig
      );
    }
  });
};
// 重置配置
const getjhscfg = () => {
  let params = {
    id: shareid.value,
    type: "tree",
  };
  jhscfg(params).then((res) => {
    if (res.code == 0) {
      if(res.cfg.content){
        panel1getOrdinaryConfig(res.cfg);

      }else if(res.cfg.source){
        panel1getBigConfig(res.cfg)
      }
    }
  });
};
// 重置树
const resetTree = () => {
  openLoading();
  if (panel1curtype.value == "ordinary" && treeOridinaryConfig.id) {
    getJhsCentent({ id: treeOridinaryConfig.id });
  } else if (panel1curtype.value == "big" && treeBigConfig.id) {
    getJhsCentent({ id: treeBigConfig.id });
  } else {
    ElMessage({
      message: t("application.curnotreefile"),
      type: "warning",
    });
  }
};
const getJhsCentent = (params) => {
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
    getInitOrdinaryTree();
  } else if (panel1curtype.value == "big") {
    getInitBigTree();
  }
};
onMounted(() => {
  //如果是gallery传过来的值获取
  shareid.value = route.query.id;
  fromtype.value = route.query.from;
  if (shareid.value) {
    panel1curtype.value = route.query.tree_type;
    curpanelnum.value = route.query.panelnum ? route.query.panelnum : 1;
    if (panel1curtype.value == "big") {
      treeBigConfig.id = route.query.treeid;
    } else if (panel1curtype.value == "ordinary") {
      treeOridinaryConfig.id = route.query.treeid;
    }
    // 得到树数据
    setTimeout(() => {
      resetTree();
    }, 2000);
  } else {
    getInitOrdinaryTree();
  }
  getjhscfg();
});
</script>

<style lang="scss" scoped>
#app {
  min-width: 900px;
  font-family: 微软雅黑;
}
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
      margin-left: 10px;
      cursor: pointer;
    }
  }
  .sharebtn {
    box-sizing: border-box;
    padding: 10px;
    width: 100px;
    float: right;
    .el-button {
      width: 100%;
      color: white;
      line-height: auto;
    }
  }
}
.applicationwrap {
  width: 100%;
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
        height: 99vh;
        width:100%;
      }
    }
  }
}
.bottomwrap {
  display: none;
}
</style>
