import request from '@/utils/request'
export function policy() {
  return request({
    url:'/huawei/obs/policy',
    method:'get',
  })
}
