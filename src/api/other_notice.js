import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/other/notice/list',
        method: 'get',
        params:  params
    })
}
export function deleteNotice(ids){
    return request({
        url: '/other/notice/delete',
        method: 'post',
        data: ids
    })
}
export function getNotice() {
    return request({
      url: '/other/notice/info',
      method: 'get',
    })
  }
