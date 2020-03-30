import React, { Component } from 'react';
import './user-login.less'
import logo from '../../../assets/images/logo.png'
import { Form, Input, Button,  Icon } from 'antd';
import {Link} from 'react-router-dom'
import memoryUtils from '../../../utils/memoryUtils'
import { Redirect } from 'react-router-dom';
import LinkButton from '../../../components/link-button';
const Item = Form.Item // 不能写在import之前

/*
后台管理路由组件
 */
class UserLogin extends Component {
  render() {
    // 如果用户已经登陆, 自动跳转到管理界面
    const user = memoryUtils.user
    if (user && user._id) {
      return <Redirect to='/admin' />
    }

    // 得到具强大功能的form对象
    const form = this.props.form
    const { getFieldDecorator } = form;
    return (
      <div className="userlogin">
        <header className="userlogin-header">
          <img src={logo} alt="logo" />
          <h1>花卉网</h1>
        </header>
        <section className="userlogin-content">
          <h2>注册登录花卉网</h2>
          <Form onSubmit={this.handleSubmit} className="userlogin-form">
            <Item>
              {
                /*
              用户名/密码的的合法性要求
                1). 必须输入
                2). 必须大于等于4位
                3). 必须小于等于12位
                4). 必须是英文、数字或下划线组成
               */
              }
              {
                getFieldDecorator('username', { // 配置对象: 属性名是特定的一些名称
                  // 声明式验证: 直接使用别人定义好的验证规则进行验证
                  rules: [
                    { required: true, whitespace: true, message: '用户名必须输入' },
                    { min: 4, message: '用户名至少4位' },
                    { max: 12, message: '用户名最多12位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                  ],
                  initialValue: '', // 初始值
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              }
            </Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [
                    {
                      validator: this.validatePwd
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }

            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
            </Form.Item>
            <Form.Item> 
              <Link to='/page/regist'>
              <LinkButton style={{marginLeft:40,marginRight:100}}>注册</LinkButton>
              </Link>
              <LinkButton >忘记密码</LinkButton>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
const WrapUserLogin = Form.create()(UserLogin)
export default WrapUserLogin