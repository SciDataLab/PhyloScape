<template>
  <div>
    <el-form :model="mheatmapForm">
      <!-- <el-form-item :label="$t('application.islegend')">
        <el-switch active-color="#42bec3" v-model="mheatmapForm.legend" @change="handleChange" />
      </el-form-item> -->
      <el-form-item label="Rowname">
        <el-switch active-color="#42bec3" v-model="mheatmapForm.rowname" @change="handleChange" />
      </el-form-item>
      <el-form-item label="Colname">
        <el-switch active-color="#42bec3" v-model="mheatmapForm.colname" @change="handleChange" />
      </el-form-item>
      <el-form-item label="Background grid">
        <el-switch active-color="#42bec3" v-model="mheatmapForm.bggrid" @change="handleChange" />
      </el-form-item>
      <el-form-item label="Fontsize">
        <el-input v-model="mheatmapForm.fontsize" @change="handleChange" type="number" />
      </el-form-item>
      <el-form-item label="Heatmap view">
        <el-select v-model="mheatmapForm.map_type" @change="handleChange">
          <el-option v-for="(item, index) in viewList" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Color series">
        <el-select v-model="mheatmapForm.color" @change="handleChange">
          <el-option v-for="(item, index) in colorList" :key="index" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, reactive, watch, onMounted } from "vue";
const emit = defineEmits(["heatmapTrans"]);
const props = defineProps({
  mheatmapMessage: Object,
});
const colorList = ref(['JET', 'HSV','STEELBLUE','WINE','HOT', 'COOL', 'SPRING', 'SUMMER', 'AUTUMN', 'WINTER', 'GRAY', 'BONE'])
const viewList = reactive([
{
    label: 'Full',
    value: 'full'
  },
  {
    label: 'Upper Left',
    value: 'upper_left'
  },
  {
    label: 'Upper Right',
    value: 'upper_right'
  },
  {
    label: 'Lower Left',
    value: 'lower_left'
  },
  {
    label: 'Lower Right',
    value: 'lower_right'
  }
])
const piecoloropts = ref({});
const mheatmapForm = reactive({
  color: 'JET',
  map_type: 'upper_left',
  bggrid:true,
  showtext: true,
  fontsize:10,
  rowname: true,
  colname: true,
  legend: true,
});
const handleChange = () => {
  emit("heatmapTrans", mheatmapForm);
};
const getConfig = (config) => {
  console.log(config,'config1')
  mheatmapForm.color = config.color;
  mheatmapForm.map_type = config.map_type;
  mheatmapForm.rowname = config.rowname;
  mheatmapForm.colname = config.colname;
  mheatmapForm.fontsize = config.fontsize;
  mheatmapForm.bggrid = config.bggrid;
  mheatmapForm.legend = config.legend;
};
watch(
  () => props.mheatmapMessage,
  (newvalue, oldvalue) => {
    if (newvalue) {
      getConfig(newvalue);
    }
  },
  { deep: true }
);
</script>