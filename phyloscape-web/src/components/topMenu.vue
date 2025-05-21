<!--
 * @Descripttion: 
 * @version: 
 * @Author: chenyan
 * @Date: 2023-04-03 09:51:16
 * @LastEditors: chenyan
 * @LastEditTime: 2023-06-06 09:44:35
-->
<template>
  <div class="topmenu">
    <div class="wrap">
      <div class="wleft" @click="goHome">
        <el-image :src="logo"></el-image>
        <span>PhyloScape</span>
      </div>
      <div class="wcenter">
        <el-menu
          :default-active="route.meta.jumpPath"
          class="el-menu-demo"
          mode="horizontal"
          text-color="#fff"
          active-text-color="#fdae61"
          @select="handleSelect"
        >
        <template v-for="item in menurouter">
          <el-menu-item v-if="!item.children" :index="item.index" :key="item.index">
            {{ item.name }}
          </el-menu-item>
          <el-sub-menu v-else :index="item.index">
            <template #title>{{ item.name }}</template>
            <el-menu-item v-for="item2 in item.children" :index="item2.index" :key="item2.index">
              <span style="color: #555">
                {{ item2.name }}
              </span>
            </el-menu-item>
          </el-sub-menu>
        </template>
        </el-menu>
      </div>
      <div class="wright">
        <el-image class="img1" :src="git" @click="goGit"></el-image>
        <el-image class="img2" :src="en" v-show="language === 'zh'" @click="handleSetLanguage('en')"></el-image>
        <el-image class="img2" :src="zh" v-show="language === 'en'" @click="handleSetLanguage('zh')"></el-image>
        <!-- <el-dropdown
          trigger="click"
          @command="handleSetLanguage"
          class="languages"
        >
          <div style="font-size: 15px">
            <span>{{ langName }}</span>
            <i class="el-icon-arrow-down el-icon--right" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :disabled="language === 'zh'" command="zh">
                中文
              </el-dropdown-item>
              <el-dropdown-item :disabled="language === 'en'" command="en">
                English
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown> -->
        <div class="accountswrap" v-if="guserinfo.username">
          <el-dropdown>
            <span
              class="el-dropdown-link"
              style="font-weight: bold; cursor: pointer"
            >
              {{ guserinfo.username }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goPersonal"
                  >{{$t('personal.pcen')}}</el-dropdown-item
                >
                <el-dropdown-item @click="Logout">{{$t('common.logout')}}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <span v-else class="login" @click="goLogin">{{$t('common.login')}}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import logo from "@/assets/logo2.png";
import en from "@/assets/common/en.png";
import zh from "@/assets/common/zh.png";
import git from "@/assets/git.png";
import {docUrl} from '@/utils/utils.js'
import { userlogout } from "@/api/accounts";
import { useUserInfo } from "@/store/userinfo.js";
import { useStore } from "@/store";
const guserinfo = useUserInfo();
let activeIndex = ref("home");
const router = useRouter();
const route = useRoute();
const store = useStore();
const menurouter = computed(() => [
  {
    index: "docs",
    name: `${t("common.docs")}`,
    children:[
    {
        index: "docs/application",
        name: "PhyloScape web application",
      },
      {
        index: "docs/library",
        name: "PhyloScape JS library",
      },
    ]
  },
  {
    index: "api",
    name: `${t("common.api")}`,
  },
  {
    index: "applicationone",
    name: `${t("common.application")}`,
  },
  {
    index: "plugins",
    name: `${t("common.plugins")}`,
  },
  {
    index: "gallery",
    name: `${t("common.gallery")}`,
  },
  // {
  //   index: "demos",
  //   name: `${t("common.demos")}`,
  // },
  {
    index: "contact",
    name: `${t("common.contact")}`,
  },
]);
const { t, locale } = useI18n();
const langName = ref("English");
const language = ref("en");
const handleSelect = (key, keyPath) => {
  activeIndex.value = key;
  router.push({
    path: `/${key}`,
  });
};
const goHome = () => {
  activeIndex.value = "home";
  router.push({
    path: "/home",
  });
};
const goLogin = () => {
  router.push({
    path: "/accounts/login",
  });
};
const Logout = () => {
  userlogout().then((res) => {
    if (res.code == 0) {
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      guserinfo.$patch({
        email: "",
        username: "",
      });
      router.push({
        path: "/accounts/login",
      });
    }
  });
};
const goGit = () => {
  window.open("https://github.com/SciDataLab/PhyloScape");
};
const curpath = (path) => {
  activeIndex.value = path.slice(1);
};
const goPersonal = (path) => {
  router.push({
    path: "/personal/data/list",
  });
};
const getUserInfo = () => {
  guserinfo.$patch({
    email: localStorage.getItem("email"),
    username: localStorage.getItem("username"),
  });
};
watch(
  () => route.path,
  (val) => {
    curpath(val);
  }
);

activeIndex.value = computed(() => () => {
  //计算属性传递参数
});
const getLangInit = () => {
  if (
    // localStorage.getItem("lang") == undefined ||
    localStorage.getItem("lang") == "zh"
  ) {
    console.log('a')
    langName.value = "中文";
    language.value = "zh";
  } else {
    console.log('b')
    langName.value = "English";
    language.value = "en";
  }
};
// 切换事件：
const handleSetLanguage = (lang) => {
  if (lang === "zh") {
    langName.value = "中文";
  } else {
    langName.value = "English";
  }
  if(locale.value){
    locale.value = locale.value === "zh" ? "en" : "zh";
  }else{
    locale.value = "en"
  }
  
  localStorage.setItem("lang", locale.value);
  language.value = lang;

  store.$patch((state) => {
    state.curlang = language.value;
    state.curlangdocs =
      language.value === "zh"
        ? docUrl + "doc/indexzh.html"
        : docUrl + "doc/indexen.html";
  });
};

onMounted(() => {
  let path = window.location.hash.slice(1);
  curpath(path);
  getLangInit();
  getUserInfo();
});
</script>
<style lang="scss">
.topmenu {
  color: white;
  background: linear-gradient(to right, #2f2f9f, #42f7d3);
  position: relative;
  z-index: 1000;
  .wrap {
    display: flex;
    padding: 0 20px;

    .el-menu {
      background: none;
      border-bottom: 0;

      & > .el-menu-item {
        &.is-active {
          border: 0;
        }
      }
    }
    .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
      background: none !important;
    }

    .el-menu--horizontal > .el-sub-menu .el-sub-menu__title:hover {
      background: none !important;
    }

    .el-menu--horizontal .el-menu-item:not(.is-disabled):focus,
    .el-menu--horizontal .el-menu-item:not(.is-disabled):hover {
      background: none !important;
    }

    .wleft {
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .el-image {
        height: 50px;
        width:50px;
      }

      span {
        padding-left: 10px;
        color: white;
        font-size: 18px;
        font-weight: bold;
      }
    }

    .wcenter {
      flex: 1;
    }

    .wright {
      cursor: pointer;
      justify-content: end;
      width: 300px;
      display: flex;
      align-items: center;

      .img1 {
        width: 25px;
        padding-right: 20px;
      }
      
      .el-image {
        width: 25px;
        cursor: pointer;
      }
      .img2{
        width:30px;
      }

      .accountswrap {
        padding-left: 20px;
        // width: 125px;
        background: none;
        height: 18px;

        .el-dropdown-link {
          color: #409eff;
        }
      }

      .login {
        padding: 0 20px;
        cursor: pointer;
        color: black;
      }
    }
  }
}
</style>
