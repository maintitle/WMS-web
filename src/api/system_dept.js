import request from '@/utils/request'
export function getList() {
    return request({
        url: '/system/dept/listAll',
        method: 'get',
    })
}
export function fetchList(params) {
    return request({
        url: '/system/dept/list',
        method: 'get',
        params: params
    })
}
export function deleteDept(ids){
    return request({
        url: '/system/dept/delete',
        method: 'post',
        data: ids
    })
}

export function updateDept(data){
    return request({
        url: '/system/dept/update',
        method: 'post',
        data: data
    })
}
export function addDept(data){
    return request({
        url: '/system/dept/save',
        method: 'post',
        data: data
    })
}

export function updateStatus(cids,status){
    return request({
        url: '/system/dept/update/status',
        method: 'post',
        params: {
            status: status
        },
        data: cids
    })
}
