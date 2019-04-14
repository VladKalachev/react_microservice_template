import React from 'react'
import { Modal, Form } from 'antd'
import { createCaseFormItems, rejectCaseFormItems } from '../TaskForm/TaskForm'
import { CREATE_CASE, REJECT_CASE } from '../../../modules/modals'

const modalsItems = {
  [CREATE_CASE]: createCaseFormItems,
  [REJECT_CASE]: rejectCaseFormItems
}

function TaskModal(props) {
  const {
    form,
    type,
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
      }
    })
  }

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
        {modalsItems[type] && modalsItems[type](form)}
      </Form>
    </Modal>)
}

export default Form.create()(TaskModal)