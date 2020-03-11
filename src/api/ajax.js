/*
能发送异步Ajax请求的函数模块
封装axios库
函数返回值是promise对象
1.优化：统一处理请求异常
2.优化
*/

import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},type='GET'){
  return new Promise((resolve,reject) =>{
    let promise
    // 1.执行异步ajax请求
    if(type==='GET'){//发GET请求
      promise = axios.get(url,{
        params:data
      })
     }else{//发POST请求
       promise = axios.post(url,data)
     }
    //2.如果成功，调用resolve（value)
     promise.then(response => {
       resolve(response)
    // 3.如果失败了 ，不调用reject（reson），而是提示异常信息
     }).catch(error => {
      message.error('请求出错了' + error.message)
     })
    
  })


}

//请求登录接口
ajax('/api/login',{username:'admin',password:'admin'},'POST').then()
//添加用户
