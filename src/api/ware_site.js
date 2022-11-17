import request from '@/utils/request'
export function fetchList(params){
    return request({
        url:'/ware/site/list',
        method:'get',
        params:params
    })
}
export function deleteSite(ids){
    return request({
        url: '/ware/site/delete',
        method: 'post',
        data: ids
    })
}

export function updateSite(data){
    return request({
        url: '/ware/site/update',
        method: 'post',
        data: data
    })
}
export function addSite(data){
    return request({
        url: '/ware/site/save',
        method: 'post',
        data: data
    })
}
