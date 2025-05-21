<template>
  <div class="homewrap3">
    <div id="map3"></div>
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content" class="popup-content"></div>
    </div>
    <div id="legend" v-if="legend && legend.show">
      <ul>
        <li v-for="(item, index) in legend.data">
          <span class="cspan" :style="{ background: `${item}` }"></span>
          <span>{{ index }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue"; // vue相关方法
import { Map, View } from "ol"; // 地图实例方法、视图方法
import Tile from "ol/layer/Tile"; // 瓦片渲染方法
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import "ol/ol.css"; // 地图样式
import VectorLayer from "ol/layer/Vector.js";
// import WebGLPointsLayer from 'ol/layer/WebGLPoints'
import VectorSource from "ol/source/Vector.js";
import Feature from "ol/Feature";
import { Fill, Style, Stroke, Circle as CircleStyle } from "ol/style";
import Point from "ol/geom/Point.js";
import GeoJSON from "ol/format/GeoJSON";
const map = ref(null);
const popup = ref(null);
let type = "";
let ttype = "";
let outline = "";
let legend = "";
let sampledata = "";
let dotLayer = [];
const changeLayer = (maptype) => {
  var newBaseLayer = new Tile({
    source: new XYZ({
      url: maptype,
    }),
  });
  map.value.getLayers().removeAt(0);
  map.value.getLayers().insertAt(0, newBaseLayer);
  // 更新地图显示
  map.value.updateSize();
};
const handleMessage = (event) => {
  type = event.data.type;
  if (type == "density") {
    ttype = event.data.ttype;
    outline = event.data.outline;
    legend = event.data.legend;
    sampledata = event.data.sampledata;
    initDemo();
    if (event.data.maptype) {
      changeLayer(event.data.maptype);
    }
  }
};
onMounted(() => {
  initMap();
  window.addEventListener("message", handleMessage);
  initClick();
});
const initDemo = () => {
  if (dotLayer) {
    for (let i in dotLayer) {
      dotLayer[i].getSource().clear();
    }
  }
  if (geoLayer.value) {
    map.value.removeLayer(geoLayer.value);
  }
  if (outline) {
    getPoly();
  }
  setPoint();
};
const getPoly = () => {
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
};
const calculateConvexHull = (geoCoordMap) => {
  const points = Object.keys(geoCoordMap).map((key) => {
    return turf.point(geoCoordMap[key].positions, {
      name: geoCoordMap[key].name,
    });
  });
  const pointsFc = turf.featureCollection(points);
  const convexHull = turf.convex(pointsFc);
  const coords = convexHull.geometry.coordinates[0];
  const result = coords.map((coord) => [coord[0], coord[1]]);
  return result;
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

const setPoint = () => {
  for (let i in sampledata) {
    addPoint(sampledata[i], i);
  }
};
const addPoint = (cursampledata, i) => {
  let heat = {};
  let heatpointArr = [];
  // 添加点
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
  map.value = new Map({
    target: "map3",
    layers: [
      //图层
      new Tile({
        //使用瓦片渲染方法
        source: new XYZ({
          visible: true,
          url: "http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7",
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
};
const transformData = (param) => {
  let newarr = [];
  for (let i in param) {
    let newdata = fromLonLat(param[i]);
    newarr.push(newdata);
  }
  return newarr;
};

const initClick = () => {
  map.value.on("singleclick", function (evt) {
    let pixel = evt.pixel;
    let feature = map.value.forEachFeatureAtPixel(
      pixel,
      function (feature) {
        return feature;
      },
      {
        hitTolerance: 20,
      }
    );
    if (
      feature &&
      feature.get("properties") &&
      feature.get("properties").name
    ) {
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
      transferParent({
        lon: feature.get("properties").positions[0],
        lat: feature.get("properties").positions[1],
      });
    } else {
      popup.value.setPosition(null);
      return false;
    }
  },{once:true});
};
const transferParent = (tparams) => {
  // 子传父
  let data = {
    tparams: tparams,
    type: "3",
  };
  window.parent.postMessage(data, "*");
};
</script>
<style lang="scss" scoped>
.homewrap3 {
  #map3 {
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
    top: 0;
    right: 0;
    max-width: 300px;
    background: white;
    padding: 5px 0;
    ul,
    li {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    ul {
      li {
        display: inline-block;
        padding: 5px 10px;
        span {
          display: inline-block;
        }
        .cspan {
          width: 25px;
          height: 15px;
          margin-right: 5px;
          border-radius: 2px;
        }
      }
    }
  }
}
</style>
