<template>
  <div>
    <el-form :model="mfreqstackForm">
      <el-form-item :label="$t('application.islegend')">
          <el-switch active-color="#42bec3" v-model="mfreqstackForm.legend" @change="handleChange" />
        </el-form-item>
      <el-form-item :label="$t('application.freqstackcolor')">
        <ul>
          <li v-for="(item, index) in piecoloropts">
            {{ index }}
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
import { ref, reactive, watch, onMounted } from "vue";
const emit = defineEmits(["freqstackTrans"]);
const props = defineProps({
  mfreqstackMessage: Object,
});
const piecoloropts = ref({});
const colorForm = ref({});
const mfreqstackForm = reactive({
  color: piecoloropts,
  legend:true,
});
const handleChange = () => {
  emit("freqstackTrans", mfreqstackForm);
};
const getConfig = (config) => {
  // for (let i in config.color) {
  //   colorForm.value[i] = config.color[i];
  // }
  piecoloropts.value = config.color;
  mfreqstackForm.legend = config.legend;
};
watch(
  () => props.mfreqstackMessage,
  (newvalue, oldvalue) => {
    if(newvalue){
      getConfig(newvalue);
    }
  },
  { deep: true }
);
</script>
