import request from '../request'
// 合并后的geojson
// 注册
export function uploadImage(data){
  return request({
    url:'/upload/image',
    method:'post',
    data:data
  })
}

export function jhsgallery(data){
  return request({
    url:'/jhs/gallery',
    method:'get',
    params:data
  })
}