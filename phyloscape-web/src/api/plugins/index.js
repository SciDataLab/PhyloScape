import request from '../request'
export function jhsexample(data){
  return request({
    url:'/jhs/example',
    method:'get',
    params:data
  })
}