import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/ware/purchase/list',
        method: 'get',
        params: params
    })
}
export function getUnreceivedPurchase() {
    return request({
        url: '/ware/purchase/unreceive/list',
        method: 'get',
    })
}
export function mergeRequirement(items,purchaseId) {
    return request({
        url: '/ware/purchase/merge',
        method: 'post',
        data: {
            purchaseId: purchaseId, items: items
        }
    })
}

export function deletePurchase(ids){
    return request({
        url: '/ware/purchase/delete',
        method: 'post',
        data: ids
    })
}

export function updatePurchase(data){
    return request({
        url: '/ware/purchase/update',
        method: 'post',
        data: data
    })
}
export function addPurchase(data){
    return request({
        url: '/ware/purchase/save',
        method: 'post',
        data: data
    })
}
