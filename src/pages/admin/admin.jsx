import React, { Component } from 'react';
import { Layout,Modal } from 'antd';
import { Redirect, Route, Switch} from 'react-router-dom';
import { reqWeather } from '../../api/index'

import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import './admin.less'

import LeftNav from './left-nav/index';
import LinkButton from '../../components/link-button/index'

  import Home from '../home/home'
  import Category from '../category/category'
  import Product from '../product/product'
  import User from '../user/user'
  import Role from '../role/role'
  import UnFinish from '../order/unfinish'
  import All from '../order/all'
import menuList from '../../config/menuConfig';

const { Footer, Content, Header } = Layout;
const { confirm } = Modal;
/*
后台管理路由组件
 */
class Admin extends Component {
  state = {
    currentTime: formateDate(Date.now()),
    weather: '',
    lower: '',
    higher: ''
  }
  getTime = () => {
   this.intervalId = setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({ currentTime })
    }, 1000)
  }
  getWeather = async () => {
    const { weather, lower, higher } = await reqWeather('郑州')
    this.setState({ weather, lower, higher })
  }

  getTitle = () => {
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }
  //退出登录
logOut = () => {
  confirm({
    content: '确定退出么',
    onOk: () => {
      // console.log('OK');
      //删除user 保存的数据
      storageUtils.removeUser()
      memoryUtils.user ={}
      //跳转到Login
      this.props.history.replace('/login')
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}
  /*
    在第一次render之后
    发ajax请求
    启动定时器
     */
  componentDidMount() {
    this.getTime()
    this.getWeather()
  }
  //组件卸载前使用
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }
  render() {
    const { currentTime, weather, lower, higher } = this.state
    const title = this.getTitle();
    const user = memoryUtils.user
    // 如果内存中没存储user 当前未登录
    if (!user || !user._id) {
      return <Redirect to='/login' />
    }
    return (
      <Layout style={{ height: '100%'}} >
        <LeftNav></LeftNav>
        <Layout>
          <Header className="site-layout-sub-header-background" >
            <p style={{ margin: -17, }}><span className="welcome">欢迎 , {user.username} &nbsp;&nbsp;&nbsp; <LinkButton onClick={this.logOut}>退出</LinkButton></span></p>
            <hr />
            <div className='index_bar' style={{ margin: -15, }}>
              <div className='index'>{title}</div>
              <div className='weather'>
                <span className='time'>{currentTime}</span>
                <span className='weather_day'>{weather} {lower}~{higher}</span>
              </div>
            </div>
          </Header>

          <Content className="site-layout-background"style={{
             margin: '20 0 0 0', 
             paddingTop:24,
              paddingLeft:16,
              paddingRight:16,
              minHeight: 580}}>
              <Switch>
                <Route path='/admin/category' component={Category}></Route>
                <Route path='/admin/product' component={Product}></Route>
                <Route path='/admin/user' component={User}></Route>
                <Route path='/admin/role' component={Role}></Route>
                <Route path='/admin/unfinish' component={UnFinish}></Route>
                <Route path='/admin/all' component={All}></Route>
                <Route path='/admin/home' component={Home}></Route>
                <Route path='/admin' component={Home}></Route>
                <Redirect to='/admin' />
              </Switch>
          </Content>

          <Footer className='footer' style={{ textAlign: 'center', padding: '0 0 0 0 ' }}>正版系统  侵权必究 ©2020 Created by 高应许</Footer>
        </Layout>
      </Layout>
    )
  }
}
export default Admin