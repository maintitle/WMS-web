import request from '@/utils/request'
export function getUserInfo(id) {
    return request({
        url: '/user/infoDetail/' + id,
        method: 'get',
    })
}
export function fetchListAll() {
    return request({
        url: '/user/listAll',
        method: 'get',
    })
}