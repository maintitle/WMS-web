import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/other/logged/list',
        method: 'get',
        params:  params
    })
}
export function deleteLogged(ids){
    return request({
        url: '/other/logged/delete',
        method: 'post',
        data: ids
    })
}
