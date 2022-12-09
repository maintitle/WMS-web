import request from '@/utils/request'
export function getUserInfo(id) {
    return request({
        url: '/system/user/infoDetail/' + id,
        method: 'get',
    })
}
export function fetchListAll() {
    return request({
        url: '/system/user/listAll',
        method: 'get',
    })
}
export function getInfo() {
    return request({
        url: '/system/user/info',
        method: 'get',
    })
}
export function updateUser(data){
    return request({
        url: '/system/user/update',
        method: 'post',
        data: data
    })
}