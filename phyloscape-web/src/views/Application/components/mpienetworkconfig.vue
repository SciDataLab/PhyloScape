<template>
  <div>
    <el-form :model="mpienetworkForm">
      <el-form-item :label="$t('application.islegend')">
          <el-switch active-color="#42bec3" v-model="mpienetworkForm.legend" @change="handleChange" />
        </el-form-item>
      <el-form-item :label="$t('application.piecolor')">
        <ul>
          <li v-for="(item, index) in piecoloropts">
            {{ index }}
            <el-color-picker show-alpha v-model="piecoloropts[index]" @change="handleChange" />
          </li>
        </ul>
      </el-form-item>
      <el-form-item :label="$t('application.linecurve')">
        <el-input v-model="mpienetworkForm.linecurveness" :step="0.1" :min="0" :max="1"  @change="handleChange"></el-input>
      </el-form-item>
      <el-form-item :label="$t('application.linetype')">
        <el-select v-model="mpienetworkForm.linetype"  @change="handleChange">
            <el-option :label="$t('application.linedashed')" value="dashed"></el-option>
            <el-option :label="$t('application.linesolid')" value="lines"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('application.linewidth')">
        <el-input v-model="mpienetworkForm.linewidth" type="number"  @change="handleChange"></el-input>
      </el-form-item>
      <el-form-item :label="$t('application.linecolor')">
        <el-color-picker show-alpha v-model="mpienetworkForm.linecolor" @change="handleChange" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, reactive, watch } from "vue";
const emit = defineEmits(["pienetworkTrans"]);
const props = defineProps({
  mpienetworkMessage: Object,
});
const piecoloropts = ref({});
const colorForm = ref({});
const mpienetworkForm = reactive({
  maptype:"http://t{0-7}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=7786923a385369346d56b966bb6ad62f",
  color: piecoloropts,
  linecurveness: 0.3,
  linetype:'lines',
  linewidth:1,
  linecolor:'rgba(73, 139, 162, 1)',
  legend:true,
});
const getConfig = (config) => {
  // for (let i in config.color) {
  //   colorForm.value[i] = config.color[i];
  // }
  piecoloropts.value = config.color;
  mpienetworkForm.linecurveness = config.linecurveness;
  mpienetworkForm.linetype = config.linetype;
  mpienetworkForm.linewidth = config.linewidth;
  mpienetworkForm.linecolor = config.linecolor;
  mpienetworkForm.legend = config.legend
};
const handleChange = () => {
  emit("pienetworkTrans", mpienetworkForm);
};
watch(
  () => props.mpienetworkMessage,
  (newvalue, oldvalue) => {
    if(newvalue){
      getConfig(newvalue);
    }
  },
  { deep: true }
);
</script>
