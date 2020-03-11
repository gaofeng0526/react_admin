import React, { Component } from 'react';
import memoryUtils from '../../utils/memoryUtils'
import { Redirect } from 'react-router-dom';
/*
后台管理路由组件
 */
class Admin extends Component{
 render(){
  const user =  memoryUtils.user
  // 如果内存中没存储user 当前未登录
  if(!user || !user._id){
    return <Redirect to='/login'/>
  }
 return(
   <div>
  Hello {user.username}
  </div>
 )
 }
}
export default Admin