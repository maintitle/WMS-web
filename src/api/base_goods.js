import request from '@/utils/request'
export function fetchList(params){
    return request({
        url: '/base/goods/list',
        method: "get",
        params: params
    })
}
export function deleteGoods(ids){
    return request({
        url: '/base/goods/delete',
        method: 'post',
        data: ids
    })
}

export function updateGoods(data){
    return request({
        url: '/base/goods/update',
        method: 'post',
        data: data
    })
}
export function addGoods(data){
    return request({
        url: '/base/goods/save',
        method: 'post',
        data: data
    })
}

export function updateStatus(gids,status){
    return request({
        url: '/base/goods/update/status',
        method: 'post',
        params: {
            status: status
        },
        data: gids
    })
}