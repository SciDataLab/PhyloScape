<template>
  <div class="apiwrap">
    <iframe v-if="$i18n.locale == 'zh'" :src="apizh"></iframe>
    <iframe v-else :src="apien"></iframe>
  </div>
</template>
<script setup>
  import {docUrl} from '@/utils/utils.js'
  import {useStore} from '@/store'
  const apizh = docUrl + 'api/API_zh.html'
  const apien = docUrl + 'api/API_en.html'
</script>
<style lang="scss" scoped>
.apiwrap{
  width:100%;
  margin:0 auto;
  iframe{
    width:100%;
    height:100vh;
    margin-top:-58px;
  }
}
</style>