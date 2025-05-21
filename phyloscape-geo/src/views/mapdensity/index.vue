<template>
  <div class="mapdensitywrap">
    <div id="mapdensity"></div>
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content" class="popup-content"></div>
    </div>
    <div id="legend" v-if="legend">
      <ul>
        <li v-for="(item, index) in color">
          <span class="cspan" :style="{ background: `${item}` }"></span>
          <span>{{ index }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"; // vue相关方法
import { ElMessage } from "element-plus";
import { Map, View } from "ol"; // 地图实例方法、视图方法
import Tile from "ol/layer/Tile"; // 瓦片渲染方法
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import "ol/ol.css"; // 地图样式
import Overlay from "ol/Overlay.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import Feature from "ol/Feature";
import { Fill, Style, Stroke, Circle as CircleStyle } from "ol/style";
import Point from "ol/geom/Point.js";
import GeoJSON from "ol/format/GeoJSON";
import { BASE_MAP_URL } from "@/utils/utils.js"
const map = ref(null);
const popup = ref(null);
const map_id = ref(0);
let type = "";
let ttype = "";
let outline = "";
let legend = ref(true);
let color = ref({});
let sampledata = "";
let dotLayer = [];
const initMapDesity = () => {
  if (dotLayer) {
    for (let i in dotLayer) {
      dotLayer[i].getSource().clear();
    }
  }
  if (geoLayer.value) {
    map.value.removeLayer(geoLayer.value);
  }
  if (outline) {
    if (ttype == "density1") {
    } else if (ttype == "density2") {
      let convexHullArr = [];
      let colors = [];
      for (let i in sampledata) {
        // 最小凸多边形
        let convexHull = calculateConvexHull(sampledata[i].citys);
        convexHullArr.push(transformData(convexHull));
        colors.push(sampledata[i].poycolor);
      }
      drawPoly(convexHullArr, colors);
    }
  }
  for (let i in sampledata) {
    addPoint(sampledata[i], i);
  }
};
const calculateConvexHull = (geoCoordMap) => {
  const points = Object.keys(geoCoordMap).map((key) => {
    return turf.point(geoCoordMap[key].positions, {
      name: geoCoordMap[key].name,
    });
  });
  const pointsFc = turf.featureCollection(points);
  const convexHull = turf.convex(pointsFc);
  if (convexHull) {
    const coords = convexHull.geometry.coordinates[0];
    const result = coords.map((coord) => [coord[0], coord[1]]);
    return result;
  }
  // else {
  //   ElMessage({
  //     message: "当前坐标点不能够标注外圈!",
  //     type: "warning",
  //   });
  // }
};
const drawPoly = (convexHullArr, colors) => {
  let features = [];
  for (let i in convexHullArr) {
    let feature = {
      type: "Feature",
      properties: {
        stroke: colors[i],
        fill: colors[i],
      },
      geometry: {
        coordinates: [convexHullArr[i]],
        type: "Polygon",
      },
    };
    features[i] = feature;
  }
  let geojson = {
    type: "FeatureCollection",
    features: features,
  };
  initGeoJSON(geojson);
};
// 添加点
const addPoint = (cursampledata, i) => {
  let heat = {};
  let heatpointArr = [];
  for (let j in cursampledata.citys) {
    var name = cursampledata.citys[j].name;
    var positions = cursampledata.citys[j].positions;
    heat["h" + j] = new Feature({
      properties: {
        name: name,
        positions: positions,
      },
      geometry: new Point(fromLonLat(positions)),
      clickable: true,
    });
    heatpointArr.push(heat["h" + j]);
  }

  let source = new VectorSource({
    features: heatpointArr,
  });
  dotLayer[i] = new VectorLayer({
    source: source,
    style: new Style({
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({ color: cursampledata.color }),
      }),
    }),
  });
  map.value
    .getView()
    .setCenter(
      fromLonLat(sampledata[Object.keys(sampledata)[0]].citys[0].positions)
    );

  map.value.addLayer(dotLayer[i]);
};
const geoLayer = ref(null);
const initGeoJSON = (geojson) => {
  let geoSource = new VectorSource({
    features: new GeoJSON().readFeatures(geojson),
  });
  geoLayer.value = new VectorLayer({
    source: geoSource,
    style: function (feature) {
      return new Style({
        fill: new Fill({
          color: feature.get("fill") || "#ccc",
        }),
        stoken: new Stroke({
          color: feature.get("stroke") || "#ccc",
          width: feature.get("stroke-width") || "1",
        }),
      });
    },
  });
  map.value.addLayer(geoLayer.value);
};

const initMap = () => {
  // 点击地图展示弹窗
  popup.value = new Overlay({
    element: document.getElementById("popup"),
    positioning: "bottom-center", //相对于其位置属性的实际位置
    stopEvent: false, //事件冒泡
  });
  map.value = new Map({
    target: "mapdensity",
    layers: [
      //图层
      new Tile({
        //使用瓦片渲染方法
        source: new XYZ({
          visible: true,
          url: BASE_MAP_URL
        }),
      }),
    ],
    view: new View({
      //地图视图
      projection: "EPSG:3857", // 坐标系，有EPSG:4326和EPSG:3857
      center: fromLonLat([104.061902, 30.609503]),
      minZoom: 3, // 地图缩放最小级别
      zoom: 4,
    }),
  });
  map.value.addOverlay(popup.value);

  map.value.on(
    "singleclick",
    function (evt) {
      let pixel = evt.pixel;
      let feature = map.value.forEachFeatureAtPixel(pixel, function (feature) {
        return feature;
      });
      if (feature && feature.get("properties")) {
        let showmes = [
          {
            key: "name",
            value: feature.get("properties").name,
          },
          {
            key: "positions",
            value: feature.get("properties").positions,
          },
        ];
        // let shownodes = nodes[feature.get("properties").name];
        alertPopup(evt, showmes);
        // showNodes(shownodes);
        transferParent({
          lon: feature.get("properties").positions[0],
          lat: feature.get("properties").positions[1],
          id: map_id.value,
        });
      } else {
        popup.value.setPosition(null);
        return false;
      }
    },
    { once: true }
  );
  map.value.on("pointermove", function (evt) {
    popup.value.setPosition(null);
    return false;
  });
};
const alertPopup = (evt, showmes) => {
  let element = popup.value.getElement();
  var coordinate = evt.coordinate;
  popup.value.setPosition(coordinate);
  let codemes = "";
  for (let i in showmes) {
    codemes += `<p>${showmes[i].key}:${showmes[i].value}</p>`;
  }
  element.innerHTML = codemes;
};
const transformData = (param) => {
  let newarr = [];
  for (let i in param) {
    let newdata = fromLonLat(param[i]);
    newarr.push(newdata);
  }
  return newarr;
};
const transferParent = (tparams) => {
  // 子传父
  let data = {
    tparams: tparams,
    type: "3",
  };
  window.parent.postMessage(data, "*");
};
const handleMessage = (event) => {
  map_id.value = event.data.id;
  let content = event.data.content;
  type = content.type;
  if (type == "density") {
    ttype = content.ttype;
    outline = content.outline;
    // legend.value.data = content.legend.data;
    // legend.value.show = content.legend.show;
    legend.value = content.legend;
    color.value = content.color;
    sampledata = content.sampledata;
    if (content.maptype) {
      var newBaseLayer = new Tile({
        source: new XYZ({
          url: content.maptype,
        }),
      });
      map.value.getLayers().removeAt(0);
      map.value.getLayers().insertAt(0, newBaseLayer);
      map.value.updateSize();
    }
    initMapDesity();
  }
};
onMounted(() => {
  window.addEventListener("message", handleMessage, false);
  initMap();
});
onBeforeUnmount(() => {
  window.removeEventListener("message", handleMessage, false);
});
</script>
<style lang="scss" scoped>
.mapdensitywrap {
  #mapdensity {
    height: 100vh;
    width: 100%;
  }
  .ol-popup {
    background: white;
    padding: 20px;
    border-radius: 5px;
  }
  #legend {
    position: absolute;
    max-width: 300px;
    padding: 5px 0;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    font-size: 12px;
    color: #555;
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
}
</style>
