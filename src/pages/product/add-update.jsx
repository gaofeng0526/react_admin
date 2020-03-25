import React, { Component } from 'react';
import {
  Card,
  Form,
  Input,
  Icon,
  Cascader,
  Button,
  message
} from 'antd'
import LinkButton from '../../components/link-button'
import { reqCategorys, reqAddOrUpdateProduct } from '../../api';
import PicturesWall from './pictures-wall'
const { Item } = Form
const { TextArea } = Input
const options = []

class ProductAddUpdate extends Component {
  state = {
    options,
  }
  constructor(props) {
    super(props)
    this.pw = React.createRef()
  }
  //初始化
  initOptions = async (categorys) => {
    const options = categorys.map(c => ({
      value: c._id,
      label: c.name,
      isLeaf: false
    }))
    //如果是二级分类商品的更新
    const { isUpdate, product } = this
    const { pCategoryId } = product
    if (isUpdate && pCategoryId !== '0') {
      //获取对应的二级分类列表
      const subCategorys = await this.getCategorys(pCategoryId)
      //生成二级下拉列表的options
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      // 找到对应的一级options
      const targetOption = options.find(options => options.value === pCategoryId)
      //关联到对应的一级options上
      targetOption.children = childOptions
    }
    this.setState({
      options
    })
  }
  //一句获取一级二级列表
  getCategorys = async (parentId) => {
    const result = (await reqCategorys(parentId)).data

    if (result.status === 0) {
      const categorys = result.data
      if (parentId === '0') {
        this.initOptions(categorys)
      } else {
        // console.log(categorys)
        return categorys //返回的二级列表
      }

    }
  }
  //验证价格的自定义函数
  validatePrice = (rule, value, callback) => {
    if (value * 1 > 0) {
      callback()
    } else {
      callback('价格必须大于0')
    }
  }
  //加载数据
  loadData = async selectedOptions => {
    //得到option对象
    const targetOption = selectedOptions[0]
    targetOption.loading = true
    //根据分类对象，请求获取下一级分类列表
    const subCategorys = await this.getCategorys(targetOption.value)
    targetOption.loading = false

    if (subCategorys && subCategorys.length > 0) {
      const childOptions = subCategorys.map(c => ({
        value: c._id,
        label: c.name,
        isLeaf: true
      }))
      targetOption.children = childOptions
    } else {
      targetOption.isLeaf = true
    }
    setTimeout(() => {
      targetOption.loading = false;

      this.setState({
        options: [...this.state.options],
      });
    }, 1000);
  }
  submit = () => {
    //通过表单验证，才会发送请求
    this.props.form.validateFields(async(error, values) => {
      if (!error) {
        //收集数据封装成product对象
        const { name, desc, price, categoryIds } = values
        let pCategoryId, categoryId
        if (categoryIds.length === 1) {
          pCategoryId = '0'
          categoryId = categoryIds[0]
        } else {
          pCategoryId = categoryIds[0]
          categoryId = categoryIds[1]
        }
        const imgs = this.pw.current.getImgs()
        const product = { name, desc, price, imgs,pCategoryId ,categoryId}
        //如果更新需要添加_id
        if(this.isUpdate){
          product._id = this.product._id
        }
        //调用接口请求函数去添加以及更新
      const result = (await reqAddOrUpdateProduct(product)).data
      console.log(result)
        //根据结果提示
        if(result.status === 0){
          message.success(`${this.isUpdate? '更新':'添加'}商品成功！`)
          this.props.history.goBack()
        }else{
          message.error(`${this.isUpdate? '更新':'添加'}商品失败！`)
        }
        console.log(product)

      }
    })
  }
  componentDidMount() {
    this.getCategorys('0')
  }

  componentWillMount() {
    //取出携带的state
    const product = this.props.location.state
    //保存是否是更新的标识
    this.isUpdate = !!product
    //保存商品（如果没有则是空对象）
    this.product = product || {}
  }

  render() {
    const { isUpdate, product } = this
    const { getFieldDecorator } = this.props.form
    const { pCategoryId, categoryId } = product
    //接受级联分类Id的数组
    const categoryIds = []
    if (isUpdate) {
      //商品是一级分类的商品
      if (pCategoryId === '0') {
        categoryIds.push(categoryId)
      } else {//商品是二级分类的商品
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
      }


    }
    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack('')}>
          <Icon type='arrow-left' style={{ fontSize: 20, marginLeft: 5, marginRight: 5 }}></Icon>
        </LinkButton>
        <span>{isUpdate ? '修改商品' : '添加商品'}</span>
      </span>
    )
    const fromItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 }
    }

    return (
      <Card title={title}>
        <Form {...fromItemLayout}>
          <Item label="商品名称">
            {
              getFieldDecorator('name', {
                initialValue: product.name,
                rules: [
                  { required: true, message: '必须输入商品名称' }
                ]
              })(<Input placeholder='请输入商品名称' />)
            }
          </Item>
          <Item label="商品描述">
            {
              getFieldDecorator('desc', {
                initialValue: product.desc,
                rules: [
                  { required: true, message: '必须输入商品描述' }
                ]
              })(<TextArea placeholder='请输入商品描述' />
              )
            }
          </Item>
          <Item label="商品价格">

            {
              getFieldDecorator('price', {
                initialValue: product.price,
                rules: [
                  { required: true, message: '必须输入商品价格' },
                  { validator: this.validatePrice }
                ]
              })(<Input type='number' placeholder='请输入商品价格' addonAfter='元' />)
            }
          </Item>
          <Item label="商品分类">
            {
              getFieldDecorator('categoryIds', {
                initialValue: categoryIds,
                rules: [
                  { required: true, message: '必须指定商品分类' },
                ]
              })(
                <Cascader
                  placeholder='Please select'
                  options={this.state.options}  /*需要显示的列表数据数组*/
                  loadData={this.loadData} /*当选择某个列表项, 加载下一级列表的监听回调*/
                />
              )
            }

          </Item>
          <Item label='商品图片'>
            <PicturesWall ref={this.pw} />
          </Item>
          <Item >
            <Button style={{ marginLeft: 100 }} type='primary' onClick={this.submit}>提交</Button>
          </Item>
        </Form>
      </Card>
    );
  }
}


export default Form.create()(ProductAddUpdate);
