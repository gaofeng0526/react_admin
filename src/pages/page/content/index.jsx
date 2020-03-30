import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom'
import { Menu, Icon, Dropdown, Divider } from 'antd';
import LinkButton from '../../../components/link-button'
import Account from '../accounts'
import Detail from '../detail'
import BuyCar from '../buy-car'
import Personal from '../personal'

/*
后台管理路由组件
 */
class Content extends Component {

  render() {
    const menu2 = (<Menu>
      <Menu.Item>
        <LinkButton> 菊科</LinkButton>
      </Menu.Item>
      <Menu.Item>
        <LinkButton> 兰科</LinkButton>
      </Menu.Item>
      <Menu.Item>
        <LinkButton> 草本</LinkButton>
      </Menu.Item>
      <Menu.Item>
        <LinkButton> 多肉</LinkButton>
      </Menu.Item>
    </Menu>)
    const menu3 = (<Menu>
      <Menu.Item>
        <LinkButton> 水生</LinkButton>
      </Menu.Item>
      <Menu.Item>
        <LinkButton> 陆生</LinkButton>
      </Menu.Item>
      <Menu.Item>
        <LinkButton> 阳光</LinkButton>
      </Menu.Item>
      <Menu.Item>
        <LinkButton> 潮湿</LinkButton>
      </Menu.Item>
    </Menu>)
    const menu4 = (<Menu>
      <Menu.Item>
        <LinkButton> 春</LinkButton>
      </Menu.Item>
      <Menu.Item>
        <LinkButton> 夏</LinkButton>
      </Menu.Item>
      <Menu.Item>
        <LinkButton> 秋</LinkButton>
      </Menu.Item>
      <Menu.Item>
        <LinkButton> 冬</LinkButton>
      </Menu.Item>
    </Menu>)
    return (
      <div className="content">
        <div className="content-header">
          <Link to='/page'>
            <span className="son"><Icon type="home" />首页</span>
          </Link>
          <Dropdown overlay={menu2}>
            <span className="son"><Icon type="appstore" /><span>品种分类</span> </span>
          </Dropdown>
          <Dropdown overlay={menu3}>
            <span className="son"><Icon type="chrome" /><span>种植环境分类</span> </span>
          </Dropdown>
          <Dropdown overlay={menu4}>
            <span className="son"><Icon type="cloud" /><span>季节分类</span> </span>
          </Dropdown>
        </div>
        <Divider />
        <Switch>
          <Route path='/page/account' component={Account}></Route>
          <Route path='/page/detail' component={Detail}></Route>
          <Route path='/page/buycar' component={BuyCar}></Route>
          <Route path='/page/personal' component={Personal}></Route>
          <Redirect to='/page' />
        </Switch>

      </div>
    )
  }
}
export default Content