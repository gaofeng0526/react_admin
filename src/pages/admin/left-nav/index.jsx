import React, { Component } from 'react';
import { Link ,withRouter} from 'react-router-dom'
import '../admin.less'
import logo from '../../../assets/images/logo.png'
import { Layout, Menu, Icon } from 'antd';
import menuList from '../../../config/menuConfig'
const { SubMenu } = Menu;
const { Sider } = Layout;

class LeftNav extends Component {
  
/*使用map + 递归调用 */
  getMenuNode_map = (menuList) => {
    return menuList.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon}></Icon>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon}></Icon>
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNode(item.children)}
          </SubMenu>
        )
      }

    })
  }
/** 使用reduce+递归调用 */
getMenuNode = (menuList) => {
  const path = this.props.location.pathname
  return menuList.reduce((pre,item) => {
    if(!item.children){
      pre.push((
        <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon}></Icon>
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
      ))
    }else{
      const cItem = item.children.find(cItem => cItem.key=== path)
      if(cItem){
        this.openKey = item.key
      } 
      pre.push((
        <SubMenu
        key={item.key}
        title={
          <span>
            <Icon type={item.icon}></Icon>
            <span>{item.title}</span>
          </span>
        }
      >
        {this.getMenuNode(item.children)}
      </SubMenu>
      ))
    }
    return pre 
  },[])
}
//在第一次render之前执行一次 ，为第一次render渲染做准备数据 同步的
componentWillMount(){
  this.menuNodes = this.getMenuNode(menuList)
}
  render() {
    
    const path = this.props.location.pathname
    const openKey = this.openKey
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >

        <Link to='/admin' className="logo">
          <img src={logo} alt='logo'></img>
          <h1>花卉销售后台</h1>
        </Link>
        <Menu
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
          mode="inline"
          theme="dark"
        >
          {
            /*遍历数组产生子项*/
          }
          {this.getMenuNode(menuList)}
        </Menu>
      </Sider>
    );
  }
}


export default withRouter(LeftNav)