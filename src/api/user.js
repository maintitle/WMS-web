import request from '@/utils/request'
export function getUserInfo(id) {
    return request({
        url: '/user/infoDetail/'+id,
        method: 'get',
    })
}