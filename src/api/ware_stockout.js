import request from '@/utils/request'
export function fetchList(params){
    return request({
        url:'/ware/stockout/list',
        method:'get',
        params:params
    })
}
export function deleteStockout(ids){
    return request({
        url: '/ware/stockout/delete',
        method: 'post',
        data: ids
    })
}

export function updateStockout(data){
    return request({
        url: '/ware/stockout/update',
        method: 'post',
        data: data
    })
}
export function addStockout(data){
    return request({
        url: '/ware/stockout/save',
        method: 'post',
        data: data
    })
}