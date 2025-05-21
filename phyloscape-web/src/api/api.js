import tianditureq from './tianditureq'
import request from './request'

// 合并后的geojson
export function regiongeojson(data){
  return request({
    url:'/ecoweb/region/geojson',
    method:'get',
    params:data
  })
}

// 逆地理服务API
export function tianditugeocoder(data){
  return tianditureq({
    url:'http://api.tianditu.gov.cn/geocoder',
    method:'get',
    params:data
  })
}

export function getNewSn() {
  return request({
    url: `/webapi/captcha/get_new_sn/?r=${Math.random()}`,
    method: 'get'
  })
}

