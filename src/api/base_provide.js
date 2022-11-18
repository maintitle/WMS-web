import request from '@/utils/request'
export function fetchList(params){
    return request({
        url:'/base/provide/list',
        method:'get',
        params:params
    })
}
export function deleteProvide(ids){
    return request({
        url: '/base/provide/delete',
        method: 'post',
        data: ids
    })
}

export function updateProvide(data){
    return request({
        url: '/base/provide/update',
        method: 'post',
        data: data
    })
}
export function addProvide(data){
    return request({
        url: '/base/provide/save',
        method: 'post',
        data: data
    })
}

export function updateStatus(pids,status){
    return request({
        url: '/base/provide/update/status',
        method: 'post',
        params: {
            status: status
        },
        data: pids
    })
}
export function getProductNameAndId(){
    return request({
        url: '/base/provide/listNameAndId',
        method: 'get',
    })
}
