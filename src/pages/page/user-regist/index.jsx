import React, { Component } from 'react';
import{Link} from 'react-router-dom'
import './user-regist.less'
import logo from '../../../assets/images/logo.png'
import { Form, Input, Button,  Icon } from 'antd';
// import Captcha from '../../../components/amazeui'
const Item = Form.Item // 不能写在import之前

/*
后台管理路由组件
 */
class Regist extends Component {
  render() {
    // 得到具强大功能的form对象
    const form = this.props.form
    const { getFieldDecorator } = form;
    return (
      <div className="regist">
        <header className="regist-header">
          <img src={logo} alt="logo" />
          <h1>花卉网</h1>
        </header>
        <section className="regist-content">
          <h2>注册花卉网</h2>
          <Form onSubmit={this.handleSubmit} className="regist-form">
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
            <Item>
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
                    placeholder="密码"
                  />
                )
              }

            </Item>
            <Item>
              {
                getFieldDecorator('email', {
                  rules: [
                    {
                      validator: this.validatePwd
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="电子邮箱"
                  />
                )
              }
            </Item>
            <Item>
              {
                getFieldDecorator('phone', {
                  rules: [
                    {
                      validator: this.validatePwd
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="电话号"
                  />
                )
              }
            </Item>
            {/* <Captcha/> */}
            <Form.Item>
              <Button type="primary" htmlType="submit" className="regist-form-button">
                注册
              </Button>
            </Form.Item>
            <Link to="/page/userlogin">返回登录</Link>
          </Form>
        </section>
      </div>
    )
  }
}
const WrapRegist = Form.create()(Regist)
export default WrapRegist