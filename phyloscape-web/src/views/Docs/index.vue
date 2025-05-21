<template>
  <div class="docswrap">
    <iframe v-if="$i18n.locale == 'zh'" :src="doczh"></iframe>
    <iframe v-else :src="docen"></iframe>
  </div>
</template>
<script setup>
  import {docUrl} from '@/utils/utils.js'
  const doczh = docUrl + 'doc/indexzh.html'
  const docen = docUrl + 'doc/indexen.html'
</script>
<style lang="scss" scoped>
  .docswrap {
    width: 100%;
    margin: 0 auto;

    iframe {
      width: 100%;
      height: 100vh;
      margin-top: -58px;
    }

    /*- scrollbar -*/
    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #999;
      -webkit-border-radius: 5px;
      border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb:vertical:hover {
      background-color: #666;
    }

    ::-webkit-scrollbar-thumb:vertical:active {
      background-color: #333;
    }

    ::-webkit-scrollbar-button {
      display: none;
    }

    ::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }
  }

  .nav-bar {
    display: none;
  }
</style>