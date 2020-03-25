import React, { Component } from 'react';
import {
  Card,
  Button,
  Table,
  Modal,
  message
} from 'antd'
import AddForm from './add-form'
import AuthForm from './auth-form'
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import {formateDate} from '../../utils/dateUtils'
/*
订单管理路由
*/
class Role extends Component {

  state = {
    roles: [],//所有觉得的列表
    role: {},//选中的role
    isShowAdd: false,
    isShowAuth: false
  }
  constructor(props) {
    super(props)
    this.auth = React.createRef()
  }
  initColumn = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render:formateDate
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render:formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name'
      }
    ]
  }
  onRow = (role) => {
    return {
      onClick: event => {
        // console.log(role)
        this.setState({
          role
        })
      }
    }
  }
  getRoles = async () => {
    const result = (await reqRoles()).data
    // console.log(result)
    if (result.status === 0) {
      const roles = result.data
      this.setState({
        roles
      })
    }
  }
  //添加角色
  addRole = () => {
    //表单验证，通过继续
    this.form.validateFields(async (error, values) => {
      if (!error) {
        this.setState({
          isShowAdd: false
        })
        //收集数据
        const { roleName } = values
        this.form.resetFields()
        //请求添加
        const result = (await reqAddRole(roleName)).data
        console.log(result)

        // 更新显示
        if (result.status === 0) {
          message.success('添加角色成功')
          const role = result.data
          //更新roles状态1
          // const roles  = [...this.state.roles]
          // roles.push(role)
          // this.setState({roles,isShowAdd:false})
          //更新roles状态2
          // this.getRoles()
          //更新roles状态3,基于原来数据进行更新
          this.setState(state => ({
            roles: [...state.roles, role]
          }))
        } else {
          message.error('添加角色失败')
        }
      }
    })


  }
  // 更新角色
  updateRole = async () => {
    this.setState({isShowAuth:false})
    const role = this.state.role
    // 得到最新的menus
    const menus = this.auth.current.getMenus()
    role.menus = menus
    role.auth_name = memoryUtils.user.username
    role.auth_time = Date.now()
    //请求更新
    const result = await reqUpdateRole(role)
    if (result.status === 0) {
      message.success('设置角色权限成功')
      this.getRoles()
      // this.setState({
      //   roles:[...this.state.roles]
      // })
    }
  }
  componentWillMount() {
    this.initColumn()
  }
  componentDidMount() {
    this.getRoles()
  }

  render() {
    const { roles, role, isShowAdd, isShowAuth } = this.state
    const title = (
      <span>
        <Button type='primary' style={{ marginRight: 15 }} onClick={() => this.setState({ isShowAdd: true })}>创建角色</Button>
        <Button type='primary' disabled={!role._id} onClick={() => this.setState({ isShowAuth: true })}>设置角色</Button>
      </span>
    )
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          dataSource={roles}
          columns={this.columns}
          pagination={{ defaultPageSize: 5 }}
          rowSelection={{ type: 'radio', selectedRowKeys: [role._id] }}
          onRow={this.onRow}
        />
        <Modal
          title="创建角色"
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({
              isShowAdd: false
            })
          }}
        >
          <AddForm
            setForm={(form) => { this.form = form }}
          />
        </Modal>
        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({
              isShowAuth: false
            })
          }}
        >
          <AuthForm role={role} ref={this.auth} />
        </Modal>
      </Card>
    );
  }
}

export default Role;