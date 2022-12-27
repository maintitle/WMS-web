import request from '@/utils/request'
export function fetchList(params){
    return request({
        url:'/ware/stockin/list',
        method:'get',
        params:params
    })
}
export function deleteStockin(ids){
    return request({
        url: '/ware/stockin/delete',
        method: 'post',
        data: ids
    })
}

export function updateStockin(data){
    return request({
        url: '/ware/stockin/update',
        method: 'post',
        data: data
    })
}
export function addStockin(data){
    return request({
        url: '/ware/stockin/save',
        method: 'post',
        data: data
    })
}