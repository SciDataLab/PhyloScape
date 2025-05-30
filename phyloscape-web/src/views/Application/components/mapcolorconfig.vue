<template>
  <div>
    <el-form :model="mapcolorForm">
      <el-form-item :label="$t('application.maptype')">
        <el-select v-model="mapcolorForm.maptype" @change="handleChange">
          <el-option v-for="(item, index) in maptypeopts" :label="$t(item.id)" :value="item.value" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('application.islegend')">
        <el-switch active-color="#42bec3"
          v-model="mapcolorForm.legend.show"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item :label="$t('application.ocolor')">
        <ul>
          <li v-for="(item, index) in piecoloropts">
            {{ index }}
            <el-color-picker  show-alpha
              v-model="piecoloropts[index]"
              @change="handleChange"
            />
          </li>
        </ul>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { maptypeopts } from "@/utils/utils.js";
import { ref, watch, reactive } from "vue";
const emit = defineEmits(["colorTrans"]);
const props = defineProps({
  mapcolorMessage: Object,
});
const piecoloropts = ref({})
const colorForm = ref({});
const mapcolorForm = reactive({
  maptype: "http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=en&size=1&scl=1&style=7",
  color: piecoloropts,
  legend: {
    show:true,
    data:{}
  },
});
const handleChange = () => {
  emit("colorTrans", mapcolorForm);
};
const getConfig = (config) => {
  // for (let i in config.color) {
  //   colorForm.value[i] = config.color[i];
  // }
  piecoloropts.value = config.color;
  mapcolorForm.maptype = config.maptype;
  mapcolorForm.legend = config.legend;
};

watch(
  () => props.mapcolorMessage,
  (newvalue, oldvalue) => {
    if(newvalue){
      getConfig(newvalue);
    }
  },
  { deep: true }
);
</script>
