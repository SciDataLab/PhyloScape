<template>
  <div class="treeordinarywrap">
    <el-collapse
      class="collapsewrap"
      v-model="activeTreeOrdinary"
      @change="collapseOrdinaryChange"
      accordion
      style="margin: 0 10px"
    >
      <!-- Import/Export -->
      <el-collapse-item title="Import/Export" name="11">
        <input
          class="ordinaryfile"
          type="file"
          accept=".json"
          @change="onFileChange"
          hidden
        />
        <div class="line">
          <div class="upload-demo" style="position: relative">
            <el-upload
              style="flex: 1"
              ref="baseupload"
              action=""
              :limit="1"
              accept=".nwk,.nxs,.phyloxml,.nex,.phy,.tree"
              :max-size="maxFileSize"
              :on-exceed="handleTreeOrdinaryExceed"
              :on-change="handleTreeOrdinaryChange"
              :auto-upload="false"
            >
              {{ $t("application.treefile") }}
            </el-upload>
            <a style=" color: red; width: 155px; font-size:10px; position: absolute; top: 0; right: 0;">.nwk,.nxs,.phyloxml,.nex,.phy,.tree</a>
          </div>
          <el-row>
            <el-col :span="12" style="text-indent: 2em">{{
              $t("application.downloadtemplate")
            }}</el-col>
            <el-col :span="12">
              <a :href="ordinaryurl">
                <el-button size="small" color="#42bec3" :icon="Download" />
              </a>
            </el-col>
          </el-row>
        </div>

        <div class="line" style="cursor: pointer" @click="importJSON">
          {{ $t("application.importJSON") }}
        </div>
        <div class="line" style="cursor: pointer" @click="exportJSON">
          {{ $t("application.exportJSON") }}
        </div>
      </el-collapse-item>
      <!-- 1.基础设置 -->
      <el-collapse-item :title="$t('application.obasicsetting')" name="12">
        <el-row class="line">
          <el-col :span="10">
            <label>layout</label>
          </el-col>
          <el-col :span="14">
            <el-select
              v-model="treeconfig.layout"
              @change="handleChange({ key: 'layout' })"
            >
              <el-option
                v-for="(item, index) in Layout"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="10">Size</el-col>
          <el-col :span="7">
            <el-input
              clearable
              type="number"
              v-model="treeconfig.size[0]"
              @change="handleChange"
            ></el-input>
          </el-col>
          <el-col :span="7">
            <el-input
              clearable
              type="number"
              v-model="treeconfig.size[1]"
              @change="handleChange"
            ></el-input>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">isPhylogram</el-col>
          <el-col :span="12">
            <el-switch
              active-color="#42bec3"
              v-model="treeconfig.isPhylogram"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">isWheelZoom</el-col>
          <el-col :span="12">
            <el-switch
              active-color="#42bec3"
              v-model="treeconfig.isWheelZoom"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <!-- <el-row class="line">
          <el-col :span="12">separation</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.separation"
                :min="0"
                :max="100"
              />
              <span>{{ treeconfig.separation }}</span>
            </div>
          </el-col>
        </el-row> -->
        <el-row class="line">
          <el-col :span="12">
            <label>scale</label>
          </el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.scale"
                :min="0"
                :max="10"
              />
              <span>{{ treeconfig.scale }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">rotationAngle</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.rotationAngle"
                :min="0"
                :max="10"
              />
              <span>{{ treeconfig.rotationAngle }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">
            <label>sort</label>
          </el-col>
          <el-col :span="12">
            <el-select v-model="treeconfig.sort" @change="handleChange">
              <el-option
                v-for="(item, index) in Sort"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-collapse-item>
      <!-- 2.全局样式 -->
      <el-collapse-item :title="$t('application.oglobalstyles')" name="13">
        <p style="color: red; font-size: 12px">
          *The styles of child nodes take priority and will override the global styles.
        </p>
        <el-row class="line">
          <el-col :span="12">fill</el-col>
          <el-col :span="12">
            <el-color-picker
              @change="handleChange"
              show-alpha
              v-model="treeconfig.style.fill"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">stroke</el-col>
          <el-col :span="12">
            <el-color-picker
              @change="handleChange"
              show-alpha
              v-model="treeconfig.style.stroke"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">strokeWidth</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.style['stroke-width']"
                :min="0"
                :max="10"
              />
              <span>{{ treeconfig.style["stroke-width"] }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">fontSize</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.style['font-size']"
                :min="0"
                :max="60"
              />
              <span>{{ treeconfig.style["font-size"] }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">fontFamily</el-col>
          <el-col :span="12">
            <el-select
              v-model="treeconfig.style['font-family']"
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
      </el-collapse-item>
      <!-- 缩略图 -->
      <el-collapse-item :title="$t('application.thumbnail')" name="14">
        <el-row class="line">
          <el-col :span="12">Show</el-col>
          <el-col :span="12">
            <el-switch
              active-color="#42bec3"
              v-model="treeconfig.minimap.show"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <!--  <el-row class="line">
          <el-col :span="12">ScaleInit</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.minimap.scaleInit"
                :min="0"
                :max="10"
              />
              <span>{{ treeconfig.minimap.scaleInit }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">Scale min</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.minimap.scaleRange[0]"
                :min="0"
                :max="10"
              />
              <span>{{ treeconfig.minimap.scaleRange[0] }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">Scale max</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.minimap.scaleRange[1]"
                :min="0"
                :max="10"
              />
              <span>{{ treeconfig.minimap.scaleRange[1] }}</span>
            </div>
          </el-col>
        </el-row> -->
      </el-collapse-item>
      <!-- 3.1节点名称 -->
      <el-collapse-item :title="$t('application.onodename')" name="15">
        <el-row class="line">
          <el-col :span="12">show</el-col>
          <el-col :span="12">
            <el-switch
              active-color="#42bec3"
              v-model="treeconfig.nodes.name.show"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">
            <label>mark</label>
          </el-col>
          <el-col :span="12">
            <el-select
              v-model="treeconfig.nodes.name.mark"
              @change="handleChange"
            >
              <el-option
                v-for="(item, index) in Mark"
                :label="index"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dx</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.nodes.name.dx"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.nodes.name.dx }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dy</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.nodes.name.dy"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.nodes.name.dy }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">fill</el-col>
          <el-col :span="12">
            <el-color-picker
              @change="handleChange"
              v-model="treeconfig.nodes.name.style.fill"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">fontSize</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.nodes.name.style['font-size']"
                :min="0"
                :max="60"
              />
              <span>{{ treeconfig.nodes.name.style["font-size"] }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">textAnchor</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-select
                v-model="treeconfig.nodes.name.style['text-anchor']"
                @change="handleChange"
              >
                <el-option
                  v-for="item in textAnchor"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">fontFamily</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-select
                v-model="treeconfig.nodes.name.style['font-family']"
                @change="handleChange"
              >
                <el-option
                  v-for="item in FontFamily"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>
      <!-- 3.2节点数值 -->
      <el-collapse-item :title="$t('application.onodevalue')" name="16">
        <el-row class="line">
          <el-col :span="12">show</el-col>
          <el-col :span="12">
            <el-switch
              active-color="#42bec3"
              v-model="treeconfig.nodes.value.show"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">
            <label>mark</label>
          </el-col>
          <el-col :span="12">
            <el-select
              v-model="treeconfig.nodes.value.mark"
              @change="handleChange"
            >
              <el-option
                v-for="(item, index) in Mark"
                :label="index"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dx</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.nodes.value.dx"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.nodes.value.dx }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dy</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.nodes.value.dy"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.nodes.value.dy }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">fill</el-col>
          <el-col :span="12">
            <el-color-picker
              @change="handleChange"
              v-model="treeconfig.nodes.value.style.fill"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">fontSize</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.nodes.value.style['font-size']"
                :min="0"
                :max="60"
              />
              <span>{{ treeconfig.nodes.value.style["font-size"] }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">textAnchor</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-select
                v-model="treeconfig.nodes.value.style['text-anchor']"
                @change="handleChange"
              >
                <el-option
                  v-for="item in textAnchor"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">fontFamily</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-select
                v-model="treeconfig.nodes.value.style['font-family']"
                @change="handleChange"
              >
                <el-option
                  v-for="item in FontFamily"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>
      <!-- 3.3节点符号 -->
      <el-collapse-item :title="$t('application.onodesymbol')" name="17">
        <div class="line">
          <el-row>
            <el-col :span="12">symbol</el-col>
            <el-col :span="12">
              <el-upload
                style="display: inline-block; padding-right: 5px"
                ref="symbolupload"
                class="upload-demo"
                action=""
                :limit="1"
                accept=".csv"
                :max-size="maxFileSize"
                :on-exceed="handleSymbolExceed"
                :on-change="handleSymbolChange"
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
            <!-- <el-col :span="6">
              <a :href="symbolurl1">
                <el-tooltip content="detailed" placement="bottom" effect="light">
                  <el-button size="small" color="#42bec3" :icon="Download" />
                </el-tooltip>
              </a>
            </el-col>
            <el-col :span="6">
              <a :href="symbolurl2">
                <el-tooltip content="simple" placement="bottom" effect="light">
                  <el-button size="small" color="#42bec3" :icon="Download" />
                </el-tooltip>
              </a>
            </el-col> -->
            <el-col :span="12">
              <a :href="symbolurl2">
                <el-button size="small" color="#42bec345" style="color: black"
                  >simple</el-button
                >
              </a>
              <a :href="symbolurl1">
                <el-button size="small" color="#42bec3">detailed</el-button>
              </a>
            </el-col>
          </el-row>
        </div>
        <el-row class="line">
          <el-col :span="12">show</el-col>
          <el-col :span="12">
            <el-switch
              active-color="#42bec3"
              v-model="treeconfig.nodes.symbol.show"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">
            <label>type</label>
          </el-col>
          <el-col :span="12">
            <el-select
              v-model="treeconfig.nodes.symbol.type"
              @change="handleChange"
            >
              <el-option
                v-for="(item, index) in symbolTypeObj"
                :label="index"
                :value="index"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">
            <label>mark</label>
          </el-col>
          <el-col :span="12">
            <el-select
              v-model="treeconfig.nodes.symbol.mark"
              @change="handleChange"
            >
              <el-option
                v-for="(item, index) in Mark"
                :label="index"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dx</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.nodes.symbol.dx"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.nodes.symbol.dx }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dy</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.nodes.symbol.dy"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.nodes.symbol.dy }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">innerRadius</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.nodes.symbol.innerRadius"
                :min="0"
                :max="30"
              />
              <span>{{ treeconfig.nodes.symbol.innerRadius }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">outerRadius</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.nodes.symbol.outerRadius"
                :min="0"
                :max="30"
              />
              <span>{{ treeconfig.nodes.symbol.outerRadius }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">size</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.nodes.symbol.size"
                :min="0"
                :max="30"
              />
              <span>{{ treeconfig.nodes.symbol.size }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">distance</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.nodes.symbol.distance"
                :min="0"
                :max="20"
              />
              <span>{{ treeconfig.nodes.symbol.distance }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">maxLength</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.nodes.symbol.maxLength"
                :min="0"
                :max="10"
                :step="0.01"
              />
              <span>{{ treeconfig.nodes.symbol.maxLength }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">fill</el-col>
          <el-col :span="12">
            <el-color-picker
              @change="handleChange"
              v-model="treeconfig.nodes.symbol.style.fill"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">stroke</el-col>
          <el-col :span="12">
            <el-color-picker
              @change="handleChange"
              v-model="treeconfig.nodes.symbol.style.stroke"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">strokeWidth</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.nodes.symbol.style['stroke-width']"
                :min="0"
                :max="10"
                :step="0.01"
              />
              <span>{{ treeconfig.nodes.symbol.style["stroke-width"] }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">strokeOpacity</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.nodes.symbol.style['stroke-opacity']"
                :min="0"
                :max="1"
                :step="0.01"
              />
              <span>{{ treeconfig.nodes.symbol.style["stroke-opacity"] }}</span>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>
      <!-- 4.叶节点设置 -->
      <el-collapse-item :title="$t('application.oleafsettings')" name="18">
        <div class="line">
          <el-row>
            <el-col :span="12">leaf</el-col>
            <el-col :span="12">
              <el-upload
                style="display: inline-block; padding-right: 5px"
                ref="leafupload"
                class="upload-demo"
                action=""
                :limit="1"
                accept=".csv"
                :max-size="maxFileSize"
                :on-exceed="handleLeafExceed"
                :on-change="handleLeafChange"
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
            <!-- <el-col :span="6">
              <a :href="leafurl1">
                <el-button size="small" color="#42bec3" :icon="Download" />
              </a>
            </el-col>
            <el-col :span="6">
              <a :href="leafurl2">
                <el-button size="small" color="#42bec3" :icon="Download" />
              </a>
            </el-col> -->
            <el-col :span="12">
              <a :href="leafurl2">
                <el-button size="small" color="#42bec345" style="color: black"
                  >simple</el-button
                >
              </a>
              <a :href="leafurl1">
                <el-button size="small" color="#42bec3">detailed</el-button>
              </a>
            </el-col>
          </el-row>
        </div>
        <el-row class="line">
          <el-col :span="12">show</el-col>
          <el-col :span="12">
            <el-switch
              active-color="#42bec3"
              v-model="treeconfig.leafs.show"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dx</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.leafs.dx"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.leafs.dx }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dy</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.leafs.dy"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.leafs.dy }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">distance</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.leafs.distance"
                :min="0"
                :max="20"
              />
              <span>{{ treeconfig.leafs.distance }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">fill</el-col>
          <el-col :span="12">
            <el-color-picker
              @change="handleChange"
              v-model="treeconfig.leafs.style.fill"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">fontSize</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.leafs.style['font-size']"
                :min="0"
                :max="60"
              />
              <span>{{ treeconfig.leafs.style["font-size"] }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">opacity</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.leafs.style.opacity"
                :min="0"
                :max="1"
                :step="0.01"
              />
              <span>{{ treeconfig.leafs.style.opacity }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">fontFamily</el-col>
          <el-col :span="12">
            <el-select
              v-model="treeconfig.leafs.style['font-family']"
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
      </el-collapse-item>
      <!-- 5.叶节点遮照 -->
      <el-collapse-item :title="$t('application.oleafmask')" name="19">
        <div class="line">
          <el-row>
            <el-col :span="12">mask</el-col>
            <el-col :span="12">
              <el-upload
                style="display: inline-block; padding-right: 5px"
                ref="maskupload"
                class="upload-demo"
                action=""
                :limit="1"
                accept=".csv"
                :max-size="maxFileSize"
                :on-exceed="handleMaskExceed"
                :on-change="handleMaskChange"
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
            <!-- <el-col :span="6">
              <a :href="maskurl1">
                <el-button size="small" color="#42bec3" :icon="Download" />
              </a>
            </el-col>
            <el-col :span="6">
              <a :href="maskurl2">
                <el-button size="small" color="#42bec3" :icon="Download" />
              </a>
            </el-col> -->
            <el-col :span="12">
              <a :href="maskurl2">
                <el-button size="small" color="#42bec345" style="color: black"
                  >simple</el-button
                >
              </a>
              <a :href="maskurl1">
                <el-button size="small" color="#42bec3">detailed</el-button>
              </a>
            </el-col>
          </el-row>
        </div>
        <el-row class="line">
          <el-col :span="12">show</el-col>
          <el-col :span="12">
            <el-switch
              active-color="#42bec3"
              v-model="treeconfig.mask.show"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dx</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.mask.dx"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.mask.dx }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dy</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.mask.dy"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.mask.dy }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">isAnnulus</el-col>
          <el-col :span="12">
            <el-switch
              active-color="#42bec3"
              v-model="treeconfig.mask.isAnnulus"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">opacity</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.mask.style.opacity"
                :min="0"
                :max="1"
                :step="0.01"
              />
              <span>{{ treeconfig.mask.style.opacity }}</span>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>
      <!-- 6.元数据配置 -->
      <el-collapse-item
        :title="$t('application.ometadataconfiguration')"
        name="20"
      >
        <div class="line">
          <el-row>
            <el-col :span="12">metadata</el-col>
            <el-col :span="12">
              <el-upload
                style="display: inline-block; padding-right: 5px"
                ref="metadataupload"
                class="upload-demo"
                action=""
                :limit="1"
                accept=".csv"
                :max-size="maxFileSize"
                :on-exceed="handleMetadataExceed"
                :on-change="handleMetadataChange"
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
            <!-- <el-col :span="6">
              <a :href="metadataurl1">
                <el-tooltip content="detailed" placement="bottom" effect="light">
                  <el-button size="small" color="#42bec3" :icon="Download" />
                </el-tooltip>
              </a>
            </el-col>
            <el-col :span="6">
              <a :href="metadataurl2">
                <el-tooltip content="simple" placement="bottom" effect="light">
                  <el-button size="small" color="#42bec3" :icon="Download" />
                </el-tooltip>
              </a>
            </el-col> -->
            <el-col :span="12">
              <a :href="metadataurl2">
                <el-button size="small" color="#42bec345" style="color: black"
                  >simple</el-button
                >
              </a>
              <a :href="metadataurl1">
                <el-button size="small" color="#42bec3">detailed</el-button>
              </a>
            </el-col>
          </el-row>
        </div>
        <el-row class="line">
          <el-col :span="12">show</el-col>
          <el-col :span="12">
            <el-switch
              active-color="#42bec3"
              v-model="treeconfig.sign.show"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dx</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.sign.dx"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.sign.dx }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dy</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.sign.dy"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.sign.dy }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">distance</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.sign.distance"
                :min="0"
                :max="20"
              />
              <span>{{ treeconfig.sign.distance }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">ringMargin</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.sign.ringMargin"
                :min="0"
                :max="20"
              />
              <span>{{ treeconfig.sign.ringMargin }}</span>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>
      <!-- 7.提示浮框配置 -->
      <el-collapse-item
        :title="$t('application.otooltipconfiguration')"
        name="21"
      >
        <div class="line">
          <el-row>
            <el-col :span="12">tooltip</el-col>
            <el-col :span="12">
              <el-upload
                style="display: inline-block; padding-right: 5px"
                ref="tooltipupload"
                class="upload-demo"
                action=""
                :limit="1"
                accept=".csv"
                :max-size="maxFileSize"
                :on-exceed="handleTooltipExceed"
                :on-change="handleTooltipChange"
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
              <a :href="tooltipurl">
                <el-button size="small" color="#42bec3" :icon="Download" />
              </a>
            </el-col>
          </el-row>
        </div>
        <el-row class="line">
          <el-col :span="12">show</el-col>
          <el-col :span="12">
            <el-switch
              active-color="#42bec3"
              v-model="treeconfig.tooltip.show"
              @change="handleChange"
            />
          </el-col>
        </el-row>
      </el-collapse-item>
      <!-- 8.分支样式 -->
      <el-collapse-item :title="$t('application.obranchstyle')" name="22">
        <el-row class="line">
          <el-col :span="12">fill</el-col>
          <el-col :span="12">
            <el-color-picker
              @change="handleChange"
              v-model="treeconfig.links.style.fill"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">stroke</el-col>
          <el-col :span="12">
            <el-color-picker
              @change="handleChange"
              v-model="treeconfig.links.style.stroke"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">strokeWidth</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.links.style['stroke-width']"
                :min="0"
                :max="10"
                :step="0.01"
              />
              <span>{{ treeconfig.links.style["stroke-width"] }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">strokeOpacity</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.links.style['stroke-opacity']"
                :min="0"
                :max="1"
                :step="0.01"
              />
              <span>{{ treeconfig.links.style["stroke-opacity"] }}</span>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>
      <!-- 9.分支虚线 -->
      <el-collapse-item :title="$t('application.obranchalignment')" name="23">
        <el-row class="line">
          <el-col :span="12">show</el-col>
          <el-col :span="12">
            <el-switch
              active-color="#42bec3"
              v-model="treeconfig.extension.show"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">fill</el-col>
          <el-col :span="12">
            <el-color-picker
              @change="handleChange"
              v-model="treeconfig.extension.style.fill"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">stroke</el-col>
          <el-col :span="12">
            <el-color-picker
              @change="handleChange"
              v-model="treeconfig.extension.style.stroke"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">strokeDasharray</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.extension.style['stroke-dasharray']"
                :min="0"
                :max="10"
              />
              <span>{{ treeconfig.extension.style["stroke-dasharray"] }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">strokeWidth</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.extension.style['stroke-width']"
                :min="0"
                :max="10"
                :step="0.01"
              />
              <span>{{ treeconfig.extension.style["stroke-width"] }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">strokeOpacity</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.extension.style['stroke-opacity']"
                :min="0"
                :max="1"
                :step="0.01"
              />
              <span>{{ treeconfig.extension.style["stroke-opacity"] }}</span>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>
      <!-- 10.分支折叠 -->
      <el-collapse-item :title="$t('application.obranchfolding')" name="24">
        <p style="color: red; font-size: 12px">
          *Please first set the innter node symbol at Node Symbol items.
        </p>
        <el-row class="line">
          <el-col :span="12">show</el-col>
          <el-col :span="12">
            <el-switch
              active-color="#42bec3"
              v-model="treeconfig.collapse.show"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dx</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.collapse.dx"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.collapse.dx }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dy</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.collapse.dy"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.collapse.dy }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">rotate</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.collapse.rotate"
                :min="0"
                :max="360"
              />
              <span>{{ treeconfig.collapse.rotate }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">width</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.collapse.size[0]"
                :min="0"
                :max="360"
              />
              <span>{{ treeconfig.collapse.size[0] }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">height</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.collapse.size[1]"
                :min="0"
                :max="360"
              />
              <span>{{ treeconfig.collapse.size[1] }}</span>
            </div>
          </el-col>
        </el-row>
        <!-- style -->
        <el-row>
          <el-col :span="6">
            <label class="rowlabel">style</label>
          </el-col>
          <el-col :span="18" style="margin: 10px 0">
            <el-row class="line2">
              <el-col :span="12">fill</el-col>
              <el-col :span="12">
                <el-color-picker
                  @change="handleChange"
                  v-model="treeconfig.collapse.style.fill"
                />
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">stroke</el-col>
              <el-col :span="12">
                <el-color-picker
                  @change="handleChange"
                  v-model="treeconfig.collapse.style.stroke"
                />
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">opacity</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.collapse.style.opacity"
                    :min="0"
                    :max="1"
                    :step="0.01"
                  />
                  <span>{{ treeconfig.collapse.style.opacity }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">strokeDasharray</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.collapse.style['stroke-dasharray']"
                    :min="0"
                    :max="10"
                  />
                  <span>{{
                    treeconfig.collapse.style["stroke-dasharray"]
                  }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">strokeWidth</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.collapse.style['stroke-width']"
                    :min="0"
                    :max="10"
                    :step="0.01"
                  />
                  <span>{{ treeconfig.collapse.style["stroke-width"] }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">strokeOacity</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.collapse.style['stroke-opacity']"
                    :min="0"
                    :max="1"
                    :step="0.01"
                  />
                  <span>{{ treeconfig.collapse.style["stroke-opacity"] }}</span>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- textStyle -->
        <el-row>
          <el-col :span="6">
            <label class="rowlabel">textStyle</label>
          </el-col>
          <el-col :span="18" style="margin: 10px 0">
            <el-row class="line2">
              <el-col :span="12">fontSize</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.collapse.textStyle['font-size']"
                    :min="0"
                    :max="60"
                  />
                  <span>{{ treeconfig.collapse.textStyle["font-size"] }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">textAnchor</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-select
                    v-model="treeconfig.nodes.name.style['text-anchor']"
                    @change="handleChange"
                  >
                    <el-option
                      v-for="item in textAnchor"
                      :label="item"
                      :value="item"
                    ></el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">fontFamily</el-col>
              <el-col :span="12">
                <el-select
                  v-model="treeconfig.collapse.textStyle['font-family']"
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
            <el-row class="line2">
              <el-col :span="12">fill</el-col>
              <el-col :span="12">
                <el-color-picker
                  @change="handleChange"
                  v-model="treeconfig.collapse.textStyle.fill"
                />
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">stroke</el-col>
              <el-col :span="12">
                <el-color-picker
                  @change="handleChange"
                  v-model="treeconfig.collapse.textStyle.stroke"
                />
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">opacity</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.collapse.textStyle.opacity"
                    :min="0"
                    :max="1"
                    :step="0.01"
                  />
                  <span>{{ treeconfig.collapse.textStyle.opacity }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">strokeDasharray</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.collapse.textStyle['stroke-dasharray']"
                    :min="0"
                    :max="10"
                  />
                  <span>{{
                    treeconfig.collapse.textStyle["stroke-dasharray"]
                  }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">strokeWidth</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.collapse.textStyle['stroke-width']"
                    :min="0"
                    :max="10"
                    :step="0.01"
                  />
                  <span>{{
                    treeconfig.collapse.textStyle["stroke-width"]
                  }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">strokeOacity</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.collapse.textStyle['stroke-opacity']"
                    :min="0"
                    :max="1"
                    :step="0.01"
                  />
                  <span>{{
                    treeconfig.collapse.textStyle["stroke-opacity"]
                  }}</span>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- symbolStyle -->
        <el-row>
          <el-col :span="8">
            <label class="rowlabel">symbolStyle</label>
          </el-col>
          <el-col :span="16" style="margin: 10px 0">
            <el-row class="line2">
              <el-col :span="12">fill</el-col>
              <el-col :span="12">
                <el-color-picker
                  @change="handleChange"
                  v-model="treeconfig.collapse.symbolStyle.fill"
                />
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">stroke</el-col>
              <el-col :span="12">
                <el-color-picker
                  @change="handleChange"
                  v-model="treeconfig.collapse.symbolStyle.stroke"
                />
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">opacity</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.collapse.symbolStyle.opacity"
                    :min="0"
                    :max="1"
                    :step="0.01"
                  />
                  <span>{{ treeconfig.collapse.symbolStyle.opacity }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">strokeDasharray</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="
                      treeconfig.collapse.symbolStyle['stroke-dasharray']
                    "
                    :min="0"
                    :max="10"
                  />
                  <span>{{
                    treeconfig.collapse.symbolStyle["stroke-dasharray"]
                  }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">strokeWidth</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.collapse.symbolStyle['stroke-width']"
                    :min="0"
                    :max="10"
                    :step="0.01"
                  />
                  <span>{{
                    treeconfig.collapse.symbolStyle["stroke-width"]
                  }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">strokeOacity</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.collapse.symbolStyle['stroke-opacity']"
                    :min="0"
                    :max="1"
                    :step="0.01"
                  />
                  <span>{{
                    treeconfig.collapse.symbolStyle["stroke-opacity"]
                  }}</span>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-collapse-item>
      <!-- 分支优化 -->
      <el-collapse-item :title="$t('application.obranchoptimization')">
        <el-row class="line">
          <el-col :span="12">show</el-col>
          <el-col :span="12">
            <el-switch
              active-color="#42bec3"
              v-model="treeconfig.stretch.show"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">configure</el-col>
          <el-col :span="12">
            <el-button
              size="small"
              color="#42bec3"
              @click="addline"
              :icon="Plus"
            ></el-button>
          </el-col>
        </el-row>
        <el-row class="lineul">
          <el-col :span="24">
            <ul>
              <li v-for="(item, index) in treeconfig.stretch.data">
                <div class="lileft">
                  {{ index + 1 }}
                </div>
                <div class="liright">
                  <el-row>
                    <el-col :span="24">
                      <label>max:</label>
                      <el-slider
                        @change="handleChange"
                        v-model="item.maxLength"
                        :min="stretchdatamin"
                        :max="stretchdatamax"
                        :step="0.001"
                      />
                      <span>{{ item.maxLength }}</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <label style="width: 55px">multiple:</label>
                      <el-slider
                        @change="handleChange"
                        v-model="item.multiple"
                        :step="0.001"
                      />
                      <span>{{ item.multiple }}</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <label style="width: 55px">color:</label>
                      <el-color-picker
                        v-model="item.color"
                        @change="handleChange"
                      />
                    </el-col>
                  </el-row>
                  <el-button
                    type="warning"
                    size="mini"
                    circle
                    @click="deleteLine(index)"
                    :icon="Delete"
                    @change="handleChange"
                  ></el-button>
                </div>
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-collapse-item>
      <!-- 11.图例配置 -->
      <el-collapse-item
        :title="$t('application.olegendconfiguration')"
        name="25"
      >
        <div class="line">
          <el-row>
            <el-col :span="12">legend</el-col>
            <el-col :span="12">
              <el-upload
                style="display: inline-block; padding-right: 5px"
                ref="legendupload"
                class="upload-demo"
                action=""
                :limit="1"
                accept=".csv"
                :max-size="maxFileSize"
                :on-exceed="handleLegendExceed"
                :on-change="handleLegendChange"
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
              <a :href="legendurl">
                <el-button size="small" color="#42bec3" :icon="Download" />
              </a>
            </el-col>
          </el-row>
        </div>

        <el-row class="line">
          <el-col :span="12">show</el-col>
          <el-col :span="12">
            <el-switch
              active-color="#42bec3"
              v-model="treeconfig.legend.show"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dx</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.legend.dx"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.legend.dx }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dy</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.legend.dy"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.legend.dy }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">distance</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.legend.distance"
                :min="0"
                :max="20"
              />
              <span>{{ treeconfig.legend.distance }}</span>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>

      <!-- 比例尺 -->
      <el-collapse-item :title="$t('application.oscale')" name="26-2">
        <el-row class="line">
          <el-col :span="12">show</el-col>
          <el-col :span="12">
            <el-switch
              active-color="#42bec3"
              v-model="treeconfig.scaleBar.show"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dx</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.scaleBar.dx"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.scaleBar.dx }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dy</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.scaleBar.dy"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.scaleBar.dy }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">length</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.scaleBar.length"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.scaleBar.length }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">stroke</el-col>
          <el-col :span="12">
            <el-color-picker
              @change="handleChange"
              v-model="treeconfig.scaleBar.stroke"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">tickSize</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.scaleBar.tickSize"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.scaleBar.tickSize }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">fontSize</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.scaleBar.fontSize"
                :min="12"
                :max="100"
              />
              <span>{{ treeconfig.scaleBar.fontSize }}</span>
            </div>
          </el-col>
        </el-row>
      </el-collapse-item>
      <!-- 刻度 -->
      <el-collapse-item :title="$t('application.oscaleproperties')" name="26">
        <el-row class="line">
          <el-col :span="12">show</el-col>
          <el-col :span="12">
            <el-switch
              active-color="#42bec3"
              v-model="treeconfig.scaleLinear.show"
              @change="handleChange"
            />
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dx</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.scaleLinear.dx"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.scaleLinear.dx }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">dy</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.scaleLinear.dy"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.scaleLinear.dy }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">ticks</el-col>
          <el-col :span="12">
            <div class="slider">
              <el-slider
                @change="handleChange"
                v-model="treeconfig.scaleLinear.ticks"
                :min="-100"
                :max="100"
              />
              <span>{{ treeconfig.scaleLinear.ticks }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">
            <label>type</label>
          </el-col>
          <el-col :span="12">
            <el-select
              v-model="treeconfig.scaleLinear.type"
              @change="handleChange"
            >
              <el-option
                v-for="(item, index) in Type"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">
            <label>timeFormat</label>
          </el-col>
          <el-col :span="12">
            <el-input
              v-model="treeconfig.scaleLinear.timeFormat"
              @change="handleChange"
            ></el-input>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">
            <label>position</label>
          </el-col>
          <el-col :span="12">
            <el-select
              v-model="treeconfig.scaleLinear.position"
              @change="handleChange"
            >
              <el-option
                v-for="(item, index) in Position"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="line">
          <el-col :span="12">
            <label>domain</label>
          </el-col>
          <el-col :span="12">
            <el-input
              type="number"
              placeholder="min"
              style="width: 50px; display: inline-block"
              v-model="treeconfig.scaleLinear.domain[0]"
              @change="handleChange"
            ></el-input>
            -
            <el-input
              type="number"
              placeholder="max"
              style="width: 50px; display: inline-block"
              v-model="treeconfig.scaleLinear.domain[1]"
              @change="handleChange"
            ></el-input>
          </el-col>
        </el-row>
        <!-- yLine -->
        <el-row>
          <el-col :span="6">
            <label class="rowlabel">yLine</label>
          </el-col>
          <el-col :span="18" style="margin: 10px 0">
            <el-row class="line2">
              <el-col :span="12">show</el-col>
              <el-col :span="12">
                <el-switch
                  active-color="#42bec3"
                  v-model="treeconfig.scaleLinear.yLine.show"
                  @change="handleChange"
                />
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">stroke</el-col>
              <el-col :span="12">
                <el-color-picker
                  @change="handleChange"
                  v-model="treeconfig.scaleLinear.yLine.style.stroke"
                />
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">strokeDasharray</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="
                      treeconfig.scaleLinear.yLine.style['stroke-dasharray']
                    "
                    :min="0"
                    :max="10"
                  />
                  <span>{{
                    treeconfig.scaleLinear.yLine.style["stroke-dasharray"]
                  }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">strokeWidth</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.scaleLinear.yLine.style['stroke-width']"
                    :min="0"
                    :max="10"
                    :step="0.01"
                  />
                  <span>{{
                    treeconfig.scaleLinear.yLine.style["stroke-width"]
                  }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">strokeOacity</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.scaleLinear.yLine.style.opacity"
                    :min="0"
                    :max="1"
                    :step="0.01"
                  />
                  <span>{{ treeconfig.scaleLinear.yLine.style.opacity }}</span>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- xTick -->
        <el-row>
          <el-col :span="6">
            <label class="rowlabel">xTick</label>
          </el-col>
          <el-col :span="18" style="margin: 10px 0">
            <el-row class="line2">
              <el-col :span="12">show</el-col>
              <el-col :span="12">
                <el-switch
                  active-color="#42bec3"
                  v-model="treeconfig.scaleLinear.xTick.show"
                  @change="handleChange"
                />
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">dx</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.scaleLinear.xTick.dx"
                    :min="-100"
                    :max="100"
                  />
                  <span>{{ treeconfig.scaleLinear.xTick.dx }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">dy</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.scaleLinear.xTick.dy"
                    :min="-100"
                    :max="100"
                  />
                  <span>{{ treeconfig.scaleLinear.xTick.dy }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">stroke</el-col>
              <el-col :span="12">
                <el-color-picker
                  @change="handleChange"
                  v-model="treeconfig.scaleLinear.xTick.style.stroke"
                />
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">strokeWidth</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.scaleLinear.xTick.style['stroke-width']"
                    :min="0"
                    :max="10"
                    :step="0.01"
                  />
                  <span>{{
                    treeconfig.scaleLinear.xTick.style["stroke-width"]
                  }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">strokeOpacity</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.scaleLinear.xTick.style['opacity']"
                    :min="0"
                    :max="1"
                    :step="0.01"
                  />
                  <span>{{
                    treeconfig.scaleLinear.xTick.style["opacity"]
                  }}</span>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- label -->
        <el-row>
          <el-col :span="6">
            <label class="rowlabel">label</label>
          </el-col>
          <el-col :span="18" style="margin: 10px 0">
            <el-row class="line2">
              <el-col :span="12">show</el-col>
              <el-col :span="12">
                <el-switch
                  active-color="#42bec3"
                  v-model="treeconfig.scaleLinear.label.show"
                  @change="handleChange"
                />
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">dx</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.scaleLinear.label.dx"
                    :min="-100"
                    :max="100"
                  />
                  <span>{{ treeconfig.scaleLinear.label.dx }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">dy</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.scaleLinear.label.dy"
                    :min="-100"
                    :max="100"
                  />
                  <span>{{ treeconfig.scaleLinear.label.dy }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">suffix</el-col>
              <el-col :span="12">
                <el-input
                  @change="handleChange"
                  v-model="treeconfig.scaleLinear.label.suffix"
                />
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">fill</el-col>
              <el-col :span="12">
                <el-color-picker
                  @change="handleChange"
                  v-model="treeconfig.scaleLinear.label.style.fill"
                />
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">stroke</el-col>
              <el-col :span="12">
                <el-color-picker
                  @change="handleChange"
                  v-model="treeconfig.scaleLinear.label.style.stroke"
                />
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">strokeWidth</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.scaleLinear.label.style['stroke-width']"
                    :min="0"
                    :max="10"
                    :step="0.01"
                  />
                  <span>{{
                    treeconfig.scaleLinear.label.style["stroke-width"]
                  }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">fontSize</el-col>
              <el-col :span="12">
                <div class="slider">
                  <el-slider
                    @change="handleChange"
                    v-model="treeconfig.labelfontSize"
                    :min="0"
                    :max="60"
                  />
                  <span>{{ treeconfig.labelfontSize }}</span>
                </div>
              </el-col>
            </el-row>
            <el-row class="line2">
              <el-col :span="12">textAnchor</el-col>
              <el-col :span="12">
                <el-select
                  v-model="treeconfig.labeltextAnchor"
                  @change="handleChange"
                >
                  <el-option
                    v-for="item in textAnchor"
                    :label="item"
                    :value="item"
                  ></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script setup>
import { ref, reactive, nextTick, watch, onMounted } from "vue";
import { Plus, Delete, Download } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { jhsupload, jhscfg, jhsuploadcfg } from "@/api/application/index.js";
import { maxFileSize, webUrl, openLoading, closeLoading } from "@/utils/utils.js";
import { Layout, FontFamily, Sort, Mark, textAnchor, symbolTypeObj, Type, Position } from "@/components/constants.js";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const emit = defineEmits(["treeOrdinaryConfigTrans"]);
const props = defineProps({ treeordinaryMessage: Object });
const activeTreeOrdinary = ref(["11"]);
const collapseOrdinaryChange = (val) => {};
const baseupload = ref(null);
const symbolupload = ref(null);
const leafupload = ref(null);
const maskupload = ref(null);
const metadataupload = ref(null);
const tooltipupload = ref(null);
const legendupload = ref(null);
// const stretchdata = reactive([]);
const stretchdatamin = ref(0);
const stretchdatamax = ref(0);
const ordinaryurl = webUrl + "jhs/download/1897";
const symbolurl1 = webUrl + "jhs/download/1895"; //复杂
const symbolurl2 = webUrl + "jhs/download/1896"; //简单

const leafurl1 = webUrl + "jhs/download/1892"; //复杂
const leafurl2 = webUrl + "jhs/download/2332"; //简单
const maskurl1 = webUrl + "jhs/download/2235"; //复杂
const maskurl2 = webUrl + "jhs/download/2236"; //简单
const metadataurl1 = webUrl + "jhs/download/1893"; //复杂
const metadataurl2 = webUrl + "jhs/download/1894"; //简单

const tooltipurl = webUrl + "jhs/download/1890";
const legendurl = webUrl + "jhs/download/1891";
let newsymbol = "";
let newleafs = "";
let newsign = "";
let newtooltip = "";
let newlegend = "";
let newdivision = "";
let oldsymbol = "";
let oldleafs = "";
let oldsign = "";
let oldtooltip = "";
let oldlegend = "";
let olddivision = "";
let treeconfig = ref({
  id: "",
  content: "",
  // 1.基本配置
  layout: "tree",
  isPhylogram: true,
  isWheelZoom: true,
  separation: 18,
  scale: 1,
  rotationAngle: 0,
  sort: "lengthDes",
  language: "en",
  treesize: [],
  radialsize: [350, 1000],
  size: [], //350,1000
  // 2.全局样式
  style: {
    fill: "rgba(0, 0, 0, 1)",
    stroke: "rgba(0, 0, 0, 1)",
    "stroke-width": 0,
    "font-size": 12,
    "font-family": "Microsoft YaHei",
  },
  // 缩略图
  minimap: {
    show: false,
    scaleInit: 0.1,
    scaleRange: [0.5, 1.5],
  },
  // 3节点名称、节点数值、节点符号
  nodes: {
    // 节点名称
    name: {
      show: false,
      mark: "node", //leaf node all
      dx: 0,
      dy: 0,
      style: {
        // "text-anchor": 'start',
        fill: "#000",
        "font-size": 12,
        "font-family": "sans-serif",
        "text-anchor": "start",
        // 'stroke-linejoin': "round", //指明路径的转角处使用的形状或者绘制的基础形状。
        // 'stroke-width': 0, //路径的转角处形状宽度。
        // stroke: "white",
      },
      // formatter: function (data, d) { //可修改 name 值
      // },
      // onDom: function (dom) {  //dom实例，支持所有dom事件：click、mouseover、mouseout ...
      // dom.on("click", (e, d) => {
      // })
      // },
    },
    // 节点数值
    value: {
      show: false,
      mark: "all", //leaf node all
      dx: 0,
      dy: 0,
      position: "start", //start end 顶端还是末端
      style: {
        fill: "#9e227b",
        "font-size": 12,
        "font-family": "sans-serif",
        "text-anchor": "end",
      },
      // formatter: function (data, d) { //可修改 value 值
      // },
      // onDom: function (dom) {  //dom实例，支持所有dom事件：click、mouseover、mouseout ...
      // dom.on("click", (e, d) => {
      // })
      // },
    },
    // 节点符号
    symbol: {
      // xxxxx: {
      //     // ...symbol
      // },
      show: false,

      type: "circle", //pie circle bar
      mark: "leaf", //leaf node all
      dx: 0,
      dy: 0,
      size: 5,
      distance: 0,
      maxLength: 0.01,
      innerRadius: 0,
      outerRadius: 5,
      style: {
        // visibility: 'visible',
        fill: "#ddd",
        stroke: "#666",
        "stroke-width": 1,
        "stroke-opacity": 1,
        cursor: "pointer",
      },
      data: [
        // {
        //     name: '0.3',
        //     value: 0.3,
        //     style: {
        //         fill: '#F56C6C'
        //     }
        // }
      ],
      // formatter: function (d, dom) {
      // },
      // onDom: function (dom) {  //dom实例，支持所有dom事件：click、mouseover、mouseout ...
      // dom.on("click", (e, d) => {
      // })
      // },
    },
  },
  // 4.叶节点设置
  leafs: {
    show: true,
    dx: 0,
    dy: 0,
    distance: 1,
    style: {
      "font-size": 10,
      fill: "rgba(0, 0, 0, 1)",
      opacity: 1,
      // // 'stroke-dasharray': 3,
      "font-family": "sans-serif",
    },
    data: {
      xxxxx: {
        dx: 0,
        dy: 0,
        style: {
          "font-size": 10,
          // fill: '#333',
          opacity: 1,
        },
      },
    },
    // formatter: function (data, d) { //可修改 leaf 名称
    //     // return data.name.replace(/_/g, " ");
    // },
    // onDom: function (dom) {  //dom实例，支持所有dom事件：click、mouseover、mouseout ...
    // dom.on("click", (e, d) => {
    // })
    // },
  },
  // 5.叶节点遮照
  mask: {
    // leaf 下面的灰色底
    show: false,
    dx: 0,
    dy: 0,
    isAnnulus: false, //是否是环形
    padding: [0, 0],
    style: {
      opacity: 0.2,
    },
    data: {},
  },
  division: {
    show: true,
    data: [],
  },
  // 6.元数据配置metadata
  sign: {
    show: false,
    dx: 0,
    dy: 0,
    distance: 0, // 图例间隙大小
    ringMargin: 0, // 图例到外圆的间隙
    style: {
      "font-size": 10,
    },
    data: [
      // {
      //     dx: 0,
      //     dy: 0,
      //     distance: 0,  // radial
      //     label: {},
      //     data: {}
      // }
    ],
  },
  // 6.提示浮框配置
  tooltip: {
    show: true,
    data: {
      "GCA_904887025.1": [
        {
          label: "1",
          value: "1",
        },
      ],
    },
  },
  // 7.分支样式
  links: {
    type: "elbow", //elbow  smooth  line
    // isDynamic: false,
    style: {
      fill: "rgba(0, 0, 0, 0)",
      // "stroke-dasharray":'',
      stroke: "#333",
      "stroke-width": 0,
      "stroke-opacity": 0,
    },
    // formatter: function (d) {
    // },
    // onDom: function (dom) {  //dom实例，支持所有dom事件：click、mouseover、mouseout ...
    // dom.on("click", (e, d) => {
    // })
    // },
  },
  // 8.分支虚线
  extension: {
    //leaf 前面的虚线
    show: true,
    style: {
      fill: "rgba(0, 0, 0, 1)",
      stroke: "#333",
      "stroke-dasharray": 3,
      "stroke-width": 1,
      "stroke-opacity": 1,
      opacity: 0.5,
    },
  },
  // 9.分支折叠
  collapse: {
    show: false,
    isClickCollapse: true, //自动折叠后是否允许点击折叠
    dx: 0,
    dy: 0,
    rotate: 0,
    size: [20, 10],
    data: [], //需要折叠的内部节点
    leaf: [
      // {
      //     name: 'Hylobates',
      //     deep: 2,
      // }
    ], //需要折叠的叶节点 key：叶节点名称 value：深度

    style: {
      fill: "rgba(0, 0, 0, 0.3)",
      stroke: "#333",
      "stroke-opacity": 1,
      cursor: "pointer",
      "stroke-dasharray": 0,
      "stroke-width": 1,
      opacity: 1,
    },
    textStyle: {
      "font-size": 12,
      "font-family": "sans-serif",
      fill: "rgba(0, 0, 0, 0.3)",
      stroke: "#333",
      "text-anchor": "start",
      "stroke-opacity": 1,
      cursor: "pointer",
      "stroke-dasharray": 0,
      "stroke-width": 1,
      opacity: 1,
    },
    symbolStyle: {
      fill: "rgba(0, 0, 0, 0.3)",
      stroke: "#ff0000",
      "stroke-opacity": 1,
      cursor: "pointer",
      "stroke-dasharray": 0,
      "stroke-width": 1,
      opacity: 1,
    },
  },
  // 分支优化
  stretch: {
    show: false,
    data: [],
  },

  // 10.图例配置
  legend: {
    show: false,
    dx: 0,
    dy: 0,
    distance: 0,
    data: [],
  },
  scaleBar: {
    show: false,
    text: "scale",
    dx: 20,
    dy: 20,
    length: 80,
    thickness: 1,
    stroke: "#000",
    tickSize: 5,
    fontSize: 10,
    ty: 4,
  },
  // 11.比例尺
  scaleLinear: {
    show: false,
    dx: 0,
    dy: 0,
    ticks: 8,
    type: "time",
    timeFormat: "%Y-%m-%d %H:%M:%S",
    position: "top", //top bottom
    domain: [0, 0],
    yLine: {
      show: true,
      style: {
        stroke: "#eee",
        opacity: 0.5,
        "stroke-width": 0,
      },
    },
    xTick: {
      show: true,
      length: 4,
      dx: 0,
      dy: 0,
      style: {
        stroke: "#000",
        "stroke-width": 0.5,
        opacity: 0.1,
      },
    },
    label: {
      show: true,
      dx: 0,
      dy: 0,
      suffix: "",
      style: {
        fill: "#000",
        "text-anchor": "middle",
        "font-size": 8,
        stroke: "rgba(0, 0, 0, 1)",
        "stroke-width": 1,
      },
    },
  },
  tree_file_cfg:{
    leafs:'',
    symbol:'',
    sign:'',
    tooltip:'',
    legend:'',
    division:'',

  }
});
const addline = () => {
  treeconfig.value.stretch.data.push({
    maxLength: 0,
    multiple: 0,
    color: "#ff0000",
  });
};
const deleteLine = (num) => {
  treeconfig.value.stretch.data.splice(num, 1);
};
const treeConfigTrans = (treeconfigvalue) => {
  if (treeconfigvalue.content) {
      treeconfigvalue.tree_file_cfg.leafs = newleafs ? newleafs : oldleafs;
      treeconfigvalue.tree_file_cfg.symbol = newsymbol ? newsymbol : oldsymbol;
      treeconfigvalue.tree_file_cfg.sign = newsign ? newsign : oldsign;
      treeconfigvalue.tree_file_cfg.tooltip = newtooltip
        ? newtooltip
        : oldtooltip;
      treeconfigvalue.tree_file_cfg.legend = newlegend ? newlegend : oldlegend;
      treeconfigvalue.tree_file_cfg.division = newdivision
        ? newdivision
        : olddivision;
    emit("treeOrdinaryConfigTrans", treeconfigvalue);
  } else {
    noTreeFileWarning()
  }
};
// 没有上传树文件的提示
const noTreeFileWarning = () => {
  closeLoading()
  ElMessage({
      message: t("application.uploadtreefile"),
      type: "warning",
    });
};
// 1.newick文件上传
const handleTreeOrdinaryExceed = (files) => {
  baseupload.value.clearFiles();
  nextTick(() => {
    baseupload.value.handleStart(files[0]);
  });
};
const handleTreeOrdinaryChange = (file) => {
  treeconfig.value.nodes.symbol = {
    show: false,
    type: "circle", //pie circle bar
    mark: "leaf", //leaf node all
    dx: 0,
    dy: 0,
    size: 5,
    distance: 0,
    maxLength: 0.01,
    innerRadius: 0,
    outerRadius: 5,
    style: {
      fill: "#ddd",
      stroke: "#666",
      "stroke-width": 1,
      "stroke-opacity": 1,
      cursor: "pointer",
    },
    data: [],
  }; //节点符号
  treeconfig.value.division = {
    data: [],
    show: true,
  };
  treeconfig.value.leafs.data = {}; //叶节点设置
  treeconfig.value.mask.show = false;
  treeconfig.value.mask.data = {}; //叶节点遮照
  treeconfig.value.sign.data = []; // 元数据配置
  treeconfig.value.tooltip.data = {}; // 提示浮框配置
  treeconfig.value.legend.data = []; // 提示浮框配置
  if (file.size > maxFileSize) {
    ElMessage({
      message: t("application.curfileexceed"),
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
          treeconfig.value.id = res.id;
          treeconfig.value.content = res.content;
          stretchdatamin.value = res.min_len;
          stretchdatamax.value = res.max_len;
          treeConfigTrans(treeconfig.value);
        }
      })
      .catch((err) => {
        closeLoading();
      });
  }
};
// 2.symbol上传 节点符号
const handleSymbolExceed = (files) => {
  symbolupload.value.clearFiles();
  nextTick(() => {
    symbolupload.value.handleStart(files[0]);
  });
};
const handleSymbolChange = (file) => {
  if (file.size > maxFileSize) {
    ElMessage({
      message: t("application.curfileexceed"),
      type: "error",
    });
    return false;
  } else {
    openLoading();
    let tfile = file.raw;
    let formData = new FormData();
    formData.append("ds", tfile);
    formData.append("ftype", "symbol");
    formData.append("tree", treeconfig.value.id);
    if (treeconfig.value.id) {
      jhsuploadcfg(formData).then((res) => {
        closeLoading();
        if (res.code == "0") {
          Object.assign(treeconfig.value.nodes.symbol, res.content);
          newsymbol = res.id;
          treeConfigTrans(treeconfig.value);
        }
      });
    } else {
      noTreeFileWarning();
    }
  }
};
// 3.leaf上传 叶节点设置
const handleLeafExceed = (files) => {
  leafupload.value.clearFiles();
  nextTick(() => {
    leafupload.value.handleStart(files[0]);
  });
};
const handleLeafChange = (file) => {
  if (file.size > maxFileSize) {
    ElMessage({
      message: t("application.curfileexceed"),
      type: "error",
    });
    return false;
  } else {
    openLoading();
    let tfile = file.raw;
    let formData = new FormData();
    formData.append("ds", tfile);
    formData.append("ftype", "leafs");
    formData.append("tree", treeconfig.value.id);
    if (treeconfig.value.id) {
      jhsuploadcfg(formData).then((res) => {
        closeLoading();
        if (res.code == "0") {
          treeconfig.value.leafs.data = res.content;
          newleafs = res.id;
          treeConfigTrans(treeconfig.value);
        }
      });
    } else {
      noTreeFileWarning();
    }
  }
};
// 4.mask上传 叶节点遮照
const handleMaskExceed = (files) => {
  maskupload.value.clearFiles();
  nextTick(() => {
    maskupload.value.handleStart(files[0]);
  });
};
const handleMaskChange = (file) => {
  if (file.size > maxFileSize) {
    ElMessage({
      message: t("application.curfileexceed"),
      type: "error",
    });
    return false;
  } else {
    openLoading();
    let tfile = file.raw;
    let formData = new FormData();
    formData.append("ds", tfile);
    formData.append("ftype", "division");
    formData.append("tree", treeconfig.value.id);
    if (treeconfig.value.id) {
      jhsuploadcfg(formData).then((res) => {
        closeLoading();
        if (res.code == "0") {
          treeconfig.value.division.data = res.content;
          newdivision = res.id;
          treeConfigTrans(treeconfig.value);
        }
      });
    } else {
      noTreeFileWarning();
    }
  }
};
// 5.metadata上传 元数据配置
const handleMetadataExceed = (files) => {
  metadataupload.value.clearFiles();
  nextTick(() => {
    metadataupload.value.handleStart(files[0]);
  });
};

const handleMetadataChange = (file) => {
  if (file.size > maxFileSize) {
    ElMessage({
      message: t("application.curfileexceed"),
      type: "error",
    });
    return false;
  } else {
    openLoading();
    let tfile = file.raw;
    let formData = new FormData();
    formData.append("ds", tfile);
    formData.append("ftype", "sign");
    formData.append("tree", treeconfig.value.id);
    if (treeconfig.value.id) {
      jhsuploadcfg(formData).then((res) => {
        closeLoading();
        if (res.code == "0") {
          stretchdatamin.value = res.min_len;
          stretchdatamax.value = res.max_len;
          treeconfig.value.sign.data = res.content;
          newsign = res.id;
          treeConfigTrans(treeconfig.value);
        }
      });
    } else {
      noTreeFileWarning();
    }
  }
};
// 6.tooltip上传 提示浮框配置
const handleTooltipExceed = (files) => {
  tooltipupload.value.clearFiles();
  nextTick(() => {
    tooltipupload.value.handleStart(files[0]);
  });
};
const handleTooltipChange = (file) => {
  if (file.size > maxFileSize) {
    ElMessage({
      message: t("application.curfileexceed"),
      type: "error",
    });
    return false;
  } else {
    openLoading();
    let tfile = file.raw;
    let formData = new FormData();
    formData.append("ds", tfile);
    formData.append("ftype", "tooltip");
    formData.append("tree", treeconfig.value.id);
    if (treeconfig.value.id) {
      jhsuploadcfg(formData).then((res) => {
        closeLoading();
        if (res.code == "0") {
          treeconfig.value.tooltip.data = res.content;
          newtooltip = res.id;
          treeConfigTrans(treeconfig.value);
        }
      });
    } else {
      noTreeFileWarning();
    }
  }
};
// 7.legend上传  图例设置
const handleLegendExceed = (files) => {
  legendupload.value.clearFiles();
  nextTick(() => {
    legendupload.value.handleStart(files[0]);
  });
};
const handleLegendChange = (file) => {
  if (file.size > maxFileSize) {
    ElMessage({
      message: t("application.curfileexceed"),
      type: "error",
    });
    return false;
  } else {
    openLoading();
    let tfile = file.raw;
    let formData = new FormData();
    formData.append("ds", tfile);
    formData.append("ftype", "legend");
    formData.append("tree", treeconfig.value.id);
    if (treeconfig.value.id) {
      jhsuploadcfg(formData).then((res) => {
        closeLoading();
        if (res.code == "0") {
          treeconfig.value.legend.data = res.content;
          newlegend = res.id;
          treeConfigTrans(treeconfig.value);
        }
      });
    } else {
      noTreeFileWarning();
    }
  }
};
// 导入json 导出json
const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      let symbol = ""
      let leafs = ""
      let sign = ""
      let tooltip = ""
      let legend = ""
      let division = ""
      treeconfig.value = JSON.parse(event.target.result);
      oldsymbol = JSON.parse(event.target.result).tree_file_cfg.symbol
      oldleafs = JSON.parse(event.target.result).tree_file_cfg.leafs
      oldsign = JSON.parse(event.target.result).tree_file_cfg.sign
      oldtooltip = JSON.parse(event.target.result).tree_file_cfg.tooltip
      oldlegend = JSON.parse(event.target.result).tree_file_cfg.legend
      olddivision = JSON.parse(event.target.result).tree_file_cfg.division
      treeConfigTrans(treeconfig.value);
    };
    reader.readAsText(file);
  } else {
    treeconfig.value = null;
  }
};
const importJSON = () => {
  const input = document.querySelector(".ordinaryfile");
  input.click();
};
const exportJSON = () => {
  let jsonData = treeconfig.value;
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
// 配置项改动时触发
const handleChange = (params) => {
  if (params && params.key == "layout") {
    if (treeconfig.value.layout == "tree") {
      treeconfig.value.size = [];
    } else if (treeconfig.value.layout == "radial") {
      treeconfig.value.size = [350, 1000];
    }
  }
  treeConfigTrans(treeconfig.value);
};
const getConfig = (value) => {
  let params = {
    id: value.id,
    ctype: "tree",
  };
  jhscfg(params).then((res) => {
    if (res.code == 0) {
      treeconfig.value = JSON.parse(JSON.stringify(res.cfg));
      stretchdatamin.value = res.cfg.stretch.min_len;
      stretchdatamax.value = res.cfg.stretch.max_len;
      if (res.tree_file_cfg) {
        oldsymbol = res.tree_file_cfg.symbol;
        oldleafs = res.tree_file_cfg.leafs;
        oldsign = res.tree_file_cfg.sign;
        oldtooltip = res.tree_file_cfg.tooltip;
        oldlegend = res.tree_file_cfg.legend;
        olddivision = res.tree_file_cfg.division;
      }
      treeconfig.value.tree_file_cfg = {
        symbol: oldsymbol,
        leafs: oldleafs,
        sign: oldsign,
        tooltip: oldtooltip,
        legend: oldlegend,
        division: olddivision,
      };
      handleChange();
    }
  });
};
watch(
  () => props.treeordinaryMessage,
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
  :deep(.el-upload-list__item-file-name) {
    width: 100%;
    max-width: 90px;
  }
  .el-button {
    color: white;
  }
}
.upload-demo {
  flex: 1;
}

.lineul {
  .el-button.is-circle {
    padding: 0;
    width: 25px;
    height: 25px;
  }
  ul,
  li {
    margin: 0;
    padding-left: 5px;
    list-style: none;
    .el-row {
      margin: 3px;
      .el-col-24 {
        display: flex;
        label {
          width: 55px;
        }
        .el-input {
          flex: 1;
        }
      }
    }
  }
  li {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    display: flex;
    .lileft {
      width: 30px;
      height: 30px;
      border: 2px solid red;
      border-radius: 50%;
      line-height: 30px;
      margin-right: 10px;
      text-align: center;
      font-weight: bold;
      color: red;
    }
    .liright {
      flex: 1;
    }
  }
}
.line2 {
  height: 32px;
  line-height: 32px;
  border-left: 4px solid #c79ecf;
  padding-left: 5px;
  margin-bottom: 2px;
}
.rowlabel {
  border-left: 4px solid #42bec3;
  height: 36px;
  line-height: 36px;
  display: inline-block;
  padding-left: 5px;
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
    color: #42bec3;
    font-weight: bold;
  }
}
</style>
