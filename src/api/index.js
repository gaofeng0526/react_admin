/*
包含应用中所有接口请求函数的模块
*/
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'
const BASE = ''
//登录接口
export const reqLogin = (username,password)=> ajax(BASE + '/api/login',{username,password},'POST')
//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add',user,'POST')

//请求天气的jsonp请求
export const reqWeather = (city) =>{
  return new Promise((resolve,reject) => {
    const url = `http://wthrcdn.etouch.cn/weather_mini?city=${city}`
    jsonp(url,{},(err,data) => {
      console.log('Jsonp()',data)
      if(!err &&data.status ===1000){
        const {low,high} = data.data.forecast[0]
        const weather = data.data.forecast[0].type
        const lower = low.slice(3)
        const higher = high.slice(3)
        resolve({weather,lower,higher})
       console.log(weather,lower,higher)
      }else{
        message.error('获取天气信息失败！')
      }
    })  
  })

}
reqWeather('郑州')
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






