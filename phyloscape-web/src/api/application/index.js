import request from '../request'
// 合并后的geojson
// 注册



//文件上传
export function jhsupload(data){
  return request({
    url:'/jhs/upload',
    method:'post',
    data:data
  })
}
// 树文件配置
export function jhsuploadcfg(data){
  return request({
    url:'/jhs/upload_cfg',
    method:'post',
    data:data
  })
}
//树文件恢复
export function jhscentent(data){
  return request({
    url:'/jhs/content',
    method:'get',
    params:data
  })
}

// 查询当前县的物种
export function jhscounty(data){
  return request({
    url:'/jhs/county',
    method:'get',
    params:data
  })
}

//裁剪树
export function jhsprunetree(data){
  return request({
    url:'/jhs/prunetree',
    method:'post',
    data:data
  })
}

export function jhsareas_bounde(data){
  return request({
    url:'/jhs/areas_bound',
    method:'post',
    data:data
  })
}

// 保存
export function jhssave(data){
  return request({
    url:'/jhs/save',
    method:'post',
    data:data
  })
}

// 树部分配置
export function jhscfg(data){
  return request({
    url:'/jhs/cfg',
    method:'get',
    params:data
  })
}

// maptransmission 查询lineage相关信息
export function jhslineage(data){
  return request({
    url:'/jhs/lineage',
    method:'get',
    params:data
  })
}

// maptransmission 重绘地图
export function jhsredrawmap(data){
  return request({
    url:'/jhs/redraw_map',
    method:'POST',
    data:data
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
export function jhspdb(data){
  return request({
    url:'/jhs/pdb',
    method:'get',
    params:data
  })
}
// map配置信息
export function jhsmapcfg(data){
  return request({
    url:'/jhs/map_cfg',
    method:'post',
    data:data
  })
}