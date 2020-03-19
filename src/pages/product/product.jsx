import React, { Component } from 'react';
import {Switch,Route, Redirect} from 'react-router-dom'

import ProductHome from './home'
import ProductAddUpdate from './add-update'
import ProductDetail from './detail'
import './product.less'
/*
商品管理路由
*/
class Product extends Component {

  render() { 
    return ( 
      <Switch>
        <Route path ='/admin/product' exact component ={ProductHome}></Route>
        <Route path ='/admin/product/addupdate' component ={ProductAddUpdate}></Route>
        <Route path ='/admin/product/detail' component ={ProductDetail}></Route>
        <Redirect to= '/admin/product'></Redirect>
      </Switch>
     );
  }
}
 
export default Product;