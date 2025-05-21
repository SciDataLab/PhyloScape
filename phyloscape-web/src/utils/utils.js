import {reactive} from "vue";
import panel5 from "@/assets/application/panel5.png";
import panel4 from "@/assets/application/panel4.png";
import panel3 from "@/assets/application/panel3.png";
import panel2 from "@/assets/application/panel2.png";
import panel1 from "@/assets/application/panel1.png";
import { ElLoading } from "element-plus";
import maptransmissionimg from "@/assets/plugins/maptransmission.png";
import mapcolorimg from "@/assets/plugins/mapcolor.png";
import mapregionimg from "@/assets/plugins/mapregion.png";
import pienetworkimg from "@/assets/plugins/pienetwork.png";
import freqstackimg from "@/assets/plugins/freqstack.png";
import groupbarimg from "@/assets/plugins/groupbar.png";
import acmapimg from "@/assets/plugins/acmap.png";
import heatmapimg from "@/assets/plugins/heatmap.png";

import pdbeimg from "@/assets/plugins/pdbe.png";

// export const docUrl = "http://10.0.90.58:5175/";
// export const geoUrl = "http://localhost:5175/geo/";
// export const webUrl = "http://10.0.90.58:5175/";

export const docUrl = "http://darwintree.cn/files/";
export const geoUrl = 'http://darwintree.cn/geo/';
export const webUrl = "http://darwintree.cn/PhyloScape/";


export const maxFileSize = 104857600; //1024*1024*100
export const selectdemoopt1large = [
  {
    label:'Large Tree',
    value:'ldemo1'
  }
]
export const selectdemoopt1 = [{
  label:'Demo: a demo of  PhyloScape annotations',
  value:'odemo1'
},{
  label:'Evolution: a simple tree of different species',
  value:'odemo2'
},{
  label:'LTR Evolution & Expression: gorGor6 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Gorilla+gorilla)',
  value:'gorGor6'
},{
  label:'LTR Evolution & Expression: oryCun2 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Oryctolagus+cuniculus)',
  value:'oryCun2'
},{
  label:'LTR Evolution & Expression: oviAri4 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Ovis+aries)',
  value:'oviAri4'
},{
  label:'LTR Evolution & Expression: pteVam1 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Pteropus+vampyrus)',
  value:'pteVam1'
},{
  label:'LTR Evolution & Expression: rheMac10 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Macaca+mulatta)',
  value:'rheMac10'
},{
  label:'LTR Evolution & Expression: rn7 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Rattus+norvegicus)',
  value:'rn7'
},{
  label:'LTR Evolution & Expression: sacCer3 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Saccharomy+cescerevisiae)',
  value:'sacCer3'
},{
  label:'LTR Evolution & Expression: susScr11 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Sus+scrofa)',
  value:'susScr11'
},{
  label:'LTR Evolution & Expression: xenTro10 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Xenopus+tropicalis)',
  value:'xenTro10'
},{
  label:'LTR Evolution & Expression: mm39 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Mus+musculus)',
  value:'mm39'
},{
  label:'LTR Evolution & Expression: loxAfr3 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Loxodonta+africana)',
  value:'loxAfr3'
},{
  label:'LTR Evolution & Expression: hs1 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Homo+Sapiens)',
  value:'hs1'
},{
  label:'LTR Evolution & Expression: galGal6 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Gallus+gallus)',
  value:'galGal6'
},{
  label:'LTR Evolution & Expression: felCat9 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Felis+catus)',
  value:'felCat9'
},{
  label:'LTR Evolution & Expression: eriEur2 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Erinaceus+europaeus)',
  value:'eriEur2'
},{
  label:'LTR Evolution & Expression: equCab3 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Equus+caballus)',
  value:'equCab3'
},{
  label:'LTR Evolution & Expression: dm6 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Drosophila+melanogaster)',
  value:'dm6'
},{
  label:'LTR Evolution & Expression: danRer11 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Danio+rerio)',
  value:'danRer11'
},{
  label:'LTR Evolution & Expression: ce11 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Caenorhabditis+elegans)',
  value:'ce11'
},{
  label:'LTR Evolution & Expression: bosTau9 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Canis+lupus)',
  value:'bosTau9'
},{
  label:'LTR Evolution & Expression: canFam6 (http://data.iscr.ac.cn/ltr/#/ltrsindex?name=Bos+taurus)',
  value:'canFam6'
}]
export const selectdemoopt2 = [
  {
    label:'A subtree of the Chinease vascular tree, showing the distribution of plant species',
    value:'tdemo1'
  },
  {
    label:'WNV_demo: a subtree of WNV transmission on map',
    value:'tdemo2'
  },
  {
    label:'Region_demo: a tree demo to visualise the sampling areas, different colour related to the different groups',
    value:'tdemo3'
  },
  {
    label:'WNV_network_demo: a subtree of WNV transmission in a network view',
    value:'tdemo4'
  },
  {
    label:'Time_demo: frequency of strain with time',
    value:'tdemo5'
  },
  {
    label:'Count_demo: tree with number of in and out in a region',
    value:'tdemo6'
  },
  {
    label:'An ACmap of influenza',
    value:'tdemo7'
  },
  {
    label:'Ruegeria taxonomy',
    value:'tdemo9'
  },
  {
    label:'PDB: a tree of cyp51 fungi',
    value:'tdemo8'
  }
]
export const selectdemoopt3 = [{
  label:'Demo_3panels: a demo for 3 panels with tree, transmission and stack plot',
  value:'moredemo1',
  num:3
},
{
  label:'Demo_4panels: a demo for 4 panels with tree, acmap, bar plot and stack plot',
  value:'moredemo2',
  num:4,
},{
  label:'Demo_5panels: a demo for 5 panels with tree,  transmission, acmap, bar plot and stack plot',
  value:'moredemo3',
  num:5,
}]
export const yesornoopts = [
  {
    label: "是",
    value: true,
  },
  {
    label: "否",
    value: false,
  },
]
export const apptypeopts = [
  {
    label: "Select",
    value: 0,
  },
  {
    label: "MapColor",
    value: 1,
  },
  {
    label: "MapTransmission",
    value: 2,
  },
  {
    label: "MapRegion",
    value: 3,
  },
  {
    label: "PieNetwork",
    value: 4,
  },
  {
    label: "FreqStack",
    value: 5,
  },
  {
    label: "GroupBar",
    value: 6,
  },
  {
    label: "ACMap",
    value: 7,
  },
  
  {
    label: "Heatmap",
    value: 9,
  },
  {
    label: "Pdb",
    value: 8,
  },
];
export const gallerytypeopts = [
  {
    label:'All',
    value:'-1'
  },
  {
    label:'Tree',
    value:0
  },
  {
    label:'Map',
    value:1
  },
  {
    label:'Diagram',
    value:2
  },
  {
    label:'Structure',
    value:3
  },
]
export const sharetypeopts = [
  {
    label:'Tree',
    value:0
  },
  {
    label:'Map',
    value:1
  },
  {
    label:'Diagram',
    value:2
  },
  {
    label:'Structure',
    value:3
  },
]
export const panelli = [
  {
    num: 5,
    name: panel5,
  },
  {
    num: 4,
    name: panel4,
  },
  {
    num: 3,
    name: panel3,
  },
  {
    num: 2,
    name: panel2,
  },
  {
    num: 1,
    name: panel1,
  },
];
export const plugintypevalue = {
  0: "nodata",
  1: "mapcolor",
  2: "maptransmission",
  3: "mapdensity",
  4: "pienetwork",
  5: "freqstack",
  6: "groupbar",
  7: "acmap",
  8: "pdb",
  9: "heatmap",
};
export const pluginlistzh  = [
{
  id: "mapcolor",
  img: mapcolorimg,
  title: "MapColor",
  abs: "对地图中区域进行着色，并标注其数量。地图分区达到县级水平。",
  key: "Map",
  show:true,
  template:'tdemo1',
},
{
  id: "maptransmission",
  img: maptransmissionimg,
  title: "MapTransmission",
  abs: "传播链在地图上的展示，根据经纬度标注位置信息，其比例由分组信息计算得到。",
  key: "Map",
  show:true,
  template:'tdemo2',
},
{
  id: "mapdensity",
  img: mapregionimg,
  title: "MapRegion",
  abs: "取样点标记以及分组区域标记。",
  key: "Map",
  show:true,
  template:'tdemo3',
},
{
  id: "pienetwork",
  img: pienetworkimg,
  title: "PieNetwork",
  abs: "网络图，每个节点可以展示其组成比例。",
  key: "Diagram",
  show:true,
  template:'tdemo4',
},
{
  id: "freqstack",
  img: freqstackimg,
  title: "FreqStack",
  abs: "提供一个随时间变化并根据分组信息着色的堆叠面积图。",
  key: "Diagram",
  show:true,
  template:'tdemo5',
},
{
  id: "groupbar",
  img: groupbarimg,
  title: "GroupBar",
  abs: "计算每个区域点出入的总数目。",
  key: "Diagram",
  show:true,
  template:'tdemo6',
},
{
  id: "acmap",
  img: acmapimg,
  title: "ACMap",
  abs: "使用R包Racmacs绘制抗原图谱<br>示例数据为人流感抗原数据（doi:10.1371/journal.pcbi.1000949）。",
  key: "Diagram",
  show:true,
  template:'tdemo7',
},
{
  id: "headmap",
  img: heatmapimg,
  title: "Heatmap",
  abs: "用于成对AAI可视化等。当插件热图中的网格被选中时，对应进化树的叶节点会进行高亮显示；如果选中进化树中的一个类群，热图中的对应部分会单独展示。",
  key: "Diagram",
  show:true,
  template:'tdemo9',
},
{
  id: "pdb",
  img: pdbeimg,
  title: "PDBe",
  abs: "Mol*（/'Mol-star/）的PDBe实现（doi.org/10.1093/nar/gkab314）",
  key: "Structure",
  show:true,
  template:'tdemo8',
},
];
export const pluginlisten = [
  {
    id: "mapcolor",
    img: mapcolorimg,
    title: "MapColor",
    abs: "Color the areas on the map based on the quantity information. The zoning of the map has reached the county level.",
    key: "Map",
    show:true,
    template:'tdemo1',
  },
  {
    id: "maptransmission",
    img: maptransmissionimg,
    title: "MapTransmission",
    abs: "Display transmission routine on the map, the location is labeled based on longitude and latitude, and the percentage is calculated according to the group information.",
    key: "Map",
    show:true,
    template:'tdemo2',
  },
  {
    id: "mapdensity",
    img: mapregionimg,
    title: "MapRegion",
    abs: "Marking of sampling points and grouping areas on the map.",
    key: "Map",
    show:true,
    template:'tdemo3',
  },
  {
    id: "pienetwork",
    img: pienetworkimg,
    title: "PieNetwork",
    abs: "A network diagram where each node can show the percentage of components.",
    key: "Diagram",
    show:true,
    template:'tdemo4',
  },
  {
    id: "freqstack",
    img: freqstackimg,
    title: "FreqStack",
    abs: "A stacked area plot that changes over time and is colored according to group information.",
    key: "Diagram",
    show:true,
    template:'tdemo5',
  },
  {
    id: "groupbar",
    img: groupbarimg,
    title: "GroupBar",
    abs: "Calculate the total number of ins and outs in each region.",
    key: "Diagram",
    show:true,
    template:'tdemo6',
  },
  {
    id: "acmap",
    img: acmapimg,
    title: "ACMap",
    abs: "An antigenic map constructed from titration data, using the Racmacs package (https://acorg.github.io/Racmacs/index.html) for data acquisition. The background grid spacing is set to 1 unit.<br>The human influenza antigenic data (doi: 10.1371/journal.pcbi.1000949) is used for demonstration.",
    key: "Diagram",
    show:true,
    template:'tdemo7',
  },
  {
    id: "headmap",
    img: heatmapimg,
    title: "Heatmap",
    abs: "A visualization of the pairwise average amino acid identity. When a grid cell in the heatmap of average amino acid identity is selected, the corresponding tree tips are highlighted. If a clade is selected, the relevant section of the heatmap is displayed for the pairwise average amino acid identities.",
    key: "Diagram",
    show:true,
    template:'tdemo9',
  },
  {
    id: "pdb",
    img: pdbeimg,
    title: "PDBe",
    abs: "The pdbe-molstar library of Mol* (/'mol-star/) implementation (doi.org/10.1093/nar/gkab314).",
    key: "Structure",
    show:true,
    template:'tdemo8',
  },
  ];
export const maptypeopts = [
{
  id:'application.heavenandearthsatellite',
  value:'http://t{0-7}.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=7786923a385369346d56b966bb6ad62f'
},
{
  id:'application.heavenandearthstreets',
  value:'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=en&size=1&scl=1&style=7',
},
{
  id:'application.satellitehybrid',
  value:'http://t{0-7}.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=7786923a385369346d56b966bb6ad62f',
},
{
  id:'application.heavenandearthterrain',
  value:'http://t{0-7}.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=7786923a385369346d56b966bb6ad62f',
},
// {
//   id:'application.terrainmixing',
//   value:'http://t{0-7}.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=7786923a385369346d56b966bb6ad62f',
// },
// {
//   id:'application.esriimagery',
//   value:'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
// },{
//   id:'application.esristreets',
//   value:'http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
// },{
//   id:'application.googleimagery',
//   value:'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
// },{
//   id:'application.googlestreets',
//   value:'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}',
// },
{
  id:'application.amapimagery',
  value:'http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
},{
  id:'application.amapstreets',
  value:'http://webrd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}',
}];
let Loading = "";
export const openLoading = () => {
  Loading = ElLoading.service({
    text: "Loading",
    background: "rgba(0, 0, 0, 0.7)",
  });
};
export const closeLoading = () => {
  Loading ? Loading.close() : "";
};
// 递归找到该Link下所有的结点
export const collectChildrenNames = (obj) => {
  let names = [];
  function traverse(node) {
    if (node && node.children && node.children.length > 0) {
      node.children.map((child) => {
        traverse(child);
      });
    } else {
      names.push(node.name);
    }
  }

  traverse(obj);
  return names;
};

// 中英文提示
export const  zhuploaddatashow= "*请上传数据后，选择需要展示的插件"
export const  enuploaddatashow= "*Please upload the plugin data and then select the plugin."

const pubKey = `-----BEGIN RSA PUBLIC KEY-----
MIGJAoGBAMzlcSSxTuCm18LnmkO7LFI4viOkDR8k74vwG9LqRdtrjNQmSX3tYs97
EEKplI/sPYNYLNtDtcUm2IuqhEyAtogbviTEWP9z4cO6nXWB6w9nKcLI3FU0nGMS
wpp0nZF9+Y1zz3gtarbJ1MYb7LQ4qLDQ0Rzd1KkrAUlVk33nHJVVAgMBAAE=
-----END RSA PUBLIC KEY-----`;
import { JSEncrypt } from "jsencrypt";
export const rsapassword = (data) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(pubKey);
  let rsavalue = encrypt.encrypt(data);
  return rsavalue;
};
export const readFile = (filePath) => {
  // 创建一个新的xhr对象
  let xhr = null,
    okStatus = document.location.protocol === "file" ? 0 : 200;
  xhr = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP");
  xhr.open("GET", filePath, false); //filePath为绝对路径
  xhr.overrideMimeType("text/html;charset=utf-8");
  xhr.send(null);
  return xhr.status === okStatus ? xhr.responseText : null;
};
export const readFileFirstLine = (filePath) => {
  // 创建一个新的xhr对象
  let xhr = null,
    okStatus = document.location.protocol === "file" ? 0 : 200;
  xhr = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP");
  xhr.open("GET", filePath, false); //filePath为绝对路径
  xhr.overrideMimeType("text/html;charset=utf-8");
  xhr.send(null);
  return xhr.status === okStatus
    ? xhr.responseText.slice(0, xhr.responseText.indexOf("\n"))
    : null;
};
// 共享校验
export const sharerules = reactive({
  img: [
    {
      required: true,
      message: "Please upload image!",
      trigger: "blur",
    },
  ],
  title: [
    {
      required: true,
      message: "Please input title!",
      trigger: "blur",
    },
    {
      min: 2,
      max: 50,
      message: "Length should be 2 to 50",
      trigger: "blur",
    }
  ],
  des: [
    {
      required: true,
      message: "Please input describe!",
      trigger: "blur",
    },
    {
      min: 2,
      max: 300,
      message: "Length should be 2 to 300",
      trigger: "blur",
    }
  ],
  type: [
    {
      required: true,
      message: "Please select type!",
      trigger: "change",
    },
  ],
});