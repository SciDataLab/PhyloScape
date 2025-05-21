<template>
  <div class="pdbwrap">
    <iframe
        :src="`${geoUrl}/pdbe-molstar.html?id=${id}&node=${node}`"
        frameborder="0"
        id="molstar-iframe"
      ></iframe>
  </div>
</template>
<script setup>
import { ref,onMounted } from "vue";
import { geoUrl} from "@/utils/utils.js"
let id = ref(0)
let node = ref(0)

onMounted(() => {
  
  window.addEventListener("message", (event) => {
    id.value = event.data.id
    node.value = event.data.node
  });
});
</script>
<style lang="scss" scoped>
.pdbwrap {
  width: 100%;
  height: 100vh;
  #molstar-iframe {
    width: 100%;
    height: 98vh;
  }
}
</style>
