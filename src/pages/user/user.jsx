import React, { PureComponent } from 'react';
import { formateDate } from '../../utils/dateUtils'
import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from '../../utils/constants'

import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'
import { reqUsers, reqDeleteUser, reqAddOrUpdateUser } from '../../api';
import UserForm from './user-form';
/*
用户管理路由
*/
class User extends PureComponent {
  state = {
    users: [],//所有用户列表
    roles: [],//所有角色列表
    isShow: false
  }
  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'email',

      },
      {
        title: '电话',
        dataIndex: 'phone',

      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formateDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        render: (role_id) => this.roleNames[role_id]
      },
      {
        title: '操作',
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(user)}>修改</LinkButton>
            <LinkButton onClick={() => this.deleteUser(user)}>删除</LinkButton>
          </span>
        )
      }
    ]
  }
  //根据roles数组，生成对应的角色名
  initRoleNames = (roles) => {
    const roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name
      return pre
    }, {})
    this.roleNames = roleNames
  }
  addOrUpdateUser = async () => {
    this.setState({ isShow: false })
    //1.收集输入的数据
    const user = this.form.getFieldsValue()
    this.form.resetFields()
    if(this.user){
      user._id = this.user._id
    }
    //2.提交添加的请求
    const result = (await reqAddOrUpdateUser(user)).data
    //3.更新列表显示
    if (result.status === 0) {
      message.success(`${this.user?'修改':'添加'}用户成功`)
      this.getUsers()
    }
  }
  showAdd = () => {
    // 显示model框
    this.user = null//去除前面保持的user
    this.setState({
      isShow: true
    })
  }
  //获取用户列表
  getUsers = async () => {
    const result = (await reqUsers()).data

    if (result.status === 0) {
      const { users, roles } = result.data
      this.initRoleNames(roles)
      this.setState({
        users,
        roles
      })
      // console.log(users, roles)
    }
  }
  //删除指定用户
  deleteUser = (user) => {
    Modal.confirm({
      title: `确认删除${user.username}吗?`,
      onOk: async () => {
        const result = (await reqDeleteUser(user._id)).data
        if (result.status === 0) {
          message.success('删除用户成功！')
          this.getUsers()
        }
      }
    })
  }
  //显示修改界面
  showUpdate = (user) => {
    this.user =user
    this.setState({
      isShow:true
    })
  }
  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getUsers()
  }
  render() {
    const title = <Button type='primary' onClick={this.showAdd}>创建用户</Button>
    const { users, isShow, roles } = this.state
    const user =this.user ||{}
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey='_id'
          dataSource={users}
          columns={this.columns}
          pagination={{ defaultPageSize: PAGE_SIZE }}
        />;

        <Modal
          title={user._id?'修改用户':'添加用户'}
          visible={isShow}
          onOk={this.addOrUpdateUser}
          onCancel={() => {
            this.form.resetFields()
            this.setState({ isShow: false })}}
        >
          <UserForm
            setForm={form => this.form = form}
            roles={roles}
            user={user}
          ></UserForm>
        </Modal>
      </Card>
    );
  }
}

export default User;