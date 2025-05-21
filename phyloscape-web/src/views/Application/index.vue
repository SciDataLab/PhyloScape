<template>
  <div class="appmenu">
    <el-row>
      <el-col :span="12">
        <ul>
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
      </el-col>
      <el-col :span="12" class="right12">
        <!-- <el-button @click="downloadPng('panelalldownload')">png</el-button> -->

        <el-select
          style="width: 350px"
          placeholder="Select demo"
          v-model="selectdemomore"
          @change="changeDemo"
          clearable
        >
          <el-option
            v-for="item in selectdemoopt3"
            :label="item.label"
            :value="item.value"
            v-show="curpanelnum == item.num"
          ></el-option>
        </el-select>
        <div class="resetbtn">
          <el-tooltip content="reset" placement="top" effect="light">
            <!-- 重置 -->
            <el-button type="warning" @click="resetPage">
              {{ $t("application.reset") }}
            </el-button>
          </el-tooltip>
        </div>

        <div class="sharebtn">
          <!-- 共享 -->
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
    <div :class="leftshow ? 'leftconfig' : 'leftconfighide'">
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
        <div class="bottommap">
          <div class="title">
            <el-image :src="mapicon"></el-image>
            {{ $t("application.maptitle") }}
          </div>
          <el-collapse v-model="activeMapNames" accordion>
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
                  <el-select
                    v-model="panel2curtype"
                    @change="panel2clearUpload"
                  >
                    <el-option
                      v-for="item in apptypeopts"
                      :label="item.label"
                      :value="item.value"
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
                      size="small"
                      ref="mapupload2"
                      class="upload-demo"
                      accept=".csv,.tsv,.zip"
                      :max-size="maxFileSize"
                      :limit="1"
                      :on-exceed="handlePanel2MapExceed"
                      :on-change="handlePanel2MapChange"
                      :auto-upload="false"
                    >
                      <el-button color="#42bec3">{{
                        $t("application.uploaddata")
                      }}</el-button>
                    </el-upload>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" style="text-indent: 2em">{{
                    $t("application.downloadtemplate")
                  }}</el-col>
                  <el-col :span="12"
                    ><a :href="pluginurl[panel2curtype]">
                      <el-button
                        size="small"
                        color="#42bec3"
                        :icon="Download"
                      /> </a
                  ></el-col>
                </el-row>
              </div>

              <div class="pluginconfig">
                <mapcolor-config
                  v-if="panel2curtype == '1'"
                  @colorTrans="panel2getValue"
                  :mapcolorMessage="mapcolorMessage"
                ></mapcolor-config>
                <maptransmission-config
                  v-if="panel2curtype == '2'"
                  @transmissionTrans="panel2getValue"
                  :maptransmissionMessage="maptransmissionMessage"
                >
                </maptransmission-config>
                <mapdensity-config
                  v-if="panel2curtype == '3'"
                  @densityTrans="panel2getValue"
                  :mapdensityMessage="mapdensityMessage"
                >
                </mapdensity-config>
                <mpienetwork-config
                  v-if="panel2curtype == '4'"
                  @pienetworkTrans="panel2getValue"
                  :mpienetworkMessage="mpienetworkMessage"
                ></mpienetwork-config>
                <mfreqstack-config
                  v-if="panel2curtype == '5'"
                  @freqstackTrans="panel2getValue"
                  :mfreqstackMessage="mfreqstackMessage"
                ></mfreqstack-config>
                <mgroupbar-config
                  v-if="panel2curtype == '6'"
                  @groupbarTrans="panel2getValue"
                  :mgroupbarMessage="mgroupbarMessage"
                ></mgroupbar-config>
                <macmap-config
                  v-if="panel2curtype == '7'"
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
            <el-collapse-item
              :title="$t('application.panel3con')"
              name="23"
              v-show="panel3show"
            >
              <el-row class="line">
                <el-col :span="12">
                  <label>{{ $t("application.pluginsel") }}</label>
                </el-col>
                <el-col :span="12">
                  <el-select
                    v-model="panel3curtype"
                    @change="panel3clearUpload"
                  >
                    <el-option
                      v-for="item in apptypeopts"
                      :label="item.label"
                      :value="item.value"
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
                      ref="mapupload3"
                      class="upload-demo"
                      accept=".csv,.tsv,.zip"
                      :max-size="maxFileSize"
                      :limit="1"
                      :on-exceed="handlePanel3MapExceed"
                      :on-change="handlePanel3MapChange"
                      :auto-upload="false"
                    >
                      <el-button color="#42bec3">{{
                        $t("application.uploaddata")
                      }}</el-button>
                    </el-upload>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" style="text-indent: 2em">{{
                    $t("application.downloadtemplate")
                  }}</el-col>
                  <el-col :span="12">
                    <a :href="pluginurl[panel3curtype]">
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
                  v-if="panel3curtype == '1'"
                  @colorTrans="panel3getValue"
                  :mapcolorMessage="mapcolorMessage"
                ></mapcolor-config>
                <maptransmission-config
                  v-if="panel3curtype == '2'"
                  @transmissionTrans="panel3getValue"
                  :maptransmissionMessage="maptransmissionMessage"
                >
                </maptransmission-config>
                <mapdensity-config
                  v-if="panel3curtype == '3'"
                  @densityTrans="panel3getValue"
                  :mapdensityMessage="mapdensityMessage"
                >
                </mapdensity-config>
                <mpienetwork-config
                  v-if="panel3curtype == '4'"
                  @pienetworkTrans="panel3getValue"
                  :mpienetworkMessage="mpienetworkMessage"
                ></mpienetwork-config>
                <mfreqstack-config
                  v-if="panel3curtype == '5'"
                  @freqstackTrans="panel3getValue"
                  :mfreqstackMessage="mfreqstackMessage"
                ></mfreqstack-config>
                <mgroupbar-config
                  v-if="panel3curtype == '6'"
                  @groupbarTrans="panel3getValue"
                  :mgroupbarMessage="mgroupbarMessage"
                ></mgroupbar-config>
                <macmap-config
                  v-if="panel3curtype == '7'"
                  @acmapTrans="panel3getValue"
                  :macmapMessage="macmapMessage"
                ></macmap-config>
                <mheatmap-config
                  v-show="panel3curtype == '9'"
                  @heatmapTrans="panel3getValue"
                  :mheatmapMessage="mheatmapMessage"
                ></mheatmap-config>
              </div>
            </el-collapse-item>
            <el-collapse-item
              :title="$t('application.panel4con')"
              name="24"
              v-show="panel4show"
            >
              <el-row class="line">
                <el-col :span="12">
                  <label>{{ $t("application.pluginsel") }}</label>
                </el-col>
                <el-col :span="12">
                  <el-select
                    v-model="panel4curtype"
                    @change="panel4clearUpload"
                  >
                    <el-option
                      v-for="item in apptypeopts"
                      :label="item.label"
                      :value="item.value"
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
                      ref="mapupload4"
                      class="upload-demo"
                      accept=".csv,.tsv,.zip"
                      :max-size="maxFileSize"
                      :limit="1"
                      :on-exceed="handlePanel4MapExceed"
                      :on-change="handlePanel4MapChange"
                      :auto-upload="false"
                    >
                      <el-button color="#42bec3">{{
                        $t("application.uploaddata")
                      }}</el-button>
                    </el-upload>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" style="text-indent: 2em">{{
                    $t("application.downloadtemplate")
                  }}</el-col>
                  <el-col :span="12">
                    <a :href="pluginurl[panel4curtype]">
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
                  v-if="panel4curtype == '1'"
                  @colorTrans="panel4getValue"
                  :mapcolorMessage="mapcolorMessage"
                ></mapcolor-config>
                <maptransmission-config
                  v-if="panel4curtype == '2'"
                  @transmissionTrans="panel4getValue"
                  :maptransmissionMessage="maptransmissionMessage"
                >
                </maptransmission-config>
                <mapdensity-config
                  v-if="panel4curtype == '3'"
                  @densityTrans="panel4getValue"
                  :mapdensityMessage="mapdensityMessage"
                >
                </mapdensity-config>
                <mpienetwork-config
                  v-if="panel4curtype == '4'"
                  @pienetworkTrans="panel4getValue"
                  :mpienetworkMessage="mpienetworkMessage"
                ></mpienetwork-config>
                <mfreqstack-config
                  v-if="panel4curtype == '5'"
                  @freqstackTrans="panel4getValue"
                  :mfreqstackMessage="mfreqstackMessage"
                ></mfreqstack-config>
                <mgroupbar-config
                  v-if="panel4curtype == '6'"
                  @groupbarTrans="panel4getValue"
                  :mgroupbarMessage="mgroupbarMessage"
                ></mgroupbar-config>
                <macmap-config
                  v-if="panel4curtype == '7'"
                  @acmapTrans="panel4getValue"
                  :macmapMessage="macmapMessage"
                ></macmap-config>
                <mheatmap-config
                  v-show="panel3curtype == '9'"
                  @heatmapTrans="panel3getValue"
                  :mheatmapMessage="mheatmapMessage"
                ></mheatmap-config>
              </div>
            </el-collapse-item>
            <el-collapse-item
              :title="$t('application.panel5con')"
              name="25"
              v-show="panel5show"
            >
              <el-row class="line">
                <el-col :span="12">
                  <label>{{ $t("application.pluginsel") }}</label>
                </el-col>
                <el-col :span="12">
                  <el-select
                    v-model="panel5curtype"
                    @change="panel5clearUpload"
                  >
                    <el-option
                      v-for="item in apptypeopts"
                      :label="item.label"
                      :value="item.value"
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
                      ref="mapupload5"
                      class="upload-demo"
                      accept=".csv,.tsv,.zip"
                      :limit="1"
                      :on-exceed="handlePanel5MapExceed"
                      :on-change="handlePanel5MapChange"
                      :auto-upload="false"
                    >
                      <el-button color="#42bec3">{{
                        $t("application.uploaddata")
                      }}</el-button>
                    </el-upload>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" style="text-indent: 2em">{{
                    $t("application.downloadtemplate")
                  }}</el-col>
                  <el-col :span="12">
                    <a :href="pluginurl[panel5curtype]">
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
                  v-if="panel5curtype == '1'"
                  @colorTrans="panel5getValue"
                  :mapcolorMessage="mapcolorMessage"
                ></mapcolor-config>
                <maptransmission-config
                  v-if="panel5curtype == '2'"
                  @transmissionTrans="panel5getValue"
                  :maptransmissionMessage="maptransmissionMessage"
                >
                </maptransmission-config>
                <mapdensity-config
                  v-if="panel5curtype == '3'"
                  @densityTrans="panel5getValue"
                  :mapdensityMessage="mapdensityMessage"
                >
                </mapdensity-config>
                <mpienetwork-config
                  v-if="panel5curtype == '4'"
                  @pienetworkTrans="panel5getValue"
                  :mpienetworkMessage="mpienetworkMessage"
                ></mpienetwork-config>
                <mfreqstack-config
                  v-if="panel5curtype == '5'"
                  @freqstackTrans="panel5getValue"
                  :mfreqstackMessage="mfreqstackMessage"
                ></mfreqstack-config>
                <mgroupbar-config
                  v-if="panel5curtype == '6'"
                  @groupbarTrans="panel5getValue"
                  :mgroupbarMessage="mgroupbarMessage"
                ></mgroupbar-config>
                <macmap-config
                  v-if="panel5curtype == '7'"
                  @acmapTrans="panel5getValue"
                  :macmapMessage="macmapMessage"
                ></macmap-config>
                <mheatmap-config
                  v-show="panel3curtype == '9'"
                  @heatmapTrans="panel3getValue"
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
    <div class="panelwrap" id="panelalldownload">
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
        <div class="panel2" id="panel2" v-show="panel2show">
          <iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            id="panel2frameMap"
            :src="geoUrl + plugintypevalue[panel2curtype]"
            crossOrigin="anonymous"
            @load="iframeLoaded"
          ></iframe>
        </div>
      </div>
      <div class="panel3" id="panel3" v-show="panel3show">
        <iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          id="panel3frameMap"
          :src="geoUrl + plugintypevalue[panel3curtype]"
          @load="iframeLoaded"
        ></iframe>
      </div>
      <div class="panel4" id="panel4" v-show="panel4show">
        <iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          id="panel4frameMap"
          :src="geoUrl + plugintypevalue[panel4curtype]"
          @load="iframeLoaded"
        ></iframe>
      </div>
      <div class="panel5" id="panel5" v-show="panel5show">
        <iframe sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          id="panel5frameMap"
          :src="geoUrl + plugintypevalue[panel5curtype]"
          @load="iframeLoaded"
        ></iframe>
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
            :max-size="1024 * 1024 * 1"
            :limit="1"
            :on-change="sharehandleChange"
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
import {
  jhsupload,
  jhsprunetree,
  jhscounty,
  jhscentent,
  jhssave,
  jhslineage,
  jhsdrawmap,
  jhscfg,
} from "@/api/application/index.js";
import { ElMessage, ElMessageBox } from "element-plus";
import mapicon from "@/assets/application/mapicon.png";
import treeicon from "@/assets/application/treeicon.png";
import open from "@/assets/application/open.png";
import close from "@/assets/application/close.png";
import tree from "@/assets/application/tree.png";
import {
  maxFileSize,
  webUrl,
  geoUrl,
  panelli,
  plugintypevalue,
  apptypeopts,
  sharetypeopts,
  selectdemoopt3,
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
import {shotScreen} from "@/utils/mydomtoimage.js"
import html2canvas from 'html2canvas';
const guserinfo = useUserInfo();
const { t } = useI18n();

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
const curpanelnum = ref();
const selectdemomore = ref("");

const panel2show = ref(true);
const panel3show = ref(true);
const panel4show = ref(false);
const panel5show = ref(false);
const panel2curtype = ref(0);
const panel3curtype = ref(0);
const panel4curtype = ref(0);
const panel5curtype = ref(0);
const dialogShareFormVisible = ref(false);
const cwidth = ref(0);
const cheight = ref(0);
const iframeLoaded = () => {
  document.querySelector('iframe').setAttribute('document.domain', ''); 
}
// 重置treeid mapid maptype
const downloadPng = (selector) => {
  nextTick(async () => {
    const node = document.querySelector("#" + selector); // 获取DOM元素的引用
    const canvas = document.createElement('canvas')
        canvas.width = node.offsetWidth
        canvas.height = node.offsetHeight;
      domtoimage
      .toPng(document.querySelector("#panel2frameMap").contentWindow.document.body,{ bgcolor: 'white' })
      .then((dataUrl) => {
        var link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // shotScreen()
};
const resetparams = reactive({
  treeid: null,
  treetype: null,
  mapid: { p2: null, p3: null, p4: null, p5: null },
  maptype: { p2: null, p3: null, p4: null, p5: null },
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

// 父传子
let oIframe2 = "";
let oIframe3 = "";
let oIframe4 = "";
let oIframe5 = "";
const formLabelWidth = "140px";
const mapupload2 = ref(null);
const mapupload3 = ref(null);
const mapupload4 = ref(null);
const mapupload5 = ref(null);

const panel2valueid = ref(0);
const panel3valueid = ref(0);
const panel4valueid = ref(0);
const panel5valueid = ref(0);

const activeMapNames = ref(["22"]);
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
const shareid = ref(0);
const fromtype = ref(null);
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
const curids = ref([]);
// 地图插件的修改
const changeMapPlugin = ({ nodes }) => {
  curids.value = Array.from(nodes);
  if (panel2valueid.value) {
    if (curpanelnum.value == 2) {
      drawPage(
        {
          ids: Array.from(nodes),
          map_id: panel2valueid.value,
          ftype: panel2curtype.value,
          gla_id: shareid.value,
          cwidthheight: {
            cwidth: "",
            cheight: "",
          },
          mapconfig: panel2config.value,
        },
        "2"
      );
    } else if (curpanelnum.value == 3) {
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
      drawPage(
        {
          ids: Array.from(nodes),
          map_id: panel3valueid.value,
          gla_id: shareid.value,
          ftype: panel3curtype.value,
          mapconfig: panel3config.value,
        },
        "3"
      );
    } else if (curpanelnum.value == 4) {
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
      drawPage(
        {
          ids: Array.from(nodes),
          map_id: panel3valueid.value,
          gla_id: shareid.value,
          ftype: panel3curtype.value,
          mapconfig: panel3config.value,
        },
        "3"
      );
      drawPage(
        {
          ids: Array.from(nodes),
          map_id: panel4valueid.value,
          gla_id: shareid.value,
          ftype: panel4curtype.value,
          mapconfig: panel4config.value,
        },
        "4"
      );
    } else if (curpanelnum.value == 5) {
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
      drawPage(
        {
          ids: Array.from(nodes),
          map_id: panel3valueid.value,
          gla_id: shareid.value,
          ftype: panel3curtype.value,
          mapconfig: panel3config.value,
        },
        "3"
      );
      drawPage(
        {
          ids: Array.from(nodes),
          map_id: panel4valueid.value,
          gla_id: shareid.value,
          ftype: panel4curtype.value,
          mapconfig: panel4config.value,
        },
        "4"
      );
      drawPage(
        {
          ids: Array.from(nodes),
          map_id: panel5valueid.value,
          gla_id: shareid.value,
          ftype: panel5curtype.value,
          mapconfig: panel5config.value,
        },
        "5"
      );
    }
  } else {
    ElMessage({
      message: t("application.curuploadmapfile"),
      type: "warning",
    });
  }
};
let treeBigNodes = ref([]);
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
    // treeBIG.onHover = (node, e) => {
    // };
  });
};
let treeORDINARY = "";
let treeOridinaryConfig = reactive({
  id: "",
  content: "",
  padding: 30,
  leafs: { show: true },
  layout: "tree",
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
let treeOrdinaryNodes = ref([]);
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

    treeORDINARY.onClick = (data) => {
      if (data.type == "leaf") {
        if (treeOridinaryConfig.layout == "tree") {
          treeOrdinaryNodes.value = collectChildrenNames(data.data.data);
        } else if (treeOridinaryConfig.layout == "radial") {
          treeOrdinaryNodes.value = collectChildrenNames(data.data.target.data);
        }
      }else{
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

// 选择不同的示例或者页面初始化
const initPage = () => {
  initresetTree();
  initMap();
  if (shareid.value) {
    getShareMapConfig();
  }
};
// 重置按钮
const resetPage = () => {
  curids.value = []
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
  jhscentent(params).then((res) => {
    // closeLoading();
    if (res.code == "0") {
      if (panel1curtype.value == "big") {
        treeBigConfig.source = res.content;
        getInitBigTree();
        if (shareid.value) {
          getTreeBigTrans();
        }
      } else if (panel1curtype.value == "ordinary") {
        treeOridinaryConfig.content = res.content;
        getInitOrdinaryTree();
        if (shareid.value) {
          getTreeOrdinaryTrans();
        }
      }
    }
  });
};
const initMap = () => {
  if (curpanelnum.value == "3") {
    panel2changeType();
    panel3changeType();
  } else if (curpanelnum.value == "4") {
    panel2changeType();
    panel3changeType();
    panel4changeType();
  } else if (curpanelnum.value == "5") {
    panel2changeType();
    panel3changeType();
    panel4changeType();
    panel5changeType();
  }
};
const resetMap = () => {
  panel2valueid.value = resetparams.mapid.p2 ?? panel2valueid.value;
  panel2curtype.value = resetparams.maptype.p2 ?? panel2curtype.value;
  panel3valueid.value = resetparams.mapid.p3 ?? panel3valueid.value;
  panel3curtype.value = resetparams.maptype.p3 ?? panel3curtype.value;
  panel4valueid.value = resetparams.mapid.p4 ?? panel4valueid.value;
  panel4curtype.value = resetparams.maptype.p4 ?? panel4curtype.value;
  panel5valueid.value = resetparams.mapid.p5 ?? panel5valueid.value;
  panel5curtype.value = resetparams.maptype.p5 ?? panel5curtype.value;
  if (curpanelnum.value == "3") {
    panel2changeType2();
    panel3changeType2();
  } else if (curpanelnum.value == "4") {
    panel2changeType2();
    panel3changeType2();
    panel4changeType2();
  } else if (curpanelnum.value == "5") {
    panel2changeType2();
    panel3changeType2();
    panel4changeType2();
    panel5changeType2();
  }
};
// 地图部分功能
const handlePanel2MapExceed = (files) => {
  mapupload2.value.clearFiles();
  nextTick(() => {
    mapupload2.value.handleStart(files[0]);
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
          panel2valueid.value = res.id;
          panel2changeType();
        }
      })
      .catch((error) => {
        closeLoading();
      });
  }
};
const handlePanel3MapExceed = (files) => {
  mapupload3.value.clearFiles();
  nextTick(() => {
    mapupload3.value.handleStart(files[0]);
  });
};
const handlePanel3MapChange = (file) => {
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
        // panel3curtype.value = "";
        if (res.code == 0) {
          panel3valueid.value = res.id;
          panel3changeType();
        }
      })
      .catch((error) => {
        closeLoading();
      });
  }
};
const handlePanel4MapExceed = (files) => {
  mapupload4.value.clearFiles();
  nextTick(() => {
    mapupload4.value.handleStart(files[0]);
  });
};
const handlePanel4MapChange = (file) => {
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
          panel4valueid.value = res.id;
          panel4changeType();
        }
      })
      .catch((error) => {
        closeLoading();
      });
  }
};
const handlePanel5MapExceed = (files) => {
  mapupload5.value.clearFiles();
  nextTick(() => {
    mapupload5.value.handleStart(files[0]);
  });
};
const handlePanel5MapChange = (file) => {
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
          panel5valueid.value = res.id;
          panel5changeType();
        }
      })
      .catch((error) => {
        closeLoading();
      });
  }
};
// 重置地图
const drawPage = async (params, panel) => {
  //mapcolor的情况处理
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
    if (panel == 2) {
      setTimeout(() => {
        oIframe2.contentWindow.postMessage({ id: id, node: node }, "*");
      }, 1000);
    } else if (panel == 3) {
      setTimeout(() => {
        oIframe3.contentWindow.postMessage({ id: id, node: node }, "*");
      }, 1000);
    } else if (panel == 4) {
      setTimeout(() => {
        oIframe4.contentWindow.postMessage({ id: id, node: node }, "*");
      }, 1000);
    } else if (panel == 5) {
      setTimeout(() => {
        oIframe5.contentWindow.postMessage({ id: id, node: node }, "*");
      }, 1000);
    }
  } else {
    await jhsdrawmap(params)
      .then((res) => {
        closeLoading();
        if (res.code == "0") {
          if (panel == 2) {
            setTimeout(() => {
              oIframe2.contentWindow.postMessage(res, "*");
            }, 1000);
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
              getHeatmapTrans(res.content)
            }
          } else if (panel == 3) {
            setTimeout(() => {
              oIframe3.contentWindow.postMessage(res, "*");
            }, 1000);
            if (panel3curtype.value == 1) {
              getMapcolorTrans(res.content);
            } else if (panel3curtype.value == 2) {
              getMaptransmissionTrans(res.content);
            } else if (panel3curtype.value == 3) {
              getMapdensityTrans(res.content);
            } else if (panel3curtype.value == 4) {
              getMpienetworkTrans(res.content);
            } else if (panel3curtype.value == 5) {
              getMfreqstackTrans(res.content);
            } else if (panel3curtype.value == 6) {
              getMgroupbarTrans(res.content);
            } else if (panel3curtype.value == 7) {
              getMacmapTrans(res.content);
            } else if (panel3curtype.value == 9) {
              getHeatmapTrans(res.content)
            }
          } else if (panel == 4) {
            setTimeout(() => {
              oIframe4.contentWindow.postMessage(res, "*");
            }, 1000);
            if (panel4curtype.value == 1) {
              getMapcolorTrans(res.content);
            } else if (panel4curtype.value == 2) {
              getMaptransmissionTrans(res.content);
            } else if (panel4curtype.value == 3) {
              getMapdensityTrans(res.content);
            } else if (panel4curtype.value == 4) {
              getMpienetworkTrans(res.content);
            } else if (panel4curtype.value == 5) {
              getMfreqstackTrans(res.content);
            } else if (panel4curtype.value == 6) {
              getMgroupbarTrans(res.content);
            } else if (panel4curtype.value == 7) {
              getMacmapTrans(res.content);
            } else if (panel4curtype.value == 9) {
              getHeatmapTrans(res.content)
            }
          } else if (panel == 5) {
            setTimeout(() => {
              oIframe5.contentWindow.postMessage(res, "*");
            }, 1000);
            if (panel5curtype.value == 1) {
              getMapcolorTrans(res.content);
            } else if (panel5curtype.value == 2) {
              getMaptransmissionTrans(res.content);
            } else if (panel5curtype.value == 3) {
              getMapdensityTrans(res.content);
            } else if (panel5curtype.value == 4) {
              getMpienetworkTrans(res.content);
            } else if (panel5curtype.value == 5) {
              getMfreqstackTrans(res.content);
            } else if (panel5curtype.value == 6) {
              getMgroupbarTrans(res.content);
            } else if (panel5curtype.value == 7) {
              getMacmapTrans(res.content);
            } else if (panel5curtype.value == 9) {
              getHeatmapTrans(res.content)
            }
          }
        }
      })
      .catch((error) => {
        closeLoading();
      });
  }
};
//   插件配置文件
//   ---开始
let panel_params = [
  mapcolorMessage.value,
  maptransmissionMessage.value,
  mapdensityMessage.value,
  mpienetworkMessage.value,
  mfreqstackMessage.value,
  mgroupbarMessage.value,
  macmapMessage.value,
  mheatmapMessage.value
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
}
//   插件配置文件
//   ---结束
const panel2clearUpload = () => {
  mapupload2.value.clearFiles();
};
const panel3clearUpload = () => {
  mapupload3.value.clearFiles();
};
const panel4clearUpload = () => {
  mapupload4.value.clearFiles();
};
const panel5clearUpload = () => {
  mapupload5.value.clearFiles();
};
const panel2changeType = () => {
  cwidth.value = document.getElementById("panel2").offsetWidth;
  cheight.value = document.getElementById("panel2").offsetHeight;
  let ids =
    panel1curtype.value == "ordinary"
      ? Array.from(treeOrdinaryNodes.value)
      : Array.from(treeBigNodes.value);
  drawPage(
    {
      ids: ids,
      map_id: panel2valueid.value,
      gla_id: shareid.value,
      ftype: panel2curtype.value,
    },
    "2"
  );
};
const panel2changeType2 = () => {
  cwidth.value = document.getElementById("panel2").offsetWidth;
  cheight.value = document.getElementById("panel2").offsetHeight;
  let ids =
    panel1curtype.value == "ordinary"
      ? Array.from(treeOrdinaryNodes.value)
      : Array.from(treeBigNodes.value);
  drawPage(
    {
      ids: ids,
      map_id: resetparams.mapid.p2 ?? panel2valueid.value,
      gla_id: shareid.value,
      ftype: resetparams.maptype.p2 ?? panel2curtype.value,
    },
    "2"
  );
};
const panel3changeType = () => {
  cwidth.value = document.getElementById("panel3").offsetWidth;
  cheight.value = document.getElementById("panel3").offsetHeight;
  let ids =
    panel1curtype.value == "ordinary"
      ? Array.from(treeOrdinaryNodes.value)
      : Array.from(treeBigNodes.value);
  drawPage(
    {
      ids: ids,
      map_id: panel3valueid.value,
      gla_id: shareid.value,
      ftype: panel3curtype.value,
    },
    "3"
  );
};
const panel3changeType2 = () => {
  cwidth.value = document.getElementById("panel2").offsetWidth;
  cheight.value = document.getElementById("panel2").offsetHeight;
  let ids =
    panel1curtype.value == "ordinary"
      ? Array.from(treeOrdinaryNodes.value)
      : Array.from(treeBigNodes.value);
  drawPage(
    {
      ids: ids,
      map_id: resetparams.mapid.p3 ?? panel3valueid.value,
      gla_id: shareid.value,
      ftype: resetparams.maptype.p3 ?? panel3curtype.value,
    },
    "3"
  );
};
const panel4changeType = () => {
  cwidth.value = document.getElementById("panel4").offsetWidth;
  cheight.value = document.getElementById("panel4").offsetHeight;
  let ids =
    panel1curtype.value == "ordinary"
      ? Array.from(treeOrdinaryNodes.value)
      : Array.from(treeBigNodes.value);
  drawPage(
    {
      ids: ids,
      map_id: panel4valueid.value,
      gla_id: shareid.value,
      ftype: panel4curtype.value,
    },
    "4"
  );
};
const panel4changeType2 = () => {
  cwidth.value = document.getElementById("panel4").offsetWidth;
  cheight.value = document.getElementById("panel4").offsetHeight;
  let ids =
    panel1curtype.value == "ordinary"
      ? Array.from(treeOrdinaryNodes.value)
      : Array.from(treeBigNodes.value);
  drawPage(
    {
      ids: ids,
      map_id: resetparams.mapid.p4 ?? panel4valueid.value,
      gla_id: shareid.value,
      ftype: resetparams.maptype.p4 ?? panel4curtype.value,
    },
    "4"
  );
};
const panel5changeType = () => {
  cwidth.value = document.getElementById("panel5").offsetWidth;
  cheight.value = document.getElementById("panel5").offsetHeight;
  let ids =
    panel1curtype.value == "ordinary"
      ? Array.from(treeOrdinaryNodes.value)
      : Array.from(treeBigNodes.value);
  drawPage(
    {
      ids: ids,
      map_id: panel5valueid.value,
      gla_id: shareid.value,
      ftype: panel5curtype.value,
    },
    "5"
  );
};
const panel5changeType2 = () => {
  cwidth.value = document.getElementById("panel5").offsetWidth;
  cheight.value = document.getElementById("panel5").offsetHeight;
  let ids =
    panel1curtype.value == "ordinary"
      ? Array.from(treeOrdinaryNodes.value)
      : Array.from(treeBigNodes.value);
  drawPage(
    {
      ids: ids,
      map_id: resetparams.mapid.p5 ?? panel5valueid.value,
      gla_id: shareid.value,
      ftype: resetparams.maptype.p5 ?? panel5curtype.value,
    },
    "5"
  );
};

// 2.1mapcolor  根据城市code，得到树的结点
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
  highlight_tree(tdata.names)
}
// 3.1 标红树状图
const highlight_tree = (names) =>{
  nextTick(()=>{
    treeOridinaryConfig.highlight.leafs = names
    getInitOrdinaryTree()
  })
}
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
  const maxSize = 1024 * 1024 * 1;
  if (file.size > maxSize) {
    ElMessage({
      message: t("application.curimgexceed"),
      type: "error",
    });
    return false;
  } else {
    shareform.img = file.raw;
  }
};
const openShare = () => {
  // 未登录提示
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
  let map_id = {};
  let map_type = {};
  let map_cfg = {};
  if (curpanelnum.value == 2) {
    map_id = {
      panel2valueid: panel2valueid.value,
    };
    map_type = {
      panel2curtype: panel2curtype.value,
    };
    map_cfg = {
      panel2_cfg: panel_params[panel2curtype.value - 1],
    };
  } else if (curpanelnum.value == 3) {
    map_id = {
      panel2valueid: panel2valueid.value,
      panel3valueid: panel3valueid.value,
    };
    map_type = {
      panel2curtype: panel2curtype.value,
      panel3curtype: panel3curtype.value,
    };
    map_cfg = {
      panel2_cfg: panel_params[panel2curtype.value - 1],
      panel3_cfg: panel_params[panel3curtype.value - 1],
    };
  } else if (curpanelnum.value == 4) {
    map_id = {
      panel2valueid: panel2valueid.value,
      panel3valueid: panel3valueid.value,
      panel4valueid: panel4valueid.value,
    };
    map_type = {
      panel2curtype: panel2curtype.value,
      panel3curtype: panel3curtype.value,
      panel4curtype: panel4curtype.value,
    };
    map_cfg = {
      panel2_cfg: panel_params[panel2curtype.value - 1],
      panel3_cfg: panel_params[panel3curtype.value - 1],
      panel4_cfg: panel_params[panel4curtype.value - 1],
    };
  } else if (curpanelnum.value == 5) {
    map_id = {
      panel2valueid: panel2valueid.value,
      panel3valueid: panel3valueid.value,
      panel4valueid: panel4valueid.value,
      panel5valueid: panel5valueid.value,
    };
    map_type = {
      panel2curtype: panel2curtype.value,
      panel3curtype: panel3curtype.value,
      panel4curtype: panel4curtype.value,
      panel5curtype: panel5curtype.value,
    };
    map_cfg = {
      panel2_cfg: panel_params[panel2curtype.value - 1],
      panel3_cfg: panel_params[panel3curtype.value - 1],
      panel4_cfg: panel_params[panel4curtype.value - 1],
      panel5_cfg: panel_params[panel5curtype.value - 1],
    };
  }
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
    tree_cfg.legend.data = [];
    tree_cfg.division.data = [];
    tree_cfg.nodes.symbol = JSON.parse(JSON.stringify(nodessymbol));
  } else if (panel1curtype.value == "big") {
    treeid = treeBigConfig.id;
    tree_cfg = treeBigConfig;
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
      //切换panel的时候当前的ids清空
      curids.value = [];
      panel2config.value = {};
      panel3config.value = {};
      panel4config.value = {};
      panel5config.value = {};

      showCurPanel("curpanel", num);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "canceled",
      });
    });
};
const showCurPanel = (type, num) => {
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
    selectdemomore.value = "";
    if (panel1curtype.value == "big") {
      treeBigConfig.source = "";
      getInitBigTree();
    } else if (panel1curtype.value == "ordinary") {
      treeOridinaryConfig.content = "";
      document.getElementById("tree-ordinary").innerHTML = "";
    }
    if (type == "curpanel") {
      panel2curtype.value = 0;
      panel3curtype.value = 0;
      panel4curtype.value = 0;
      panel5curtype.value = 0;
      router.push({
        path: "/application",
      });
    }

    if (curpanelnum.value == 3) {
      panel2show.value = true;
      panel3show.value = true;
      panel4show.value = false;
      panel5show.value = false;
    } else if (curpanelnum.value == 4) {
      panel2show.value = true;
      panel3show.value = true;
      panel4show.value = true;
      panel5show.value = false;
    } else if (curpanelnum.value == 5) {
      panel2show.value = true;
      panel3show.value = true;
      panel4show.value = true;
      panel5show.value = true;
    }
  }
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

let panel3config = ref({});
const panel3getValue = (data) => {
  panel3config.value = { ...data };
  drawPage(
    {
      ids: curids.value,
      map_id: panel3valueid.value,
      ftype: panel3curtype.value,
      mapconfig: panel3config.value,
    },
    "3"
  );
};
let panel4config = ref({});
const panel4getValue = (data) => {
  panel4config.value = { ...data };
  drawPage(
    {
      ids: curids.value,
      map_id: panel4valueid.value,
      ftype: panel4curtype.value,
      mapconfig: panel4config.value,
    },
    "4"
  );
};
let panel5config = ref({});
const panel5getValue = (data) => {
  panel5config.value = { ...data };
  drawPage(
    {
      ids: curids.value,
      map_id: panel5valueid.value,
      ftype: panel5curtype.value,
      mapconfig: panel5config.value,
    },
    "5"
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
      for (let i in res.cfg) {
        if (i == "panel2_cfg") {
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
          } else if(panel2curtype.value == 9){
            mheatmapMessage.value = panel2_cfg;
          }
        } else if (i == "panel3_cfg") {
          let panel3_cfg = res.cfg["panel3_cfg"];
          if (panel3curtype.value == 1) {
            mapcolorMessage.value = panel3_cfg;
          } else if (panel3curtype.value == 2) {
            maptransmissionMessage.value = panel3_cfg;
          } else if (panel3curtype.value == 3) {
            mapdensityMessage.value = panel3_cfg;
          } else if (panel3curtype.value == 4) {
            mpienetworkMessage.value = panel3_cfg;
          } else if (panel3curtype.value == 5) {
            mfreqstackMessage.value = panel3_cfg;
          } else if (panel3curtype.value == 6) {
            mgroupbarMessage.value = panel3_cfg;
          } else if (panel3curtype.value == 7) {
            macmapMessage.value = panel3_cfg;
          } else if(panel3curtype.value == 9){
            mheatmapMessage.value = panel3_cfg;
          }
        } else if (i == "panel4_cfg") {
          let panel4_cfg = res.cfg["panel4_cfg"];
          if (panel4curtype.value == 1) {
            mapcolorMessage.value = panel4_cfg;
          } else if (panel4curtype.value == 2) {
            maptransmissionMessage.value = panel4_cfg;
          } else if (panel4curtype.value == 3) {
            mapdensityMessage.value = panel4_cfg;
          } else if (panel4curtype.value == 4) {
            mpienetworkMessage.value = panel2_cfg;
          } else if (panel4curtype.value == 5) {
            mfreqstackMessage.value = panel4_cfg;
          } else if (panel4curtype.value == 6) {
            mgroupbarMessage.value = panel4_cfg;
          } else if (panel4curtype.value == 7) {
            macmapMessage.value = panel4_cfg;
          } else if(panel4curtype.value == 9){
            mheatmapMessage.value = panel4_cfg;
          }
        } else if (i == "panel5_cfg") {
          let panel5_cfg = res.cfg["panel5_cfg"];
          if (panel5curtype.value == 1) {
            mapcolorMessage.value = panel5_cfg;
          } else if (panel5curtype.value == 2) {
            maptransmissionMessage.value = panel5_cfg;
          } else if (panel5curtype.value == 3) {
            mapdensityMessage.value = panel5_cfg;
          } else if (panel5curtype.value == 4) {
            mpienetworkMessage.value = panel5_cfg;
          } else if (panel5curtype.value == 5) {
            mfreqstackMessage.value = panel5_cfg;
          } else if (panel5curtype.value == 6) {
            mgroupbarMessage.value = panel5_cfg;
          } else if (panel5curtype.value == 7) {
            macmapMessage.value = panel5_cfg;
          } else if(panel5curtype.value == 9){
            mheatmapMessage.value = panel5_cfg;
          }
        }
      }
    }
  });
};
const changeDemo = () => {
  let params = {};
  if (selectdemomore.value == "moredemo1") {
    params = {
      // id: 48,
      // panelnum: 3,
      // treeid: 1782,
      // tree_type: "ordinary",
      // mapid: { panel2valueid: 1783, panel3valueid: 1784 },
      // map_type: { panel2curtype: 2, panel3curtype: 6 },
      id: 256,
      panelnum: 3,
      treeid: 3207,
      tree_type: "ordinary",
      mapid: { panel2valueid: 3208, panel3valueid: 3209 },
      map_type: { panel2curtype: 2, panel3curtype: 5 },
    };
    demoInt(params);
  } else if (selectdemomore.value == "moredemo2") {
    params = {
      // id: 49,
      // panelnum: 4,
      // treeid: 1785,
      // tree_type: "ordinary",
      // mapid: { panel2valueid: 1786, panel3valueid: 1787, panel4valueid: 1788 },
      // map_type: { panel2curtype: 7, panel3curtype: 6, panel4curtype: 5 },
      id: 258,
      panelnum: 4,
      treeid: 3214,
      tree_type: "ordinary",
      mapid: { panel2valueid: 3215, panel3valueid: 3216, panel4valueid: 3217 },
      map_type: { panel2curtype: 7, panel3curtype: 5, panel4curtype: 2 },
    };
    demoInt(params);
  } else if (selectdemomore.value == "moredemo3") {
    params = {
      // id: 50,
      // panelnum: 5,
      // treeid: 1789,
      // tree_type: "ordinary",
      // mapid: { panel2valueid: 1790, panel3valueid: 1791, panel4valueid: 1792, panel5valueid: 1793 },
      // map_type: { panel2curtype: 2, panel3curtype: 7, panel4curtype: 6, panel5curtype: 5 },
      id: 167,
      panelnum: 5,
      treeid: 2819,
      tree_type: "ordinary",
      mapid: {
        panel2valueid: 2810,
        panel3valueid: 2811,
        panel4valueid: 2812,
        panel5valueid: 2817,
      },
      map_type: {
        panel2curtype: 2,
        panel3curtype: 7,
        panel4curtype: 6,
        panel5curtype: 5,
      },
    };
    demoInt(params);
  } else {
    location.reload();
  }
};
const demoInt = (params) => {
  router.push({
    path: "/application",
  });
  shareid.value = params.id;
  resetparams.treeid = params.treeid;
  resetparams.treetype = params.tree_type;

  let p2id = params.mapid.panel2valueid;
  let p2type = params.map_type.panel2curtype;
  let p3id = params.mapid.panel3valueid;
  let p3type = params.map_type.panel3curtype;
  let p4id = params.mapid.panel4valueid;
  let p4type = params.map_type.panel4curtype;
  let p5id = params.mapid.panel5valueid;
  let p5type = params.map_type.panel5curtype;

  resetparams.mapid.p2 = p2id;
  resetparams.mapid.p3 = p3id;
  resetparams.mapid.p4 = p4id;
  resetparams.mapid.p5 = p5id;
  resetparams.maptype.p2 = p2type;
  resetparams.maptype.p3 = p3type;
  resetparams.maptype.p4 = p4type;
  resetparams.maptype.p5 = p5type;

  if (params.id) {
    panel1curtype.value = params.tree_type;
    curpanelnum.value = params.panelnum;
    if (panel1curtype.value == "big") {
      treeBigConfig.id = params.treeid;
    } else if (panel1curtype.value == "ordinary") {
      treeOridinaryConfig.id = params.treeid;
    }
    panel2valueid.value = p2id;
    panel3valueid.value = p3id;
    panel4valueid.value = p4id;
    panel5valueid.value = p5id;
    panel2curtype.value = p2type;
    panel3curtype.value = p3type;
    panel4curtype.value = p4type;
    panel5curtype.value = p5type;

    // setTimeout(() => {
    //   initPage();
    // }, 2000);
    setTimeout(() => {
      initPage();
    }, 1000);
  }
};

const handleMessageIndex = (event) => {
  if (event.data.type == "1") {
    getmapcolornodes(event.data.tparams);
  } else if (event.data.type == "2") {
    getmaptransmissionnodes(event.data.tparams);
  } else if (event.data.type == "3") {
    getmapdensity(event.data.tparams);
  } else if (event.data.type == "9") {
    getmheatmap(event.data.tparams)
  }
}

onMounted(() => {
  oIframe2 = document.getElementById("panel2frameMap");
  oIframe3 = document.getElementById("panel3frameMap");
  oIframe4 = document.getElementById("panel4frameMap");
  oIframe5 = document.getElementById("panel5frameMap");
  if (route.query.id) {
    //如果是gallery传过来的值获取
    shareid.value = route.query.id;
    fromtype.value = route.query.from;
    panel1curtype.value = route.query.tree_type;
    curpanelnum.value = route.query.panelnum ? route.query.panelnum : 3;
    if (panel1curtype.value == "big") {
      treeBigConfig.id = route.query.treeid;
    } else if (panel1curtype.value == "ordinary") {
      treeOridinaryConfig.id = route.query.treeid;
    }
    let mapid = JSON.parse(route.query.mapid);
    let map_type = JSON.parse(route.query.map_type);

    let p2id = mapid ? mapid.panel2valueid : 0;
    let p2type = map_type.panel2curtype ? map_type.panel2curtype : "";
    let p3id = mapid ? mapid.panel3valueid : 0;
    let p3type = map_type.panel3curtype ? map_type.panel3curtype : "";
    let p4id = mapid ? mapid.panel4valueid : 0;
    let p4type = map_type.panel4curtype ? map_type.panel4curtype : "";
    let p5id = mapid ? mapid.panel5valueid : 0;
    let p5type = map_type.panel5curtype ? map_type.panel5curtype : "";

    panel2valueid.value = p2id;
    panel3valueid.value = p3id;
    panel4valueid.value = p4id;
    panel5valueid.value = p5id;

    panel2curtype.value = p2type;
    panel3curtype.value = p3type;
    panel4curtype.value = p4type;
    panel5curtype.value = p5type;

    resetparams.treeid = route.query.treeid;
    resetparams.treetype = route.query.tree_type;
    resetparams.mapid.p2 = p2id;
    resetparams.mapid.p3 = p3id;
    resetparams.mapid.p4 = p4id;
    resetparams.mapid.p5 = p5id;
    resetparams.maptype.p2 = p2type;
    resetparams.maptype.p3 = p3type;
    resetparams.maptype.p4 = p4type;
    resetparams.maptype.p5 = p5type;
    openLoading();
    // 得到树数据
    // setTimeout(() => {
    //   initPage();
    // }, 3000);
    setTimeout(() => {
      initPage();
    }, 2000);
  } else {
    getInitOrdinaryTree();
  }
  //当前显示几个panel
  curpanelnum.value = route.query.panelnum ? route.query.panelnum : 3;
  showCurPanel("init", curpanelnum.value);
  //map传过来的id
  watchMap();
});
// 1.监听地图点击事件，获取地图code
const watchMap = () => {
  window.addEventListener("message", handleMessageIndex, false);
};
onBeforeUnmount(() => {
  window.removeEventListener("message", handleMessageIndex, false);
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
  min-height: calc(100vh - 118px);
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
    height: calc(100vh - 118px);
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

    .pluginsel {
      display: flex;
      padding-bottom: 5px;
      label {
        color: #606266;
        font-size: 14px;
        padding: 0 12px 0 0;
        width: 70px;
      }
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
    width: calc(100vw - 300px);
    flex: 1;
    height: calc(100vh - 118px);
    overflow-y: auto;
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
      height: 540px;
      .panel1,
      .panel2 {
        flex: 1;
      }
      .panel1 {
        position: relative;
        .panel1tree {
          position: absolute;
          left: 50%;
          transform: translate(-50%);
        }
        #tree-ordinary,
        #tree-big {
          height: 540px;
          overflow-y: hidden;
          box-sizing: border-box;
        }
      }
      .panel2 {
        // border-left: thin solid rgb(187, 187, 187);
        #panel2frameMap {
          height: 540px;
        }
      }
    }
    .panel3,
    .panel4,
    .panel5 {
      width: 100%;
      height: calc(50vh - 130px);
      min-height: 500px;
      // border-top: thin solid rgb(187, 187, 187);
    }
    iframe {
      width: 100%;
      height: calc(50vh - 130px);
      min-height: 500px;
    }
  }
}
.bottomwrap {
  display: none;
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
</style>
