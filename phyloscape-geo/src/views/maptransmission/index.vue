<template>
  <div class="maptransmissionwrap">
    <div id="maptransmission"></div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"; // vue相关方法
import { Map, View } from "ol"; // 地图实例方法、视图方法
import Tile from "ol/layer/Tile"; // 瓦片渲染方法
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import "ol/ol.css"; // 地图样式
import Vectors from "ol/layer/Vector.js";
import { WMTS, Vector } from "ol/source.js";
import Feature from "ol/Feature";
import OlGeomPoint from "ol/geom/Point";
import OlStyleStyle from "ol/style/Style";
import Text from "ol/style/Text";
import Fill from "ol/style/Fill";
import EChartsLayer from "ol-echarts";
import { BASE_MAP_URL } from "@/utils/utils.js"
const map = ref(null);
let type = "";
let tooltip = "";
let series = "";
let transmission = "";
let legend = "";
let nodes = "";
let label = "";
let map_id = ref(0);
const echartsLayer1 = ref(null);
const echartsLayer2 = ref(null);
const initMap = () => {
  map.value = new Map({
    target: "maptransmission",
    layers: [
      //图层
      new Tile({
        //使用瓦片渲染方法
        source: new XYZ({
          visible: true,
          url: BASE_MAP_URL,
        }),
      }),
    ],
    view: new View({
      //地图视图
      projection: "EPSG:3857", // 坐标系，有EPSG:4326和EPSG:3857
      center: fromLonLat([-74.00597, 40.71278]),
      minZoom: 3, // 地图缩放最小级别
      zoom: 4,
    }),
  });
};
const transferParent = (tparams) => {
  //子传父
  let data = {
    tparams: tparams,
    type: "2",
  };
  window.parent.postMessage(data, "*");
};
const createLabelStyle = (feature, labeli) => {
  let showcon = "";
  for (let i in labeli.data) {
    showcon += labeli.data[i] + "\n";
  }
  return new OlStyleStyle({
    text: new Text({
      textAlign: "left", //对齐方式
      textBaseline: "middle", //文本基线
      font: "normal " + labeli.itemStyle.fontSize + "px 微软雅黑", //字体样式
      text: `${showcon}`, //文本内容
      offsetX: 50,
      offsetY: 25, // Y轴偏置
      fill: new Fill({
        color: "black",
      }),
      backgroundFill: new Fill({
        color: labeli.itemStyle.background,
      }),
      padding: [10, 15, 0, 15],
    }),
    // 设置层级
    zIndex: 199,
  });
};
const initTransmission = (transmission) => {
  const option2 = {
    tooltip: {
      trigger: "item",
      triggerOn: "mousemove",
      formatter: function (params) {
        return (
          params.data.fromName +
          " -> " +
          params.data.toName +
          ": " +
          params.data.value
        );
      },
    },
    series: [transmission],
  };
  echartsLayer2.value = new EChartsLayer(option2);
  echartsLayer2.value.appendTo(map.value);
};
const initLabel = () => {
  for (let i in label) {
    // //初始化标签要素
    let feature = new Feature({
      geometry: new OlGeomPoint(
        fromLonLat([+label[i].coordinates[0], +label[i].coordinates[1]])
      ),
      name: label[i].name,
      img: "",
    });
    feature.setId(label[i].id);
    feature.setStyle(createLabelStyle(feature, label[i]));
    let source = new Vector({});
    source.addFeature(feature);
    let layer = new Vectors({
      source: source,
    });
    map.value.addLayer(layer);
  }
};
let option1 = {};
const initEchart = (legendshow, series) => {
  option1 = {
    grid: {
      left: "3%",
      right: "3%",
      bottom: "5%",
      containLabel: true,
    },
    legend: {
      show: legendshow,
      borderRadius: 5,
      y: "bottom",
      x: "center",
      width: 300,
      padding: 15,
      selectedMode: false,
    },
    tooltip: {
      trigger: "item",
      triggerOn: "click",
      formatter: (params, ticket) => {
        let splitticket = ticket.split("_");
        splitticket.pop();
        splitticket.shift();
        let fname = splitticket.join("_");
        let sname = params.data.name;
        let curnodes = nodes[fname][sname];

        let endvalue = "";
        endvalue = params.data.name + " : " + params.data.value + "<br/>";
        let lon = "";
        let lat = "";
        for (let i in tooltip[params.seriesName]) {
          endvalue +=
            tooltip[params.seriesName][i].label +
            " : " +
            tooltip[params.seriesName][i].value +
            "<br/>";
          if (tooltip[params.seriesName][i].label == "latitude") {
            lat = tooltip[params.seriesName][i]["value"];
          }
          if (tooltip[params.seriesName][i].label == "longitude") {
            lon = tooltip[params.seriesName][i]["value"];
          }
        }
        transferParent({
          lineage: params.name,
          lat: lat,
          lon: lon,
          id: map_id.value,
        });

        return endvalue;
      },
    },
    series: series,
    zlevel: 2,
  };
  echartsLayer1.value = new EChartsLayer(option1);
  echartsLayer1.value.appendTo(map.value);
  // map.value.addLayer(echartsLayer1.value)
};
const initMapTransmission = () => {
  if (echartsLayer1.value && echartsLayer2.value) {
    echartsLayer1.value.remove();
    echartsLayer2.value.remove();
    echartsLayer1.value = null;
    echartsLayer2.value = null;
  }
  const transmissiondatashow = transmission.data.filter((item, i, arr) => {
    return item.show;
  });
  transmission.data = transmissiondatashow;
  if (transmission) {
    initTransmission(transmission);
  }
  if (label) {
    initLabel();
  }
  if (series) {
    initEchart(legend, series);
  }
};
const handleMessage = (event) => {
  map_id.value = event.data.id;
  let content = event.data.content;
  type = content.type;
  if (type == "transmission") {
    tooltip = content.tooltip;
    series = content.series;
    transmission = content.transmission;
    legend = content.legend;
    nodes = content.nodes;
    label = content.label;
    let newlon = tooltip[Object.keys(tooltip)[0]][2].value;
    let newlat = tooltip[Object.keys(tooltip)[0]][1].value;
    if (content.maptype) {
      var newBaseLayer = new Tile({
        source: new XYZ({
          url: content.maptype,
        }),
      });
      map.value.getLayers().removeAt(0);
      map.value.getLayers().insertAt(0, newBaseLayer);
      // 更新地图显示
      map.value.updateSize();
      setTimeout(() => {
        map.value.getView().setCenter(fromLonLat([newlon, newlat]));
      }, 1000);
    }
    initMapTransmission();
  }
};
onMounted(() => {
  initMap();
  window.addEventListener("message", handleMessage, false);
});
onBeforeUnmount(() => {
  window.removeEventListener("message", handleMessage, false);
});
</script>
<style lang="scss" scoped>
.maptransmissionwrap {
  #maptransmission {
    height: 100vh;
    width: 100%;
  }
}
</style>
