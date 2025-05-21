<template>
  <div class="treebigwrap">
    <el-collapse
      class="collapsewrap"
      v-model="activeTreeBig"
      @change="collapseBigChange"
      accordion
      style="margin: 0 10px"
    >
      <!-- <p style="color:red;font-size:12px;">*Recommend for tips > 10,000</p> -->
      <el-collapse-item title="Import/Export" name="11">
        <div class="line">
          <div class="upload-demo" style="display: flex">
            <el-upload
              style="flex: 1"
              ref="treeupload"
              action=""
              :limit="1"
              accept=".nwk,.nxs,.phyloxml,.nex,.phy,.tree"
              :max-size="maxFileSize"
              :on-exceed="handleTreeExceed"
              :on-change="handleTreeBigChange"
              :auto-upload="false"
            >
              {{ $t("application.treefile") }}
            </el-upload>
            <a style="color: red; width: 155px; font-size:10px;">.nwk,.nxs,.phyloxml,.nex,.phy,.tree</a>
          </div>
          <el-row>
            <el-col :span="12" style="text-indent: 2em">{{
              $t("application.downloadtemplate")
            }}</el-col>
            <el-col :span="12">
              <a :href="bigurl">
                <el-button size="small" color="#42bec3" :icon="Download" />
              </a>
            </el-col>
          </el-row>
        </div>
        <input class="bigfile" type="file"  accept=".json"  @change="onFileBigChange" hidden />
        <div class="line" style="cursor: pointer" @click="importBigJSON">
          {{ $t("application.importJSON") }}
        </div>
        <div class="line" style="cursor: pointer" @click="exportBigJSON">
          {{ $t("application.exportJSON") }}
        </div>
      </el-collapse-item>
      <el-collapse-item title="Basic Config" name="12">
        <el-row class="line">
          <el-col :span="12">
            <label>type</label>
          </el-col>
          <el-col :span="12">
            <el-select v-model="treebigconfig.type" @change="handleChange">
              <el-option
                v-for="(item, index) in TreeTypes"
                :label="index"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">fontColour</el-col>
          <el-col :span="12">
            <el-color-picker
              @change="handleChange"
              v-model="treebigconfig.fontColour"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">fontFamily</el-col>
          <el-col :span="12">
            <el-select
              v-model="treebigconfig.fontFamily"
              @change="handleChange"
            >
              <el-option
                v-for="item in FontFamily"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">fontSize</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treebigconfig.fontSize"
                :min="0"
                :max="28"
              />
              <span>{{ treebigconfig.fontSize }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">padding</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treebigconfig.padding"
                :max="200"
              />
              <span>{{ treebigconfig.padding }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">zoom</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treebigconfig.zoom"
                :max="200"
              />
              <span>{{ treebigconfig.zoom }}</span>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Align Config" name="13">
        <el-row class="line">
          <el-col :span="12">alignLabels</el-col>
          <el-col :span="12">
            <el-switch active-color="#42bec3"
              v-model="treebigconfig.alignLabels"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">alignLineColour</el-col>
          <el-col :span="12">
            <el-color-picker
              @change="handleChange"
              v-model="treebigconfig.alignLineColour"
            />
          </el-col>
        </el-row>

        <el-row class="line">
          <el-col :span="12">alignLineWidth</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treebigconfig.alignLineWidth"
                :max="200"
              />
              <span>{{ treebigconfig.alignLineWidth }}</span>
            </div>
          </el-col>
        </el-row>

        <el-row class="line">
          <el-col :span="12">alignLineOpacity</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treebigconfig.alignLineOpacity"
                :step="0.01"
                :max="1"
              />
              <span>{{ treebigconfig.alignLineOpacity }}</span>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Leaf shapes" name="14">
        <el-row class="line">
          <el-col :span="12">showShapes</el-col>
          <el-col :span="12">
            <el-switch active-color="#42bec3"
              v-model="treebigconfig.showShapes"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">showShapeBorders</el-col>
          <el-col :span="12">
            <el-switch active-color="#42bec3"
              v-model="treebigconfig.showShapeBorders"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">shapeBorderAlpha</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treebigconfig.shapeBorderAlpha"
                :max="200"
              />
              <span>{{ treebigconfig.shapeBorderAlpha }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">shapeBorderWidth</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treebigconfig.shapeBorderWidth"
                :max="200"
              />
              <span>{{ treebigconfig.shapeBorderWidth }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">fillColour</el-col>
          <el-col :span="12">
            <el-color-picker
              @change="handleChange"
              v-model="treebigconfig.fillColour"
            />
          </el-col>
        </el-row>

        <el-row class="line">
          <el-col :span="12">nodeSize</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treebigconfig.nodeSize"
                :max="200"
              />
              <span>{{ treebigconfig.nodeSize }}</span>
            </div>
          </el-col>
        </el-row>

        <el-row class="line">
          <el-col :span="12">
            <label>nodeShape</label>
          </el-col>
          <el-col :span="12">
            <el-select v-model="treebigconfig.nodeShape" @change="handleChange">
              <el-option
                v-for="(item, index) in Shapes"
                :label="index"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Labels style" name="15">
        <el-row class="line">
          <el-col :span="12">showLabels</el-col>
          <el-col :span="12">
            <el-switch active-color="#42bec3"
              v-model="treebigconfig.showLabels"
              @change="handleChange"
            />
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Branch Config" name="16">
        <el-row class="line">
          <el-col :span="12">showBranchLengths</el-col>
          <el-col :span="12">
            <el-switch active-color="#42bec3"
              v-model="treebigconfig.showBranchLengths"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">branchZoom</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treebigconfig.branchZoom"
                :max="200"
              />
              <span>{{ treebigconfig.branchZoom }}</span>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item title="Select highlight" name="17">
        <el-row class="line">
          <el-col :span="12">haloRadius</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treebigconfig.haloRadius"
                :max="200"
              />
              <span>{{ treebigconfig.haloRadius }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">haloWidth</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treebigconfig.haloWidth"
                :max="200"
              />
              <span>{{ treebigconfig.haloWidth }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">highlightColour</el-col>
          <el-col :span="12">
            <el-color-picker
              @change="handleChange"
              v-model="treebigconfig.highlightColour"
            />
          </el-col>
        </el-row>

        <el-row class="line">
          <el-col :span="12">highFillColour</el-col>
          <el-col :span="12">
            <el-color-picker
              @change="handleChange"
              v-model="treebigconfig.highFillColour"
            />
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup>
import { ref, nextTick, watch, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { Download } from "@element-plus/icons-vue";
import { jhsupload, jhscfg } from "@/api/application/index.js";
import { maxFileSize, webUrl,openLoading, closeLoading } from "@/utils/utils.js";
import { FontFamily, TreeTypes, Shapes } from "@/components/constants.js";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const emit = defineEmits(["treeBigValueTrans", "treeBigConfigTrans"]);
const props = defineProps({ treebigMessage: Object });
const activeTreeBig = ref(["11"]);
const treeupload = ref(null);
const treebigconfig = ref({
  id: "",
  source:"",
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
  showLogo:false,
  language:"en",
});
const bigurl = webUrl + "jhs/download/1897";
// const treevalue = reactive({
//   id: "",
//   source: "",
// });
const collapseBigChange = (val) => {
  console.log(val);
};
const handleTreeExceed = (files) => {
  treeupload.value.clearFiles();
  nextTick(() => {
    treeupload.value.handleStart(files[0]);
  });
};
const treeConfigTrans = (value) => {
  if (value.source) {
    emit("treeBigConfigTrans", value);
  } else {
    ElMessage({
      message: t("application.uploadtreefile"),
      type: "warning",
    });
  }
};
const handleTreeBigChange = (file) => {
  if (file.size > maxFileSize) {
    ElMessage({
      message: "上传文件大小超出限制!",
      type: "error",
    });
    return false;
  } else {
    openLoading();
    let tfile = file.raw;
    let formData = new FormData();
    formData.append("ds", tfile);
    formData.append("ftype", "0");
    jhsupload(formData)
      .then((res) => {
        closeLoading();
        if (res.code == "0") {
          treebigconfig.value.id = res.id;
          treebigconfig.value.source = res.content;
          treeConfigTrans(treebigconfig.value);
        }
      })
      .catch((err) => {
        closeLoading();
      });
  }
};
const getConfig = (value) => {
  let params = {
    id: value.id,
    ctype: "tree",
  };
  jhscfg(params).then((res) => {
    if (res.code == 0) {
      const cfg = res.cfg;
      treebigconfig.value.id = cfg.id;
      treebigconfig.value.language = 'en'
      treebigconfig.value.source = cfg.source;
      treebigconfig.value.type = cfg.type;
      treebigconfig.value.fontColour = cfg.fontColour;
      treebigconfig.value.fontFamily = cfg.fontFamily;
      treebigconfig.value.fontSize = cfg.fontSize;
      treebigconfig.value.padding = cfg.padding;
      treebigconfig.value.zoom = cfg.zoom;
      treebigconfig.value.alignLabels = cfg.alignLabels;
      treebigconfig.value.alignLineWidth = cfg.alignLineWidth;
      treebigconfig.value.alignLineOpacity = cfg.alignLineOpacity;
      treebigconfig.value.showShapes = cfg.showShapes;
      treebigconfig.value.shapeBorderAlpha = cfg.shapeBorderAlpha;
      treebigconfig.value.shapeBorderWidth = cfg.shapeBorderWidth;
      treebigconfig.value.fillColour = cfg.fillColour;
      treebigconfig.value.nodeSize = cfg.nodeSize;
      treebigconfig.value.nodeShape = cfg.nodeShape;
      treebigconfig.value.showLabels = cfg.showLabels;
      treebigconfig.value.showBranchLengths = cfg.showBranchLengths;
      treebigconfig.value.branchZoom = cfg.branchZoom;
      treebigconfig.value.haloRadius = cfg.haloRadius;
      treebigconfig.value.haloWidth = cfg.haloWidth;
      treebigconfig.value.highlightColour = cfg.highlightColour;
      treebigconfig.value.highFillColour = cfg.highFillColour;
      handleChange();
    }
  });
};
// 导入json 导出json
const onFileBigChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      treebigconfig.value = JSON.parse(event.target.result);
      treeConfigTrans(treebigconfig.value);
    };
    reader.readAsText(file);
  } else {
    treebigconfig.value = null;
  }
};
const importBigJSON = () => {
  const input = document.querySelector(".bigfile");
  input.click();
};
const exportBigJSON = () => {
  let jsonData = treebigconfig.value;
  if (jsonData) {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  }
};
const handleChange = () => {
  treeConfigTrans(treebigconfig.value);
};
watch(
  () => props.treebigMessage,
  (newValue, oldValue) => {
    getConfig(newValue);
  }
);
onMounted(() => {});
</script>
<style lang="scss" scoped>
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
.upload-demo {
  flex: 1;
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
</style>
