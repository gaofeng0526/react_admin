import React, { Component } from 'react';
import { Layout, Divider } from 'antd';
import './page.less'
import Header from './header'
import Content from './content'
import LinkButton from '../../components/link-button'

const brc = require('.././../assets/images/brc.jpg')
const { Footer, Sider, } = Layout;
/*
后台管理路由组件
 */
class Page extends Component {
  render() {
    return (
      <Layout className="body-layout">
        <Header></Header>
        <Layout className="center-layout">
          <Sider className="sider-left">
            <div className="scoll">
              <span>公告</span>
              <Divider dashed />
              <div className="border">欢迎大家来到花卉网花卉购物网站，希望大家在这里逛的开心，买的愉快</div>
            </div>
            <div className="user-like">
              <span>猜你喜欢</span>
              <Divider dashed />
              <div className="like">
                <div>
                  <img src={brc} alt="百日草" />
                  <LinkButton>百日草</LinkButton>
                </div>
                <div>
                  <img src={brc} alt="百日草" />
                  <LinkButton>百日草</LinkButton>
                </div>
              </div>
            </div>
          </Sider>
          <Content></Content>
          <Sider className="sider-right">Sider</Sider>
        </Layout >
        <Footer className="footer">Footer</Footer>
      </Layout>
    )
  }
}
export default Page