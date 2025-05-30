<template>
  <div>
    <el-form :model="mapdensityForm">
      <el-form-item :label="$t('application.maptype')">
        <el-select v-model="mapdensityForm.maptype" @change="handleChange">
          <el-option
            v-for="(item, index) in maptypeopts"
            :label="$t(item.id)"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('application.islegend')">
          <el-switch active-color="#42bec3" v-model="mapdensityForm.legend" @change="handleChange" />
        </el-form-item>
      <el-form-item :label="ocolor">
            <ul>
                <li v-for="(item,index) in piecoloropts">
                    {{ index }}
                    <el-color-picker v-model="piecoloropts[index]" show-alpha @change="handleChange"/>
                </li>
            </ul>
        </el-form-item>
        <el-form-item :label="$t('application.isouter')">
          <el-switch active-color="#42bec3" v-model="mapdensityForm.outline" @change="handleChange"/>
        </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { maptypeopts } from "@/utils/utils.js";
import { ref, reactive, watch } from "vue";
const emit = defineEmits(["densityTrans"]);
const props = defineProps({
    mapdensityMessage:Object
  })
const piecoloropts = ref({});
const colorForm = ref({});
const mapdensityForm = reactive({
  maptype:'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=en&size=1&scl=1&style=7',
  color: piecoloropts,
  outline:false,
  legend:true,
});
const handleChange = () => {
  emit("densityTrans", mapdensityForm);
};
const getConfig = (config) => {
  // for (let i in config.color) {
  //   colorForm.value[i] = config.color[i];
  // }
  piecoloropts.value = config.color;
  mapdensityForm.outline = config.outline
  mapdensityForm.legend = config.legend
};
watch(
  () => props.mapdensityMessage,
  (newvalue, oldvalue) => {
    if(newvalue){
      getConfig(newvalue);
    }
  },
  { deep: true }
);
</script>
