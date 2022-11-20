import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/ware/repository/list',
        method: 'get',
        params: params
    })
}
export function deleteRepository(ids){
    return request({
        url: '/ware/repository/delete',
        method: 'post',
        data: ids
    })
}

export function updateRepository(data){
    return request({
        url: '/ware/repository/update',
        method: 'post',
        data: data
    })
}