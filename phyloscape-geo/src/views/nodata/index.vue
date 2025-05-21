<template>
    <div class="nodatawrap">
        <div class="tips">
            <el-image class="panelplugins" :src="plugins"></el-image>
            <p>*Please select the plugin and upload the plugin data .</p>
        </div>
    </div>
</template>
<script setup>
import plugins from '@/assets/plugins.png'
</script>
<style lang="scss">
.nodatawrap{
    width: 100%;
    height: 100vh;
    display:flex;
    align-items: center;
    justify-content: center;
}
.panelplugins{
    width:30px;
    position: absolute;
}
.tips{
    width: 100%;
    font-size: 12px;
    color: #bbb;
    text-align:center;
    position: relative;
    p{
        margin-top:40px;
    }
}
</style>