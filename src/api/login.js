import request from '@/utils/request'

export function login(username, password, code) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password,
      code
    }
  })
}



export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}


export function getCode(){
  return request({
    url: '/getCode',
    method: 'get',
  })
}
