import React, { Component } from 'react';
import './login.less'
import logo from './images/logo.png'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
/*
后台管理路由组件
 */
class Login extends Component {
  handleSubmit = (values) => {
    console.log('提交登录的Ajax请求 ', values);
  }
  render() {
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="" />
          <h1>花卉在线销售系统后台</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.handleSubmit}
          >
            <Form.Item
              name="username"
              //声明式验证
              rules={[
                {
                  required: true,whitespace:true,message: '请输入用户名',
                },
                {
                  min:4,message:"用户名至少4位",
                },
                {
                  max:12,message:"用户名最多12位"
                },
                {
                  pattern:/^[a-zA-Z0-9_]+$/,message:"用户名必须是字母、数字、下划线"
                }
              ]}
              
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,message: '请输入密码',
                },
                {
                  min:4,message:"密码至少4位",
                },
                {
                  max:12,message:"密码最多12位"
                },
                {
                  pattern:/^[a-zA-Z0-9_]+$/,message:"密码必须是字母、数字、下划线"
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
        </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

export default Login
/*
1.前台表单验证
2.收集表单数据
 */