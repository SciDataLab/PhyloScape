<template>
  <div class="pienetworkwrap">
    <div id="pienetworkecharts"></div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
let refpienodes = ref([]);
let myChart = ref(null);
let series = "";
let categories = "";
let links = "";
let color = {};
let legend = true;
let linecurveness = "";
let linetype = "";
let linewidth = "";
// 初始化graph
const initGraphChart = () => {
  let options = {
    tooltip: {},
    legend: {
      show: legend,
      y: "bottom",
      x: "center",
      data: categories.filter(function (a) {
        if (a.name != 'LINE') {
          return a
        }
      }),
    },
    series: [
      {
        type: "graph",
        layout: "force", // 自定义布局
        force: {
          repulsion: 5,
          gravity: 0.01,
          edgeLength: [30, 50],
          layoutAnimation: true,
        },
        // draggable: true,
        zlevel: 1,
        label: {
          show: true,
          position: "left",
        },
        labelLayout: {
          hideOverlap: true,
        },
        scaleLimit: {
          min: 0.4,
          max: 2,
        },
        symbol: "circle",
        categories: categories,
        data: series, // 节点数据
        links: links,
        lineStyle: {
          color: "source",
          curveness: linecurveness,
          type: linetype,
          width: linewidth,
        },
        emphasis: {
          focus: "adjacency",
          lineStyle: {
            width: 5,
          },
        },
      },
    ],
  };
  var chartDom = document.getElementById("pienetworkecharts");
  myChart.value = echarts.init(chartDom);
  options && myChart.value.setOption(options);
};

function getPieSeries(pieData, num) {
  console.log(pieData, 'pieData')
  return pieData.map(function (item, index) {
    return {
      // 以下内容均可以根据自己的需求进行改变
      name: item.name,
      id: index + "pie",
      zlevel: 3,
      type: "pie",
      label: { show: false },
      center: [item.x, item.y],
      radius: item.symbolSize / 2,
      data: item.data,
    };
  });
}
const initPieChart = () => {
  refpienodes.value = series.filter((item) => {
    return item.type == "pie";
  });

  setTimeout(function () {
    myChart.value.setOption({
      series: getPieSeries(refpienodes.value, 0),
    });
  });
};
const initEvent = () => {
  myChart.value.on("click", (param) => {
    let fname = "";
    let sname = "";

    if (param && param.seriesType == "graph") {
      fname = param.data.name;
      sname = param.data.sname;
    } else if (param && param.seriesType == "pie") {
      fname = param.seriesName;
      sname = param.name;
    }
    transferParent({
      lineage: sname,
      state: fname,
    });
  });
};
const transferParent = (tparams) => {
  //子传父
  let data = {
    tparams: tparams,
    type: "4",
  };
  window.parent.postMessage(data, "*");
};
// 交互
const setColorNodes = (curitem) => {
  curitem.itemStyle = {
    borderWidth: 3,
    borderColor: "red",
    color: "yellow",
  };
};
const handleMessage = (event) => {
  console.log(myChart.value, 'myChart.value')
  if (myChart.value) {
    myChart.value.clear();
  }
  let content = event.data.content;
  series = content.series;
  categories = content.categories;
  links = content.links;
  legend = content.legend;
  color = content.color;
  linecurveness = content.linecurveness;
  linetype = content.linetype;
  linewidth = content.linewidth;
  initGraphChart();
  initPieChart();
  initEvent();
};
onMounted(() => {
  window.addEventListener("message", handleMessage);
});
</script>
<style scoped>
#pienetworkecharts {
  height: 98vh;
  width: 98%;
}
</style>
