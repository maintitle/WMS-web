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
export function fetchList(params) {
    return request({
        url: '/system/user/list',
        method: 'get',
        params: params
    })
}
export function updateStatus(ids,status){
    return request({
        url: '/system/user/update/status',
        method: 'post',
        params: {
            status: status
        },
        data: ids
    })
}
export function addUser(data){
    return request({
        url: '/system/user/save',
        method: 'post',
        data: data
    })
}
export function deleteUser(ids){
    return request({
        url: '/system/user/delete',
        method: 'post',
        data: ids
    })
}