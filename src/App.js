import React,{ Component } from "react";
import {Button,message} from "antd";
import './App.css';
/*
应用的根组件
*/
 class App extends Component{
  handleClick = ()=>{
  message.success('点击正确');
  }

  render(){
    return (
      <div>
    <Button type="primary" onClick={this.handleClick}>app</Button>
    <a>this</a>
      </div>

    
    )
  }
}
export default App