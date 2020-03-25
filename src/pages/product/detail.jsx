import React, { Component } from 'react';
import LinkButton from '../../components/link-button'
import {
  Card,
  Icon,
  List
} from 'antd'
// import { BASE_IMG_URL } from '../../utils/constants'
import { reqCategory } from '../../api'
const Item = List.Item
class ProductDetail extends Component {
  state = {
    cName1: '',//一级分类名称
    cName2: ''//二级分类名称
  }
  async componentDidMount() {
    // console.log(this.props.location.state)
    const { pCategoryId, categoryId } = this.props.location.state
    // console.log(pCategoryId)

    if (pCategoryId === '0') {
      const result = (await reqCategory(categoryId)).data
      console.log(result)
      const cName1 = result.data.name
      this.setState({ cName1 })
    } else {
      //效率偏低
      // const result1 =(await reqCategory(pCategoryId)).data
      // const result2 =(await reqCategory(categoryId)).data
      //   const cName1 = result1.data.name
      //   const cName2 = result2.data.name
      const result = await Promise.all([reqCategory(pCategoryId), reqCategory(categoryId)])
      const cName1 = result[0].data.data.name
      const cName2 = result[1].data.data.name
      this.setState({
        cName1,
        cName2
      })
    }
  }

  render() {
    const { name, desc, price, imgs } = this.props.location.state
    const { cName1, cName2 } = this.state
    // console.log( imgs.map(img => (BASE_IMG_URL + img)))
    const title = (
      <span>
        <LinkButton>
          <Icon
            type="arrow-left"
            style={{ color: 'green', marginRight: 15, fontSize: 20 }}
            onClick={() => this.props.history.goBack()}
          ></Icon>
        </LinkButton>
        <span >商品详情</span>
      </span>
    )
    return (
      <Card
        title={title}
        className='product-detail'
      >
        <List
          bordered
          className='product-list'>
          <Item style={{ justifyContent: "initial" }}>
            <span className="left">商品名称:</span>
            <p className="right">{name}</p>
          </Item>
          <Item style={{ justifyContent: "initial" }}>
            <span className="left">商品描述:</span>
            <span className="right">{desc}</span>
          </Item>
          <Item style={{ justifyContent: "initial" }}>
            <span className="left">商品价格:</span>
            <span className="right">{price}</span>
          </Item>
          <Item style={{ justifyContent: "initial" }}>
            <span className="left">所属分类:</span>
            <span className="right">{cName1}{cName2 ? '-->' + cName2 : ''}</span>
          </Item>
          <Item style={{ justifyContent: "initial" }}>
            <span className="left">商品图片:</span>
            <span>
              {
                imgs.map(img => (
                  <img
                    key={img}
                    className='product-img'
                    src=''
                    alt="img" />
                ))
              }
            </span>
          </Item>
        </List>
      </Card>
    );
  }
}

export default ProductDetail;