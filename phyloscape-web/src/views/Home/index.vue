<template>
  <div class="homewrap">
    <div class="carousel">
      <el-carousel
        indicator-position="outside"
        :interval="5000"
        :autoplay="false"
      >
        <!-- <el-carousel-item :class="'c'+index" v-for="(item,index) in bgs" :key="index">
          <el-image  :fit="scale-down" :src="item"></el-image>
        </el-carousel-item> -->
        <el-carousel-item>
          <div class="bgimg1">
            <el-image class="bg bg11" :src="b1_1"></el-image>
            <el-image class="bg bg12" :src="b1_2"></el-image>
            <el-image class="bg bg13" :src="b1_3"></el-image>
            <el-image class="bg bg14" :src="b1_4"></el-image>
            <el-image class="bg bg15" :src="b1_5"></el-image>
            <el-image class="bg bg16" :src="b1_6"></el-image>
          </div>
        </el-carousel-item>
        <el-carousel-item>
          <div class="bgimg2">
            <el-image class="bg bg21" :src="b2_1"></el-image>
            <el-image class="bg bg22" :src="b2_2"></el-image>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="bannercon">
      <div class="con">
        <p class="p1">PhyloScape</p>
        <p class="p2">
          {{ $t("home.slogan") }}
        </p>
        <div class="btn">
          <!-- <el-button
            type="primary"
            size="large"
            round
            @click="goPage({ path: 'application' })"
            >{{ $t('common.application') }}</el-button
          > -->
          <span @click="goPage({ path: 'applicationone' })">{{
            $t("common.application")
          }}</span>
          <span @click="goPage({ path: 'gallery' })">{{
            $t("common.gallery")
          }}</span>
          <!-- <el-button
            type="primary"
            size="large"
            round
            @click="goPage({ path: 'demos' })"
            >{{$t('common.demos')}}</el-button -->
          <!-- > -->
        </div>
      </div>
    </div>
    <!-- feature -->
    <div class="line feature">
      <p class="title">{{ $t("home.feature") }}</p>
      <div class="featurerow">
        <div class="row1" v-for="(item, index) in fgs" :key="index">
          <el-image :src="item.image"></el-image>
          <p><a>•</a>{{ $t(item.value) }}</p>
        </div>
      </div>
    </div>
    <!-- feature -->
    <div class="line license" style="margin-bottom: 0">
      <p class="title">{{ $t("home.license") }}</p>
      <div class="licenseinfo" v-html="$t('home.licenseinfo')"></div>
    </div>
    <div class="footer">
      Computer network information center of Chinese Academy of Sciences
    </div>
  </div>
</template>
<script setup>
import b1_1 from "@/assets/home/b1_1.png";
import b1_2 from "@/assets/home/b1_2.png";
import b1_3 from "@/assets/home/b1_3.png";
import b1_4 from "@/assets/home/b1_4.png";
import b1_5 from "@/assets/home/b1_5.png";
import b1_6 from "@/assets/home/b1_6.png";

import b2_1 from "@/assets/home/b2_1.png";
import b2_2 from "@/assets/home/b2_2.png";

import f1 from "@/assets/home/f1.png";
import f2 from "@/assets/home/f2.png";
import f3 from "@/assets/home/f3.png";
import f4 from "@/assets/home/f4.png";
import f5 from "@/assets/home/f5.png";
import { useRouter } from "vue-router";
const router = useRouter();

let fgs = [
  {
    image: f1,
    value: "home.f1",
  },
  {
    image: f2,
    value: "home.f2",
  },
  {
    image: f3,
    value: "home.f3",
  },
  {
    image: f4,
    value: "home.f4",
  },
  {
    image: f5,
    value: "home.f5",
  },
];

const goPage = (params) => {
  router.push({
    path: `/${params.path}`,
  });
};
</script>
<style lang="scss" scoped>
.homewrap {
  position: relative;
  // width: 1200px;
  margin: 0 auto;
  .carousel {
    // width: 100%;
    // height:auto;
    .bg {
      position: absolute;
    }
    .bgimg1 {
      height: 300px;
      position: relative;

      .bg11 {
        top: 0;
        left: 0;
        width: 100px;
      }
      .bg12 {
        left: 10%;
        bottom: 50px;
        width: 80px;
      }
      .bg13 {
        top: 0;
        left: 40%;
        width: 100px;
      }
      .bg14 {
        width: 35vw;
        bottom: 0;
        left: 50%;
        transform: translate(-50%);
      }
      .bg15 {
        right: 10%;
        width: 120px;
        top: 50px;
      }
      .bg16 {
        bottom: 0;
        right: 5%;
        width: 50px;
      }
    }
    .bgimg2 {
      height: 300px;
      background: #fefefe;
      position: relative;
      .bg21 {
        width: 1000px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      .bg22 {
        width: 250px;
        left: 60%;
        top: 50%;
        transform: translate(10px, -50%);
      }
    }
    .el-carousel {
      .el-carousel-item {
        height: 300px;
        display: flex;
        justify-items: center;
        .el-image {
          // background-size:100% 100%;
          // width:100%;
          height: 300px;
        }
      }
      .el-carousel__item {
        text-align: center;
      }
      .c0 {
        background: #fcfbff;
      }
    }
  }
  .bannercon {
    position: absolute;
    height: 200px;
    top: 10%;
    left: 10%;
    // background: rgba(255, 255, 255, 0.8);
    text-align: left;

    .con {
      width: 300px;
      // margin: 0 auto;

      .p1 {
        font-size: 48px;
        font-weight: bold;
        color: rgba(48, 51, 160, 1);
      }
      .p2 {
        font-size: 16px;
        color: rgba(25, 26, 43, 1);
      }
      .btn {
        margin-top: 40px;
        span {
          width: 120px;
          height: 40px;
          line-height: 40px;
          display: inline-block;
          margin-right: 20px;
          border-radius: 3px;
          text-align: center;
          cursor: pointer;
          font-weight: bold;
          &:first-child {
            background: linear-gradient(to right, #2f2f9f, #42f7d3);
            color: #fff;
          }
          &:last-child {
            color: rgba(48, 51, 160, 1);
            border: solid 1px;
            border-image: linear-gradient(to right, #2f2f9f, #42f7d3) 1;
            clip-path: inset(0 round 3px);
          }
        }
      }
    }
  }
  .line {
    width: 80%;
    margin: 40px auto;
    .title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 1em;
      text-align: center;
    }
  }
  .feature {
    ul {
      li {
        padding: 5px;
        color: #555;
      }
    }
    .featurerow {
      // align-items: center;
      display: flex;
      .row1 {
        flex: 1;
        margin: 10px;
        // border:1px solid red;
        box-shadow: 1px 1px 1px 1px rgba(249, 250, 252, 1);
        p {
          padding: 10px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.8);
          display: flex;
          text-align: justify;
          a {
            display: inline-block;
            padding-right: 2px;
          }
        }
      }
    }
  }
  .license {
    background: url("@/assets/home/lbg.png");
    background-size: 100% 100%;
    height: 150px;
    .licenseinfo {
      text-align: center;
      color: rgba(0, 0, 0, 0.8);
      font-size: 16px;
    }
  }

  .footer {
    text-align: center;
    padding: 20px;
    // background:linear-gradient(to right, #2f2f9f, #42f7d3);
    background: rgba(97, 97, 116, 1);
    color: white;
  }
}
</style>
