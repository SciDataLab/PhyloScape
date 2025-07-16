<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenyan
 * @Date: 2023-04-04 09:54:59
 * @LastEditors: chenyan
 * @LastEditTime: 2023-04-10 10:18:59
-->
<template>
  <div class="gallerywrap">
    <div class="main">
      <div class="right">
        <div
          class="line"
          :class="curtype"
          v-for="item in $i18n.locale == 'zh' ? pluginlistzh : pluginlisten"
        >
          <div class="imagewh">
            <el-image :src="item.img" style="width: 100%; overflow: hidden" />
          </div>
          <el-row>
            <el-col :span="16">
              <div class="title">{{ item.title }}</div>
            </el-col>
            <el-col :span="8" style="text-align: right">
              <el-button
                v-show="item.show"
                size="small"
                color="#42bec3"
                style="color: white"
                @click="goApplication(item.template)"
                >{{ $t("plugins.use") }}</el-button
              >
            </el-col>
          </el-row>
          <div class="info">
            <p>
              <span>{{ $t("plugins.des") }}</span
              ><span v-html="item.abs"></span>
            </p>
            <p>
              <span>{{ $t("plugins.key") }}</span
              ><span>{{ item.key }}</span>
            </p>
            <p>
              <span>{{ $t("plugins.license") }}</span
              ><span>{{ item.license }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { pluginlistzh, pluginlisten } from "@/utils/utils";
import { useRouter } from "vue-router";
const curtype = ref("list");
const router = useRouter();
onMounted(() => {});
onUnmounted(() => {
  window.removeEventListener("message", handleMessage);
});
const goApplication = (curtem) => {
  router.push({
    path: "/applicationtwo",
    query: {
      selectdemo2: curtem,
    },
  });
};
const handleMessage = (event) => {
};
</script>
<style lang="scss">
.gallerywrap {
  width: 80%;
  min-height: calc(100vh - 160px);
  margin: 0 auto;

  .main {
    display: flex;

    .left {
      width: 240px;
    }

    .right {
      flex: 1;
    }
  }

  .ftitle {
    font-size: 50px;
    font-weight: bold;
    margin: 50px 0 10px;
  }

  .subtitle {
    font-size: 22px;
    color: #555;
    font-weight: normal;
  }

  .signicon {
    text-align: right;
    margin: 20px 0;

    .el-image {
      cursor: pointer;
      width: 30px;

      &:first-child {
        padding-right: 10px;
        border-right: 3px solid #ccc;
      }

      &:last-child {
        padding-left: 10px;
      }
    }
  }

  .line {
    margin: 30px 0 50px;
    padding: 20px;
    padding-bottom: 20px;
    border-radius: 10px;
    border: 2px dashed #ddd;
    .imagewh {
      // max-height: 400px;
      // overflow: hidden;
      .el-row {
        align-items: center;
        padding: 0 15px;
      }
    }

    .lcon {
      .el-image {
        width: 25px;
        vertical-align: middle;
        padding: 0 5px;
      }

      a {
        color: #555;
        font-size: 12px;
      }
    }

    .title {
      font-size: 28px;
      padding: 10px 0;
      color: #fdae61;
      font-weight: 600;
    }

    .info {
      font-size: 20px;
      color: #555;

      p {
        display: flex;
        span:first-child {
          font-size: 16px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #1d1d1d;
          width: 100px;
          display: inline-block;
        }

        span:last-child {
          flex: 1;
          font-size: 16px;
          color: #555555;
          line-height: 28px;
          text-align: justify;
        }
      }
    }

    iframe {
      width: 100%;
      height: 500px;
    }

    .detail {
      text-align: right;

      .el-button {
        &:hover {
          background: #3eaf7c;
          border: #3eaf7c;
        }
      }
    }

    .left {
      flex: 1;
      border: 1px solid #2f2f9f;
      padding: 10px;
      margin: 10px;
      border-radius: 10px;
    }

    .right {
      flex: 1;
      border: 1px solid #2f2f9f;
      padding: 10px;
      margin: 10px;
      border-radius: 10px;
    }
  }

  .thumbnail {
    width: 48%;
    display: inline-block;

    .title {
      font-size: 14px;
      padding: 10px;
      color: #3eaf7c;
      font-weight: 600;
    }

    iframe {
      width: 100%;
      height: 300px;
    }

    &:nth-child(3n-1) {
      padding-left: 2%;
      padding-right: 2%;
    }
  }
}
</style>
