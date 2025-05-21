<template>
  <div class="freqstackwrap">
    <div id="freqstackecharts"></div>
  </div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
let option = {};
let myChart = ""
let type = "";
let seriesdata = "";
let legendshow = "";
onMounted(() => {
  myChart = echarts.init(document.getElementById("freqstackecharts"));
  window.addEventListener("message", handleMessage)
  window.addEventListener("resize", function () {
    myChart && myChart.resize();
  });
});
const handleMessage = (event) => {
    myChart.clear()
    let content = event.data.content;
    type = content.type;
    seriesdata = content.seriesdata;
    legendshow = content.legend;
    initEcharts();
}
const setSeries = (seriesdata) => {
  let resultseries = [];
  for (let i in seriesdata) {
    let curseries = seriesdata[i];
    let seriesdatai1 = {
      name: curseries.name,
      type: "line",
      stack: "Total",
      color:curseries.color,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: curseries.color,
      },
      emphasis: {
        focus: "series",
      },
      data: curseries.data,
    };
    resultseries.push(seriesdatai1);
  }
  return resultseries;
};
const initEcharts = () => {
  option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    grid: {
      left: "3%",
      right: "3%",
      containLabel: true,
    },
    legend: {
      show:legendshow,
      y:"bottom",
      x:"center",
      data: seriesdata.data.map((item) => {
        return item.name;
      }),
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: seriesdata.xdata,
        axisLabel:{
          rotate:55
        }
      },
    ],
    yAxis: [
      {
        type: "value",
        max:1,
      },
    ],
    series: setSeries(seriesdata.data),
  };

  option && myChart.setOption(option);
  myChart.off("click");
  myChart.on("click", function (params) {
    console.log(params, "params");
  });
};
const resetSeries1 = () => {
  initEcharts();
};
</script>
<style lang="scss">
#freqstackecharts{
  width: 98%;
  height: 98vh;
}
</style>
