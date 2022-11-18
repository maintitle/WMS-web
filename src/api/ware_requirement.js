import request from '@/utils/request'
export function fetchList(params){
    return request({
        url:'/ware/requirement/list',
        method:'get',
        params:params
    })
}
export function deleteRequirement(ids){
    return request({
        url: '/ware/requirement/delete',
        method: 'post',
        data: ids
    })
}

export function updateRequirement(data){
    return request({
        url: '/ware/requirement/update',
        method: 'post',
        data: data
    })
}
export function addRequirement(data){
    return request({
        url: '/ware/requirement/save',
        method: 'post',
        data: data
    })
}

