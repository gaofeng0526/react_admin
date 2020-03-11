/*
包含应用中所有接口请求函数的模块
*/
import ajax from './ajax'
const BASE = ''
//登录接口
export const reqLogin = (username,password)=> ajax(BASE + '/api/login',{username,password},'POST')
//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add',user,'POST')
// export const  = () => ajax()
// export const  = () => ajax()
// export const  = () => ajax()
// export const  = () => ajax()
// export const  = () => ajax()
// export const  = () => ajax()
// export const  = () => ajax()
// export const  = () => ajax()
// export const  = () => ajax()
// export const  = () => ajax()
// export const  = () => ajax()
// export const  = () => ajax()
// export const  = () => ajax()






