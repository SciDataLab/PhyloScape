<template>
  <div class="acmapechartswrap">
    <div class="acmapecharts" id="acmapecharts"></div>
    <div id="legend" v-if="legendshow" :style="{width:legendwidth + 'px'}">
      <ul>
        <li v-for="(item, index) in legenddata">
          <span class="cspan" :style="{ background: `${item}` }"></span>
          <span>{{ index }}</span>
        </li>
        <!-- <li>
          <el-image :src="simg" style="width:14px;height:14px;position:relative;top:4px;"/>
        </li> -->
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref,onMounted } from "vue";
import Highcharts, { Pointer } from "highcharts";
import acmapdata from "./demo63.js";
// import simg from "@/assets/s.png"
let seriesdata = acmapdata.content;
let circleradius = 5
let legendshow = ref(false);
let legenddata = ref({})
let legendwidth = ref(0)
const initEcharts4 = () => {
 var highchartsacmap =  Highcharts.chart("acmapecharts", {
    chart: {
      type: "scatter",
      zoomType: "xy",
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      startOnTick: true,
		endOnTick: true,
		showLastLabel: true,
      tickWidth: 0, //设置刻度标签宽度
      tickInterval:1,
      gridLineWidth: 1,
      lineColor: "#ffffff", //设置坐标颜色
      lineWidth: 0, //设置坐标宽度
      labels: {
        enabled: false,
      },
    },
    yAxis: [
      {
        title: "",
        tickWidth: 0, //设置刻度标签宽度
        gridLineWidth: 1, //设置横向分区线宽度
        tickInterval:1,
        lineColor: "#ffffff", //设置y轴颜色
        lineWidth: 0, //设置坐标宽度
        labels: {
          enabled: false,
        },
      },
    ],
   
    legend: {
      enabled:false,
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: Number(circleradius),
          states: {
            hover: {
              enabled: true,
              lineColor: "rgb(100,100,100)",
            },
          },
        },
        states: {
          hover: {
            marker: {
              enabled: false,
            },
          },
        },
        tooltip: {
          headerFormat: "",
          pointFormat: "<b style='color:{series.color}','font-size:14px'>{point.name}</b><br/> {point.x} , {point.y} ",
        },
      },
    },
    series: seriesdata,
  });
};
const handleMessage = (event) => {
  let content = event.data.content
  seriesdata = content.info;
  circleradius = content.circleradius;
  legendshow.value = content.legend;
  legenddata.value = content.color;
  initEcharts4();
};
onMounted(() => {
  legendwidth.value = document.getElementById('acmapecharts').offsetWidth
  window.addEventListener("message", handleMessage)
});
</script>
<style lang="scss" setup>
.acmapecharts {
  width:98%;
  margin:0 auto;
  margin-top:30px;
  height: calc(100vh - 90px);
}
#legend {
    position: absolute;
    padding: 5px 0;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    font-size: 12px;
    color: #555;
    text-align:center;
    ul,
    li {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    ul {
      li {
        display: inline-block;
        padding: 5px;
        span {
          display: inline-block;
          vertical-align: middle;
        }
        .cspan {
          width: 20px;
          height: 12px;
          margin-right: 5px;
          border-radius: 2px;
        }
      }
    }
  }
</style>
