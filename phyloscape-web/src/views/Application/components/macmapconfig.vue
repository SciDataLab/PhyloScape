<template>
    <div>
      <el-form :model="macmapForm">
        <el-form-item :label="$t('application.islegend')">
          <el-switch active-color="#42bec3" v-model="macmapForm.legend" @change="handleChange" />
        </el-form-item>
        <el-form-item :label="$t('application.acmapcolor')">
          <ul>
            <li v-for="(item, index) in piecoloropts">
              {{ index }}
              <el-color-picker
                v-model="piecoloropts[index]" show-alpha
                @change="handleChange"
              />
            </li>
          </ul>
        </el-form-item>
        <el-form-item :label="$t('application.acmapsize')">
          <el-input type="number" v-model="macmapForm.circleradius" @change="handleChange"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </template>
  <script setup>
  import { ref, reactive, watch } from "vue";
  const emit = defineEmits(["acmapTrans"]);
  const props = defineProps({
    macmapMessage: Object,
  });
  const piecoloropts = ref({});
  const colorForm = ref({});
  const macmapForm = reactive({
    color: piecoloropts,
    circleradius:5,
    legend:true
  });
  const handleChange = () => {
    emit("acmapTrans", macmapForm);
  };
  const getConfig = (config) => {
    // for (let i in config.color) {
    //   colorForm.value[i] = config.color[i];
    // }
    piecoloropts.value = config.color;
    macmapForm.circleradius = config.circleradius;
    macmapForm.legend = config.legend;
  };
  watch(
    () => props.macmapMessage,
    (newvalue, oldvalue) => {
      if(newvalue){
        getConfig(newvalue);
      }
    },
    { deep: true }
  );
  </script>
  <style lang="scss" scoped>
  .macmapconfigwrap{
    width:80%;
    margin:0 auto;
  }
</style>
  