import React from 'react'
import { Modal, Form, Input } from 'antd'
const { Item } = Form

function TaskModal(props) {
  const {
    form,
    visible,
    onOk,
    onCancel,
    okText = 'Сохранить',
    cancelText = 'Отмена',
    title = 'New modal'
  } = props

  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        onOk(values)
        form.resetFields()
      }
    })
  }

  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 }
  }
  const { getFieldDecorator } = props.form

  return (
    <Modal
      visible={visible}
      title={title}
      okText={okText}
      cancelText={cancelText}
      onCancel={onCancel}
      onOk={handleSubmit}
      width={900}
    >

      <Form layout="vertical">
        <Item label="Название шаблона" {...formItemLayout}>
          {
            getFieldDecorator('schemaName', {})(
              <Input />
            )
          }
        </Item>
      </Form>
    </Modal>)
}

export default Form.create()(TaskModal)