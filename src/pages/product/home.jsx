import React, { Component } from 'react';
import LinkButton from '../../components/link-button'
import { reqProducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'

import {
  Card,
  Select,
  Button,
  Icon,
  Table,
  Input,
  message

} from 'antd'

const Option = Select.Option

class ProductHome extends Component {
  state = {
    total: 0,
    products: [],
    loading: false,
    searchName: '',
    searchType: 'productName'
  }
  // 初始化列
  initColumns = () => {
    this.columns = [
      {
        title: '花卉名称',
        dataIndex: 'name',
        width: 200,
      },
      {
        title: '花卉描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        width: 120,
        render: (price) => '￥' + price //指定了对应的属性值
      },
      {
        title: '状态',
        // dataIndex: 'status',
        width: 100,
        render: (product) => {
          const { status, _id } = product
          // console.log(status)
          const newStatus = (status === 1) ? 2 : 1
          // console.log(newStatus)

          return (
            <span>
              <Button
                type="primary"
                onClick={() => this.updateStatus(_id, newStatus)}
              >
                {(status === 1) ? '下架' : '上架'}
              </Button>
              <span>
                {(status === 1) ? '在售' : '已下架'}
              </span>
            </span>
          )
        }
      },
      {
        title: '操作',
        width: 100,
        render: (product) => {
          return (
            <span>
              <LinkButton
                onClick={() => this.props.history.push('/admin/product/detail', product)}
              >详情</LinkButton>
              <LinkButton 
              onClick = {() => this.props.history.push('/admin/product/addupdate',product)}
              >修改</LinkButton>
            </span>
          )
        }
      },
    ];
  }
  //获取指定页码的数据
  getProducts = async (pageNum) => {
    this.pageNum = pageNum
    this.setState({ loading: true })
    const { searchName, searchType } = this.state
    let result
    if (searchName) {
      result = (await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })).data
    } else {
      result = (await reqProducts(pageNum, PAGE_SIZE)).data
    }
    this.setState({ loading: false })
    if (result.status === 0) {
      const { total, list } = result.data
      this.setState({
        total,
        products: list
      })
    }
  }
  //更新指定商品的状态
  updateStatus = async (productId, status) => {
    const result = await reqUpdateStatus(productId, status)
    // console.log(result)
    if (result.data.status === 0) {
      message.success('更新商品成功')
      this.getProducts(this.pageNum)
    }
  }

  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getProducts(1)
  }

  render() {
    const { products, total, searchType } = this.state
    // console.log()
    const title = (
      <span>
        <Select
          value={searchType}
          style={{ width: 120 }}
          onChange={value => this.setState({ searchType: value })}
        >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input
          placeholder='关键字'
          style={{ width: 150, marginLeft: 15, marginRight: 15 }}
          onChange={e => this.setState({ searchName: e.target.value })}
        />
        <Button type='primary' onClick={() => this.getProducts(1)}>搜索</Button>
      </span>
    )
    const extra = (
      <Button type="primary" onClick = {() => this.props.history.push('/admin/product/addupdate')}>
        <Icon type="plus"></Icon>
      添加商品
      </Button>
    )
    return (
      <Card title={title} extra={extra}>
        <Table
          rowKey='_id'
          bordered
          dataSource={products}
          columns={this.columns}
          pagination={{
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            total,
            onChange: this.getProducts
          }} />
      </Card>
    );
  }
}

export default ProductHome;