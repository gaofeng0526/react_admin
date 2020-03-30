import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Select
} from 'antd'
/*
添加用户修改用户的form组件
*/
const Item = Form.Item
const Option = Select.Option

class UserForm extends Component {
  static propTypes = {
    setForm: PropTypes.func.isRequired,
    roles: PropTypes.array.isRequired,
    user: PropTypes.object,

  }
  //手机号验证
  checkPhone(rule, value, callback) {
    //与表单数据进行关联
    console.log('checkAccount()', rule, value)
    //正则用//包起来
    var regex = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/;
    if (value) {
      //react使用正则表达式变量的test方法进行校验，直接使用value.match(regex)显示match未定义
      if (regex.test(value)) {
        callback();
      } else {
        callback('请输入正确的手机号码！');
      }
    } else {
      //这里的callback函数会报错
    }
  }
  checkEmail(rule, value, callback) {
    //与表单数据进行关联
    console.log('checkAccount()', rule, value)
    var regex = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/
    //正则用//包起来
    if (value) {
      //react使用正则表达式变量的test方法进行校验，直接使用value.match(regex)显示match未定义
      if (regex.test(value)) {
        callback();
      } else {
        callback('请输入正确的邮箱！');
      }
    } else {
      //这里的callback函数会报错
    }
  }
  componentWillMount() {
    this.props.setForm(this.props.form)
  }

  render() {
    const { roles } = this.props
    const user = this.props.user || {}
    const { getFieldDecorator } = this.props.form
    const fromItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 }
    }
    return (
      <Form {...fromItemLayout}>
        <Item label="用户名">
          {
            getFieldDecorator('username', {
              initialValue: user.username,
              rules: [
                { required: true, message: '用户名必须输入' },
                { min: 4, message: '用户名至少4位' },
                { max: 12, message: '用户名最多12位' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
              ]
            })(
              <Input placeholder='请输入用户名'></Input>
            )
          }
        </Item>
        {
          user._id ? null : (
            <Item label="密码">
              {
                getFieldDecorator('password', {
                  initialValue: user.password,
                  rules: [
                    { required: true, message: '密码必须输入' },
                    { min: 4, message: '密码至少4位' },
                    { max: 12, message: '密码最多12位' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成' }
                  ]
                })(
                  <Input placeholder='请输入密码' type="password"></Input>
                )
              }
            </Item>
          )
        }


        <Item label="手机号">
          {
            getFieldDecorator('phone', {
              initialValue: user.phone,
              rules: [
                { required: true, message: '手机号必须输入' },
                { validator: this.checkPhone }
              ]
            })(
              <Input placeholder='请输入手机号'></Input>
            )
          }
        </Item>
        <Item label="邮箱">
          {
            getFieldDecorator('email', {
              initialValue: user.email,
              rules: [
                { required: true, message: '邮箱必须输入' },
                { validator: this.checkEmail }
              ]
            })(
              <Input placeholder='请输入邮箱'></Input>
            )
          }
        </Item>
        <Item label="角色">
          {
            getFieldDecorator('role_id', {
              initialValue: user.role_id,
              rules: [
                { required: true, message: '请选择角色分类' }
              ]
            })(
              <Select>
                {
                  roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                }
              </Select>
            )
          }
        </Item>
      </Form>
    );
  }
}

export default Form.create()(UserForm);