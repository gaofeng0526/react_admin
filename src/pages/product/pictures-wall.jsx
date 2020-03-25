import React, { Component } from 'react';
import { Upload, Icon, Modal, message } from 'antd';
// import { reqDeleteImg } from '../../api';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class PicturesWall extends Component {
  state = {
    previewVisible: false,//是否显示大图预览
    previewImage: '',//大图的url
    fileList: [
      // {
      //   uid: '-1',
      //   name: 'image.png',
      //   status: 'done',
      //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // }
    ],
  }
  //获取已上传文件名的数组
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  } 

  //隐藏model
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = async({ file, fileList }) => {
    // console.log(file.status, file)
    //上传成功将当前上传的file信息修正（name,url）
    if (file.status === 'done') {
      const result = file.response
      if (result.status === 0) {
        message.success('上传图片成功！')
        const { name, url } = result.data
        file = fileList[fileList.length - 1]
        file.name = name
        file.url = url
      } else {
        message.error('上传图片失败')
      }
    }
    // else if (file.status === 'removed'){
    //  const result = await reqDeleteImg(file.name)
    //  if(result.status === 0){
    //    message.success('删除图片成功！')
    //  }else{
    //    message.error('删除图片失败！')
    //  }
    // }

    this.setState({ fileList });
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div>Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/api/img/upload"
          name='image'
          accept='image/*'
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
export default PicturesWall