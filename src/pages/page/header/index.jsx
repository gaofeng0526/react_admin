import React, { Component } from 'react';
import logo from '../../../assets/images/logo.png'
import { Menu, Dropdown, Icon } from 'antd';
import {Link} from 'react-router-dom'
import LinkButton from '../../../components/link-button';
/*
后台管理路由组件
 */
class Header extends Component {
  gologin =()=>{

  }

  render() {
    const menu2 = (<Menu>
      <Menu.Item>
        <p>联系电话:0371-566385</p>
      </Menu.Item>
    </Menu>)
    return (
      <div className="header">
        <img src={logo} alt="logo" />
        <span className="header-title">花卉网</span>
        <div className="center"></div>
        {/* <div className="scoll">
          <span className="announcement">公告:</span>
          <span className="announcement-content">aaaaa</span>
        </div> */}
        <div className="message1">
        <Link to='/page/userlogin'>
            <LinkButton onClick={this.gologin}>登录/注册</LinkButton>
            </Link>
        </div>
        <div className="message2">
          <Dropdown overlay={menu2}>
            <LinkButton onClick={e => e.preventDefault()}><span >联系客服</span> <Icon type="down" /></LinkButton>
          </Dropdown>
        </div>
      </div>
    )
  }
}
export default Header