import request from './request'
import tianditureq from './tianditureq'

// 合并后的geojson
export function regiongeojson(data){
  return request({
    url:'/ecoweb/region/geojson',
    method:'get',
    params:data
  })
}

// // 逆地理服务API
export function tianditugeocoder(data){
  return tianditureq({
    url:'http://api.tianditu.gov.cn/geocoder',
    method:'get',
    params:data
  })
}


export function jhsexample(data){
  return request({
    url:'/jhs/example',
    method:'get',
    params:data
  })
}

// 绘制
export function jhsdrawmap(data){
  return request({
    url:'/jhs/draw_map',
    method:'post',
    data:data
  })
}