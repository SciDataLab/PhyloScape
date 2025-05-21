<template>
  <div class="groupbarwrap">
    <div id="groupbarecharts"></div>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import { ref, onMounted } from "vue";
import { useStore } from "@/store/index";
const store = useStore();
let type = "";
let seriesdata = "";
let color = "";
let option = {};
let myChart = "";
let legendshow = ""
onMounted(() => {
  myChart = echarts.init(document.getElementById("groupbarecharts"));
  window.addEventListener("message", handleMessage);
});
const handleMessage = (event) => {
  let content = event.data.content;
  type = content.type;
  seriesdata = content.seriesdata;
  color = content.color;
  legendshow = content.legend
  initEcharts();
};
/**示例3**/
const setSeries3 = (seriesdata) => {
  let resultseries3 = [];
  for (let i in seriesdata) {
    let resultseries3i = {
      name: i,
      type: "bar",
      emphasis: {
        focus: "series",
      },
      data: Object.values(seriesdata[i]),
    };
    resultseries3.push(resultseries3i);
  }
  return resultseries3;
};
const initEcharts = () => {
  let fitem = Object.keys(seriesdata)[0];
  option = {
    color: [color["In"], color["Out"]],
    tooltip: {},
    grid: {
      left: "3%",
      right: "3%",
      bottom: "5%",
      containLabel: true,
    },
    legend: {
      show: legendshow,
      y:"bottom",
      x:"center",
      data: Object.keys(seriesdata),
    },
    xAxis: [
      {
        type: "category",
        axisTick: { show: false },
        data: Object.keys(seriesdata[fitem]),
        splitLine: {
          show: true,
          lineStyle: {
            color: "#e6e6e6",
            width: 1,
          },
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          show: true,
          lineStyle: {
            color: "#e6e6e6",
            width: 1,
          },
        },
      },
    ],
    series: setSeries3(seriesdata),
  };
  option && myChart.setOption(option);
};
</script>
<style lang="scss">
#groupbarecharts {
  width:98%;
  height: 98vh;
}
</style>
