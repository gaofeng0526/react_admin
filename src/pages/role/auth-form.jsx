import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Tree
} from 'antd'
import menuList from '../../config/menuConfig'
/*
添加分类的form组件
*/
const Item = Form.Item
const { TreeNode } = Tree;

class AuthForm extends Component {
  static propTypes = {
    role: PropTypes.object
  }
  constructor(props){
    super(props)
    const{ menus} = this.props.role
    this.state ={
      checkedKeys:menus
    }
  }


  getTreeNodes = (menuList) => {
    return menuList.reduce((pre,item) => {
     pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children?this.getTreeNodes(item.children):null}
        </TreeNode>)
      return pre
    },[])
  }
  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({checkedKeys})
  };
  /*为父组件提供方法 */
  getMenus = () => this.state.checkedKeys

  componentWillMount() {
    this.treeNodes = this.getTreeNodes(menuList)
  }
  //组件接受到新的属性时自动调用
// componentWillReceiveProps(nextProps) {
//  const menus = nextProps.role.menus
//  this.setState({
//    checkedKeys:menus
//  })
//  console.log('cwrp')
// }


  render() {
    console.log('render')
    const { role } = this.props
    const {checkedKeys} =this.state
    const fromItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 }
    }
    return (
      <Form {...fromItemLayout}>
        <Item label="角色名称">
          <Input value={role.name} disabled />
        </Item>
        <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys = {checkedKeys}
          onCheck ={this.onCheck}
        >
          <TreeNode title="平台权限" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </Form>
    );
  }
}

export default AuthForm