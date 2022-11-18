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