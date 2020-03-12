import React, { Component } from 'react';
import { Layout } from 'antd';
import '../admin.less'
const { Header } = Layout;
class RightHeader extends Component {

  render() { 
    return (  
      <Header className="site-layout-sub-header-background" style={{ padding: 24, }} >header</Header>
    );
  }
}
 
export default RightHeader;