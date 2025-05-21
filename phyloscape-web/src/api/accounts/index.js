import request from '../request'
// 合并后的geojson
// 注册
export function userregister(data){
  return request({
    url:'/user/register',
    method:'post',
    data:data
  })
}
// 验证码
export function usercaptcha(data){
  return request({
    url:'/user/captcha',
    method:'get',
    params:data
  })
}
// 登录
export function userauthtoken(data){
  return request({
    url:'/user/auth_token',
    method:'post',
    data:data
  })
}
// 退出
export function userlogout(data){
  return request({
    url:'/user/logout ',
    method:'post',
    data:data
  })
}

// 发送邮件重置密码
export function usersendmail(data){
  return request({
    url:`/user/send_mail`,
    method:'post',
    data:data
  })
}

// 重置密码
export function userpasswd(data,uid){
  return request({
    url:`/user/passwd/${uid}`,
    method:'post',
    data:data
  })
}

// 用户信息
export function userinfo(data){
  return request({
    url:`/user/info`,
    method:'get',
    params:data
  })
}

// 我的数据
export function jhscenter(data){
  return request({
    url:`/jhs/center`,
    method:'get',
    params:data
  })
}
export function jhspersondel(data){
  return request({
    url:`/jhs/person/${data.id}`,
    method:'delete',
    data:data
  })
}

// 点赞
export function jhslike(data){
  return request({
    url:`/jhs/like`,
    method:'get',
    params:data
  })
}

// 共享编辑
export function jhspersonpost(id,params){
  return request({
    url:`/jhs/person/${id}`,
    method:'post',
    data:params
  })
}

// 是否共享
export function jhspersonput(data){
  return request({
    url:`/jhs/person/${data.id}`,
    method:'put',
    data:data
  })
}