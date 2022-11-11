import request from '@/utils/request'
export function policy(id) {
  return request({
    url:'/huawei/obs/policy/'+id,
    method:'get',
  })
}