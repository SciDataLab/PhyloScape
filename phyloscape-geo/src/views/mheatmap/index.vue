<template>
    <div class="heatmapwrap">
        <div id="heatmapecharts"></div>
    </div>
</template>
<script setup>
import * as echarts from "echarts";
import { onMounted } from "vue";
let option = {};
let myChart = ""
let type = "";
let seriesdata = "";
let x = ""
let y = ""
let color = ""
let map_type = ""
let bggrid = ""
let rownameshow = ""
let colnameshow = ""
let legendshow = "";
let fontsizevalue = ""
let hmax = ""
let hmin = ""
let colorList = {
    'JET': ['#0000FF', '#00FFFF', '#008000', '#FFFF00', '#FFA500', '#FF0000'],
    'HSV': ['#FF0000', '#FFFF00', '#00FF00', '#00FFFF', '#0000FF', '#FF00FF'],
    'STEELBLUE':['#477fb1','#82a5c9','#b9cae2','#d9e2ed','#ffffff'],
    'WINE':['#c20c06','#d23736','#f1807f','#ffc0c2','#feefee','#FFFFFF'],
    'HOT': ['#000000', '#FF0000', '#FFA500', '#FFFF00', '#FFFFFF'],
    'COOL': ['#0000FF', '#00FFFF', '#FFFFFF'],
    'SPRING': ['#FFC0CB', '#FF00FF', '#ADFF2F', '#FFFF00'],
    'SUMMER': ['#008000', '#00FF00', '#98FB98', '#FFEA00',],
    'AUTUMN': ['#000000', '#D2691E', '#FFA07A', '#FFFF00'],
    'WINTER': ['#0000FF', '#00FFFF', '#ADD8E6', '#FFFFFF'],
    'GRAY': ['#000000', '#808080', '#BFBFBF', '#D3D3D3', '#FFFFFF'],
    'BONE': ['#000000', '#666666', '#AAAAAA', '#FFFFFF'],
}
const transferParent = (tparams) => {
    //子传父
    let data = {
        tparams: tparams,
        type: "9",
    };
    window.parent.postMessage(data, "*");
};
const handleMessage = (event) => {
    console.log(event,'event')
    myChart.clear()
    let content = event.data.content;
    // type = content.type;
    seriesdata = content.data;
    color = content.color;
    map_type = content.view;
    bggrid = content.bggrid;
    rownameshow = content.rowname;
    colnameshow = content.colname;
    legendshow = content.legend;
    fontsizevalue = content.fontsize;
    x = content.x;
    y = content.y;
    hmax = content.max;
    hmin = content.min;
    initEcharts();
}
const initEcharts = () => {
    option = {
        tooltip: {
            position: 'top',
            confine: true,
            trigger: 'item',
            formatter: function (params) { // 自定义 tooltip 内容
                return 'Row: ' + x[params.value[0]] + '<br/>' +
                    'Column: ' + y[params.value[1]] + '<br/>' +
                    'Value: ' + params.value[2];
            }
        },
        grid: {
            containLabel: true // 当yAxis的label较长时，是否包含label
        },
        xAxis: {
            type: 'category',
            data: x,
            splitArea: {
                show: bggrid
            },
            axisLabel: {
                fontSize: fontsizevalue || '10',
                show: rownameshow, // 隐藏x轴上的标签
                rotate: 90 // 旋转角度为90度
            },
            axisTick: { // 隐藏刻度线
                show: false
            },
            axisLine: { // 隐藏轴线
                show: false
            },
        },
        yAxis: {
            type: 'category',
            data: y,
            splitArea: {
                show: bggrid
            },
            axisLabel: {
                fontSize: fontsizevalue || '10',
                show: colnameshow // 隐藏x轴上的标签
            },
            axisTick: { // 隐藏刻度线
                show: false
            },
            axisLine: { // 隐藏轴线
                show: false
            },
        },
        visualMap: {
            min: hmin || 0,
            max: hmax || 0,
            calculable: true,
            right: '0',
            top: 'center',
            color: colorList[color]
        },
        series: [
            {
                name: '',
                type: 'heatmap',
                data: seriesdata,
                label: {
                    show: false
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    option && myChart.setOption(option);
    myChart.off("click");
    myChart.on("click", function (params) {
        transferParent({
            names: [x[params.value[0]], y[params.value[1]]],
        })
    });
};
onMounted(() => {
    myChart = echarts.init(document.getElementById("heatmapecharts"));
    window.addEventListener("message", handleMessage)
    window.addEventListener("resize", function () {
        myChart && myChart.resize();
    });

});
// const resetSeries1 = () => {
//     initEcharts();
// };
</script>
<style lang="scss">
#heatmapecharts {
    width: 98%;
    height: 98vh;
}
</style>