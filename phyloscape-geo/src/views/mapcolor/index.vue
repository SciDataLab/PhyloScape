<template>
  <div class="mapcolorwrap">
    <div id="mapcolor"></div>
    <!-- <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content" class="popup-content"></div>
    </div> -->
    <div id="legend" v-if="legend && legend.show">
      <ul>
        <li v-for="(item, index) in legend.data">
          <span
            class="cspan"
            :style="{ background: `${Object.values(item)[0]}` }"
          ></span>
          <span>{{ Object.keys(item)[0] }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"; // vue相关方法
import { Map, View } from "ol"; // 地图实例方法、视图方法
import { fromLonLat, transform } from "ol/proj";
import Tile from "ol/layer/Tile"; // 瓦片渲染方法
import XYZ from "ol/source/XYZ";
import GeoJSON from "ol/format/GeoJSON";
import Overlay from "ol/Overlay.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import { Fill, Style, Stroke } from "ol/style";
import { tianditugeocoder } from "@/api/api";
import { ElLoading } from "element-plus";
import { BASE_MAP_URL } from "@/utils/utils.js"
const map = ref(null);
const loading = ref(true);
const countylayer = ref(null);
const countylayerurl = ref("");
const geojsonvalue = ref();
const geoLayer = ref();
let map_id = ref(0);
const popup = ref(null);
let legend = ref({
  show: true,
  data: {},
});
const transferParent = (tparams) => {
  console.log(tparams, "tparams");
  //子传父
  let data = {
    tparams: tparams,
    type: "1",
  };
  window.parent.postMessage(data, "*");
};
let singleClickHandlerAdded = false;
const initMap = () => {
  map.value = new Map({
    target: "mapcolor",
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
      center: fromLonLat([116, 40]),
      minZoom: 3, // 地图缩放最小级别
      zoom: 3,
    }),
  });

  //点击事件
  map.value.on(
    "singleclick",
    (evt) => {
      openfullscreen();
      let coordinate = transform(evt.coordinate, "EPSG:3857", "EPSG:4326");
      const params = {
        postStr: {
          lon: coordinate[0],
          lat: coordinate[1],
          ver: 1,
        },
        type: "geocode",
      };
      tianditugeocoder(params).then((res) => {
        loading.value.close();
        let province_code_arr = ["710000", "810000", "820000"];
        let address = res.result.addressComponent;
        let province_code = address.province_code;
        let county_code = address.county_code;
        let isshowpricode = province_code_arr.includes(province_code);
        let p_c_code = (isshowpricode ? province_code : county_code).slice(3);
        // 点信息
        transferParent({
          id: map_id.value,
          num: p_c_code,
          pnum: province_code.slice(3),
        });
        alertPopup(evt, [{ label: 1, value: 1 }]);
      });
      evt.stopPropagation();
    },
    { once: true }
  );
};
const initPopup = () => {
  // 点击地图展示弹窗
  popup.value = new Overlay({
    element: document.getElementById("popup"),
    positioning: "bottom-center", //相对于其位置属性的实际位置
    stopEvent: false, //事件冒泡
  });
  map.value.addOverlay(popup.value);
};
const alertPopup = (evt, showtooltipmes) => {
  let element = popup.value.getElement();
  var coordinate = evt.coordinate;
  popup.value.setPosition(coordinate);
  let codemes = "";
  for (let i in showtooltipmes) {
    codemes += `<p>${showtooltipmes[i].label}:${showtooltipmes[i].value}</p>`;
  }
  element.innerHTML = codemes;
};
const addCountyLayer = () => {
  removeCountyLayer();
  countylayer.value = new Tile({
    source: new XYZ({
      crossOrigin: "anonymous",
      url: countylayerurl.value,
    }),
  });
  map.value.addLayer(countylayer.value);
};
const removeCountyLayer = () => {
  map.value.removeLayer(countylayer.value);
};
const openfullscreen = () => {
  loading.value = ElLoading.service({
    lock: true,
    text: "Loading",
    background: "rgba(0,0,0,0.7)",
  });
};

const clearGeoJSON = () => {
  if (geoLayer.value) {
    map.value.removeLayer(geoLayer.value);
    geoLayer.value = null;
  }
};
const addGeoJSON = () => {
  clearGeoJSON();
  let source = new VectorSource({
    features: new GeoJSON().readFeatures(geojsonvalue.value, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857",
    }),
  });
  geoLayer.value = new VectorLayer({
    source: source,
    style: new Style({
      stroke: new Stroke({
        color: "#5470c6",
        width: 1,
      }),
      fill: new Fill({
        color: "rgba(255,0,0,0.3)",
      }),
    }),
  });
  map.value.addLayer(geoLayer.value);
};
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
  map_id.value = event.data.id;
  let content = event.data.content;
  legend.value.data = content.legend.data;
  legend.value.show = content.legend.show;
  if (content.layer) {
    // countylayerurl.value =
    //   "http://10.0.90.58:9000/databox/mapserv/tms/3857/{z}/{x}/{y}.png?layer=" +
    //   content.layer;
    countylayerurl.value =
      "http://darwintree.cn/PhyloScape/databox/mapserv/tms/3857/{z}/{x}/{y}.png?layer=" +
      content.layer;
    addCountyLayer();
  }
  if (content.maptype) {
    changeLayer(content.maptype);
  }
  if (content.ctype == "geojson") {
    geojsonvalue.value = content.geojson;
    addGeoJSON();
  }
};
onMounted(() => {
  initMap();
  // initPopup();
  window.addEventListener("message", handleMessage, false);
});
onBeforeUnmount(() => {
  window.removeEventListener("message", handleMessage, false);
});
</script>
<style lang="scss" scoped>
#mapcolor {
  height: 100vh;
  width: 100%;
}
.ol-popup {
  background: white;
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
</style>
