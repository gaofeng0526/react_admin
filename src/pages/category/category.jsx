import React, { Component } from 'react';
import LinkButton from '../../components/link-button/index'
import {
  Card,
  Table,
  Button,
  Icon,
  message,
  Modal
} from 'antd'

import { reqCategorys, reqUpdateCategory, reqAddCategory, } from '../../api'
import AddForm from './add-form'
import UpdateForm from './update-form'
/*
品类管理路由
*/
class Category extends Component {

  state = {
    loading: false,
    categorys: [],//一级分类列表
    subCategorys: [],//二级分类列表
    parentId: '0',
    parentName: '',
    showStatus: 0,//表示添加/修改确认框是否显示，0都不显示，1显示添加，2显示修改

  }
  /*
  初始化table列的数组
  */
  initColumns = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',

      },
      {
        title: '操作',
        width: 300,
        render: (category) => (
          <span>
            <LinkButton onClick={() => this.showUpdate(category)}>修改分类</LinkButton>
            {this.state.parentId === '0' ? <LinkButton onClick={() => { this.showSubCategorys(category) }}>查看子分类</LinkButton> : null}
          </span>
        )

      }

    ];
  }

  //获取一级或者二级分类列表
  getCategorys = async (parentId) => {
    //发请求前显示loading
    this.setState({ loading: true })
    parentId = parentId || this.state.parentId
    const result = (await reqCategorys(parentId)).data
    // console.log(result)
    //请求后隐藏loading
    this.setState({ loading: false })
    // console.log(result)
    if (result.status === 0) {
      const categorys = result.data
      if (parentId === '0') {
        //更新一级分类状态
        this.setState({
          categorys: categorys
        })
      } else {
        this.setState({
          subCategorys: categorys
        })
      }

    } else {
      message.error('获取分类列表失败')
    }
  }
  //展示二级分类数组
  showSubCategorys = (category) => {
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => {//在状态更新且重新render后执行
      //获取二级分类列表
      // console.log('parentId', this.state.parentId)
      this.getCategorys()
    })
  }
  //重新展示一级分类列表
  showCategorys = () => {
    this.setState({
      parentId: '0',
      parentName: '',
      subCategorys: []
    })
  }

  //相应点击隐藏确认框
  handleCancel = () => {
    //清除所有字段
    this.form.resetFields()
    this.setState({
      showStatus: 0
    })
  }
  //显示添加确认框
  showAdd = () => {
    this.setState({
      showStatus: 1
    })
  }
  //显示修改确认框
  showUpdate = (category) => {
    this.category = category
    this.setState({
      showStatus: 2
    })
  }

  //添加分类
  addCategory =  () => {
    this.form.validateFields(async(err, values) => {
      if (!err) {
        this.setState({
          showStatus: 0
        })
        const { parentId, categoryName } = values

        this.form.resetFields()
        const result = await reqAddCategory(categoryName, parentId)
        if (result.data.status === 0) {
          if (parentId === this.state.parentId) {
            //重新获取列表
            this.getCategorys()
          } else if (parentId === '0') {//在二级分类下添加一级分类项，重新获取一级分类列表但是不需要显示
            this.getCategorys(parentId)
          }
        }
      }
    })

  }

  //修改分类
  updateCategory = () => {
    //0.进行表单验证
    this.form.validateFields(async (err, values) => {
      if (!err) {
        //1隐藏确认框
        this.setState({
          showStatus: 0
        })
        const categoryId = this.category._id
        const { categoryName } = values

        //清除所有字段
        this.form.resetFields()
        //2.发请求更新
        const result = await reqUpdateCategory({ categoryId, categoryName })
        if (result.data.status === 0) {
          //3重新显示列表
          this.getCategorys()
        }
      }
    })

  }

  //第一次render前的数据
  componentWillMount() {
    this.initColumns()
  }
  //发ajax请求
  componentDidMount() {
    this.getCategorys();
  }
  render() {
    const { categorys, subCategorys, parentId, parentName, loading, showStatus } = this.state
    //读取指定分类
    const category = this.category || {}
    const title = parentId === '0' ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <Icon type='arrow-right' style={{ marginRight: 5 }}></Icon>
        <span>{parentName}</span>
      </span>
    )
    const extra = (
      <Button type='primary' onClick={this.showAdd}>
        <Icon type='plus'></Icon>
        添加
      </Button>
    )



    return (
      <div>
        <Card title={title} extra={extra} >
          <Table
            bordered
            rowKey="_id"
            loading={loading}
            dataSource={parentId === '0' ? categorys : subCategorys}
            columns={this.columns}
            pagination={{
              defaultPageSize: 6,
              showQuickJumper: true
            }}
          />;

      <Modal
            title="添加分类"
            visible={showStatus === 1}
            onOk={this.addCategory}
            onCancel={this.handleCancel}
          >
            <AddForm
              categorys={categorys}
              parentId={parentId}
              setForm={(form) => { this.form = form }}
            />
          </Modal>
          <Modal
            title="修改分类"
            visible={showStatus === 2}
            onOk={this.updateCategory}
            onCancel={this.handleCancel}
          >
            <UpdateForm
              categoryName={category.name}
              setForm={(form) => { this.form = form }}
            />
          </Modal>
        </Card>
      </div>
    );
  }
}

export default Category;