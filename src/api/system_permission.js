import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/system/permission/list',
        method: 'get',
        params: params
    })
}
export function deletePermission(ids){
    return request({
        url: '/system/permission/delete',
        method: 'post',
        data: ids
    })
}

export function updatePermission(data){
    return request({
        url: '/system/permission/update',
        method: 'post',
        data: data
    })
}
export function addPermission(data){
    return request({
        url: '/system/permission/save',
        method: 'post',
        data: data
    })
}

export function updateStatus(ids,status){
    return request({
        url: '/system/permission/update/status',
        method: 'post',
        params: {
            status: status
        },
        data: ids
    })
}
