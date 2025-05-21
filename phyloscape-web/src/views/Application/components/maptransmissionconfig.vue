<template>
  <div>
    <el-form :model="maptransmissionForm">
      <el-form-item :label="$t('application.maptype')">
        <el-select v-model="maptransmissionForm.maptype" @change="handleChange">
          <el-option
            v-for="(item, index) in maptypeopts"
            :label="$t(item.id)"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Zoom">
        <el-slider v-model="maptransmissionForm.zoom" :step="0.01" :min="0" :max="10"  @change="handleChange"></el-slider>
      </el-form-item>
      <el-form-item :label="$t('application.islegend')">
        <el-switch active-color="#42bec3"
          v-model="maptransmissionForm.legend"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item :label="$t('application.piecolor')">
        <ul>
          <li v-for="(item, index) in piecoloropts">
            {{ index }}
            <!-- <el-color-picker
              v-model="colorForm[index]"
              @change="handleChange"
            /> -->
            <el-color-picker show-alpha
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
import { ref, reactive, watch } from "vue";
const emit = defineEmits(["transmissionTrans"]);
const props = defineProps({
  maptransmissionMessage: Object,
});
const piecoloropts = ref({});
const colorForm = ref({});
const maptransmissionForm = reactive({
  maptype:"http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=en&size=1&scl=1&style=7",
  color: piecoloropts,
  legend: true,
  zoom:1,
});

const handleChange = () => {
  emit("transmissionTrans", maptransmissionForm);
};
const getConfig = (config) => {
  piecoloropts.value = config.color;
  maptransmissionForm.maptype = config.maptype;
  maptransmissionForm.legend = config.legend;
  maptransmissionForm.zoom = config.zoom;
};
watch(
  () => props.maptransmissionMessage,
  (newvalue, oldvalue) => {
    if(newvalue){
      getConfig(newvalue);
    }
  },
  { deep: true }
);
</script>
