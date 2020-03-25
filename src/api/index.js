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
      // console.log('Jsonp()',data)
      if(!err &&data.status ===1000){
        const {low,high} = data.data.forecast[0]
        const weather = data.data.forecast[0].type
        const lower = low.slice(3)
        const higher = high.slice(3)
        resolve({weather,lower,higher})
      //  console.log(weather,lower,higher)
      }else{
        message.error('获取天气信息失败！')
      }
    })  
  })
}
//获取一级/二级分类列表
export const reqCategorys = (parentId) => ajax(BASE + '/api/category/list',{parentId})
//添加分类
export const reqAddCategory = (categoryName,parentId) => ajax(BASE + '/api/category/add',{categoryName,parentId},'POST')
//更新分类
export const reqUpdateCategory = ({categoryId,categoryName}) => ajax(BASE + '/api/category/update',{categoryId,categoryName},'POST')
//获取一个分类
export const reqCategory = (categoryId) => ajax(BASE + '/api/category/info',{categoryId})

//获取商品分页列表
export const reqProducts = (pageNum,pageSize) => ajax(BASE + '/api/product/list',{pageNum,pageSize})
//搜索商品分页列表(根据名称/根据描述)
export const reqSearchProducts = ({pageNum,pageSize,searchName,searchType}) => ajax(BASE + '/api/product/search',{pageNum,pageSize,[searchType]:searchName})
//控制商品上下架
export const reqUpdateStatus = (productId,status) => ajax(BASE + '/api/product/updateStatus',{productId,status},'POST')
//控制删除图片
export const reqDeleteImg = (name) => ajax(BASE + '/api/img/delete',{name},'POST')
//更新商品/添加商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/api/product/' + (product._id ?'update':'add'),product,'POST')
//获取角色的列表
export const reqRoles = () => ajax(BASE + '/api/role/list')
//添加角色
export const reqAddRole = (name) => ajax(BASE + '/api/role/add',{name},'POST')
//更新角色
export const reqUpdateRole = (role) => ajax(BASE + '/api/role/update',role,'POST')
// export const  = () => ajax()
// export const  = () => ajax()
// export const  = () => ajax()
// export const  = () => ajax()






