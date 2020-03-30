import React, { Component } from "react";
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import Page from './pages/page/page'
import UserLogin from './pages/page/user-login'
import Regist from './pages/page/user-regist'



/*
应用的根组件
*/
class App extends Component {


  render() {
    return (
      <BrowserRouter>
        <Switch>{/*只匹配其中的一个 */}
          <Route path='/admin' component={Admin} ></Route>
          <Route path='/page/regist' component={Regist}></Route>
          <Route path='/page/userlogin' component={UserLogin}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/page' component={Page}></Route>
          <Route path='/' component={Page}></Route>
          <Redirect to='/page' />

        </Switch>
      </BrowserRouter>
    )
  }
}
export default App