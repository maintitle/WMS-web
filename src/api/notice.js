import request from '@/utils/request'

export function getNotice() {
    return request({
      url: '/notice/info',
      method: 'get',
    })
  }