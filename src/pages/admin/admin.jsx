import React, { Component } from 'react';
import { Layout } from 'antd';
import { Redirect, Route, Switch } from 'react-router-dom';

import memoryUtils from '../../utils/memoryUtils'
import './admin.less'

import LeftNav from './left-nav/index';
import RightHeader from './header';

import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import UnFinish from '../order/unfinish'
import All from '../order/all'

const { Footer, Content } = Layout;
/*
后台管理路由组件
 */
class Admin extends Component {
  render() {
    const user = memoryUtils.user
    // 如果内存中没存储user 当前未登录
    if (!user || !user._id) {
      return <Redirect to='/login' />
    }
    return (
      <Layout style={{ height: '100%' }}>
        <LeftNav></LeftNav>
        <Layout>
          <RightHeader></RightHeader>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 630 }}>
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

            </div>
          </Content>
          <Footer style={{ textAlign: 'center', padding: '0 0 0 0 ' }}>正版系统  侵权必究 ©2020 Created by 高应许</Footer>
        </Layout>
      </Layout>
      // {/* Hello {user.username} */}
    )
  }
}
export default Admin