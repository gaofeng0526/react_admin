import React,{ Component } from "react";
import './App.css';
import{BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import Page from './pages/page/page'
/*
应用的根组件
*/
 class App extends Component{


  render(){
    return (
      <BrowserRouter>
      <Switch>{/*只匹配其中的一个 */}
      <Route path='/admin' component={Admin} ></Route>
      <Route path='/' component={Login}></Route>
      <Route path='/login' component={Login}></Route>
      <Route path='/page' component={Page}></Route>
      </Switch>
      </BrowserRouter>
    )
  }
}
export default App