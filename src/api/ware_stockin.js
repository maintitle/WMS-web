import request from '@/utils/request'
export function fetchList(params,type){
    return request({
        url:'/ware/stockin/list/'+type,
        method:'get',
        params:params
    })
}
export function examineAndApprove(params){
    return request({
        url:'/ware/stockin/examineAndApprove',
        method:'get',
        params:params
    })
}