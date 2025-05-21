export const baseUrl = 'http://darwintree.cn/files/'
export const geoUrl = 'http://darwintree.cn/geo/'
export const webUrl = 'http://darwintree.cn/PhyloScape/'
export const BASE_MAP_URL  = 'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=en&size=1&scl=1&style=7'


function colorChange(R, G, B) {
  //找到最大的色值
  let maxColorObject = findMaxRGB(R, G, B)
  //生成相近色
  let shallowColorArray = getShallowRGB(maxColorObject, R, G, B)
  return [`rgb(${shallowColorArray[0].toString()})`, `rgb(${shallowColorArray[1].toString()})`, `rgb(${shallowColorArray[2].toString()})`]
}

function getShallowRGB(maxColorObject, R, G, B) {
  let threshold = 40//色阶偏差值
  let offset = 10//色深偏差值
  let result = []
  for (var d in maxColorObject) {
    if (d == 'R') {
      result = [
        [R - offset, G + threshold, B + threshold],
        [R - offset, G + threshold + 20, B + threshold + 20],
        [R - offset, G + threshold + 40, B + threshold + 40]
      ]
    } else if (d == 'G') {
      result = [
        [R + threshold, G - offset, B + threshold],
        [R + threshold + 20, G - offset, B + threshold + 20],
        [R + 60, G - offset, B + 60]
      ]
    } else if (d == 'B') {
      result = [
        [R + threshold, G + threshold, B - offset],
        [R + threshold + 20, G + threshold + 20, B - offset],
        [R + threshold + 40, G + threshold + 40, B - offset]
      ]
    }

  }
  return result
}
//找到最大的RGB
function findMaxRGB(R, G, B) {
  let max
  let index
  if (R >= G && R >= B) {
    max = R
    index = 'R'
  }
  if (G >= R && G >= B) {
    max = G
    index = 'G'
  }
  if (B >= R && B >= G) {
    max = B
    index = 'B'
  }
  return {
    [index]: max
  }
}

function formatRGB(color) {
  // 16进制颜色值的正则
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 把颜色值变成小写
  color = color.toLowerCase();
  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff
    if (color.length === 4) {
      var colorNew = "#";
      for (var i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }
    // 处理六位的颜色值，转为RGB
    var colorChange = [];
    for (var i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    return colorChange.join(",");
  } else {
    return color;
  }
}
export const changeColor = (color) => {
  const colorRGB = formatRGB(color)
  var arr = colorRGB.split(",");
  if (arr.length == 3) {
    const getcolor = colorChange(parseInt(arr[0]), parseInt(arr[1]), parseInt(arr[2]))
    getcolor.unshift(`rgb(${colorRGB})`)
    return getcolor
  }
}
