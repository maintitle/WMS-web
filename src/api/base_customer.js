import request from '@/utils/request'

export function fetchList(params){
    return request({
        url:'/base/customer/list',
        method:'get',
        params:params
    })
}
export function deleteCustomer(ids){
    return request({
        url: '/base/customer/delete',
        method: 'post',
        data: ids
    })
}