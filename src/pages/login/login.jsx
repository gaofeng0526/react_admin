import React, { Component } from 'react';
import './login.less'
import logo from '../../assets/images/logo.png'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom';

/*
后台管理路由组件
 */
class Login extends Component {
  handleSubmit = async (values) => {
        const { username, password } = values
        const response = await reqLogin(username, password)
        const result = response.data
        if(result.status===0){
          //显示成功
          message.success('登陆成功')
          
          //保存user在内存中
          const user =result.user
          memoryUtils.user = user
          storageUtils.saveUser(user)
          //跳转到管理界面(不需要回退用replace，需要回退用push)
          this.props.history.replace('/admin')
        }else{
          //显示错误信息
          message.error(result.msg)
        }
        console.log('请求成功', response.data)

  }
  render() {
    //如果用户已经登陆，自动跳转到管理界面
    const user = memoryUtils.user
    if(!user || !user._id){
      return <Redirect to='/admin' />
    }
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
                  required: true, whitespace: true, message: '请输入用户名',
                },
                {
                  min: 4, message: "用户名至少4位",
                },
                {
                  max: 12, message: "用户名最多12位"
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/, message: "用户名必须是字母、数字、下划线"
                }
              ]}

            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true, message: '请输入密码',
                },
                {
                  min: 4, message: "密码至少4位",
                },
                {
                  max: 12, message: "密码最多12位"
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/, message: "密码必须是字母、数字、下划线"
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
/*
async和await
1.作用
简化promise 对象的使用：不再使用then()来指定成功/失败的回调函数
以同步编码（没有回调函数）的方式实现异步流程
2.哪里写awit？
在返回promise的表达式左侧写await，不想要promise，想要promise异步执行的成功的value数据
3.哪里写async？
await 所在函数（最近的）定义的左侧
*/