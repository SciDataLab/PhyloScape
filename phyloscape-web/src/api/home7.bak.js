import request from './request'
// 合并后的geojson
export function aliyungeojson(data){
  return request({
    url:'/areas_v3/bound/geojson',
    method:'get',
    params:data
  })
}