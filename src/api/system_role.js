import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/system/role/list',
        method: 'get',
        params: params
    })
}
export function deleteRole(ids){
    return request({
        url: '/system/role/delete',
        method: 'post',
        data: ids
    })
}

export function updateRole(data){
    return request({
        url: '/system/role/update',
        method: 'post',
        data: data
    })
}
export function addRole(data){
    return request({
        url: '/system/role/save',
        method: 'post',
        data: data
    })
}

export function updateStatus(ids,status){
    return request({
        url: '/system/role/update/status',
        method: 'post',
        params: {
            status: status
        },
        data: ids
    })
}