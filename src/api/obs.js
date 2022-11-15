import request from '@/utils/request'
export function policy(id) {
  return request({
    url:id==null?'/huawei/obs/policy/':'/huawei/obs/policy/'+id,
    method:'get',
  })
}
export function deleteFile(url) {
  return request({
    url:'/huawei/obs/delete/',
    method:'post',
    params:{
      url:url
    }
  })
}