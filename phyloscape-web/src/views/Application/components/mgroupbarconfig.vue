<template>
    <div>
      <el-form :model="mgroupbarForm">
        <el-form-item :label="$t('application.islegend')">
          <el-switch active-color="#42bec3" v-model="mgroupbarForm.legend" @change="handleChange" />
        </el-form-item>
        <el-form-item :label="$t('application.groupbarcolor')">
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
  const emit = defineEmits(["groupbarTrans"]);
  const props = defineProps({
    mgroupbarMessage: Object,
  });
  const piecoloropts = ref({});
  const colorForm = ref({});
  const mgroupbarForm = reactive({
    color: piecoloropts,
    legend:true
  });
  const handleChange = () => {
    emit("groupbarTrans", mgroupbarForm);
  };
  const getConfig = (config) => {
    // for (let i in config.color) {
    //   colorForm.value[i] = config.color[i];
    // }
    piecoloropts.value = config.color;
    mgroupbarForm.legend = config.legend;
  };
  watch(
    () => props.mgroupbarMessage,
    (newvalue, oldvalue) => {
      if(newvalue){
        getConfig(newvalue);
      }
    },
    { deep: true }
  );
  </script>
  