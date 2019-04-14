import React, { PureComponent } from 'react'
import { Form, Button, Input, Select, InputNumber, Switch } from 'antd'
import DatePicker from './DatePicker'
const { Item } = Form

const buttonItemLayout = {
  wrapperCol: { offset: 20 }
}

const selectTestOptions = [
  'Казаков В.П.',
  'Марков И.В.',
  'Емельянов Н.П.',
  'Воронов И.С.',
  'Беляков П.В.'
]

const inputNumberProps = {
  style: { width: 180 }
}

export const createCaseFormItems = (form) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Номер дела' {...formItemLayout}>
      {
        getFieldDecorator('caseNum', {})(
          <Input />
        )
      }
    </Item>,
    <Item label='Наименование объекта' {...formItemLayout}>
      {
        getFieldDecorator('objectTitle', {})(
          <Input />
        )
      }
    </Item>,
    <Item label='Заказчик' {...formItemLayout}>
      {
        getFieldDecorator('client', {

        })(
          <Input />
        )
      }
    </Item>,
    <Item label='Адрес объекта проектирования' {...formItemLayout}>
      {
        getFieldDecorator('objectAddress', {})(
          <Input />
        )
      }
    </Item>
  ]
}

export const rejectCaseFormItems = (form) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 }
  }

  return [
    <Item label='Причина отказа' {...formItemLayout}>
      {
        getFieldDecorator('cancelNote', {})(
          <Input />
        )
      }
    </Item>
  ]
}

const AppealRegistrationFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 }
  }

  return [
    <Item label='Дата поступления заявки' {...formItemLayout}>
      {
        getFieldDecorator('requestDate', {
          initialValue: taskProps['requestDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Номер входящего письма' {...formItemLayout}>
      {
        getFieldDecorator('requestNum', {
          initialValue: taskProps['requestNum']
        })(
          <Input />
        )
      }
    </Item>
  ]
}

const InitialDataFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Заказчик' {...formItemLayout}>
      {
        getFieldDecorator('client', {})(
          <Input />
        )
      }
    </Item>,
    <Item label='Название объекта' {...formItemLayout}>
      {
        getFieldDecorator('objectTitle', {
          initialValue: taskProps['objectTitle']
        })(
          <Input />
        )
      }
    </Item>,
    <Item label='Адрес объекта проектирования' {...formItemLayout}>
      {
        getFieldDecorator('objectAddress', {
          initialValue: taskProps['objectAddress']
        })(
          <Input />
        )
      }
    </Item>,
    <Item label='Дата получения' {...formItemLayout}>
      {
        getFieldDecorator('gettingDate', {
          initialValue: taskProps['gettingDate']
        })(
          <DatePicker placeholder="" />
        )
      }
    </Item>,
    <Item label='Подрядчик' {...formItemLayout}>
      {
        getFieldDecorator('contractor', {
          initialValue: taskProps['contractor']
        })(
          <Select >
            {selectTestOptions.map(option => <Select.Option key={option}>{option}</Select.Option>)}
          </Select>
        )
      }
    </Item>,
    <Item label='Эксперт' {...formItemLayout}>
      {
        getFieldDecorator('expert', {
          initialValue: taskProps['expert']
        })(
          <Select >
            {selectTestOptions.map(option => <Select.Option key={option}>{option}</Select.Option>)}
          </Select>
        )
      }
    </Item>
  ]
}

const BusinessOfferFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Цена' {...formItemLayout}>
      {
        getFieldDecorator('price', {
          initialValue: taskProps['price']
        })(
          <InputNumber {...inputNumberProps} />
        )
      }
    </Item>,
    <Item label='Дата сопроводительного письма по КП' {...formItemLayout}>
      {
        getFieldDecorator('offerDate', {
          initialValue: taskProps['offerDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Номер сопроводительного письма по КП' {...formItemLayout}>
      {
        getFieldDecorator('offerNum', {
          initialValue: taskProps['offerNum']
        })(
          <Input />
        )
      }
    </Item>
  ]
}

const AgreementOfferFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата одобрения КП' {...formItemLayout}>
      {
        getFieldDecorator('offerApprovedDate', {
          initialValue: taskProps['offerApprovedDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Конкурс' {...formItemLayout}>
      {
        getFieldDecorator('tenderIs', {
          initialValue: taskProps['tenderIs']
        })(
          <Switch />
        )
      }
    </Item>
  ]
}

const TenderFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата проведения конкурса' {...formItemLayout}>
      {
        getFieldDecorator('tenderDate', {
          initialValue: taskProps['tenderDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Тендер выигран' {...formItemLayout}>
      {
        getFieldDecorator('tenderReceived', {
          initialValue: taskProps['tenderReceived']
        })(
          <Switch />
        )
      }
    </Item>
  ]
}

const ContractFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата договора с заказчиком' {...formItemLayout}>
      {
        getFieldDecorator('clientContractDate', {
          initialValue: taskProps['clientContractDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Номер договора с заказчиком' {...formItemLayout}>
      {
        getFieldDecorator('clientContractNum', {
          initialValue: taskProps['clientContractNum']
        })(
          <Input />
        )
      }
    </Item>,
    <Item label='Сумма договора с заказчиком' {...formItemLayout}>
      {
        getFieldDecorator('clientContractPrice', {
          initialValue: taskProps['clientContractPrice']
        })(
          <InputNumber {...inputNumberProps} />
        )
      }
    </Item>,
    <Item label='Дата отправки договора заказчику' {...formItemLayout}>
      {
        getFieldDecorator('clientContractSentDate', {
          initialValue: taskProps['clientContractSentDate']
        })(
          <DatePicker />
        )
      }
    </Item>
  ]
}

const SubcontractFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата договора с подрядчиком' {...formItemLayout}>
      {
        getFieldDecorator('contractorContractDate', {
          initialValue: taskProps['contractorContractDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Номер договора с подрядчиком' {...formItemLayout}>
      {
        getFieldDecorator('contractorContractNum', {
          initialValue: taskProps['contractorContractNum']
        })(
          <Input />
        )
      }
    </Item>,
    <Item label='Сумма договора с подрядчиком' {...formItemLayout}>
      {
        getFieldDecorator('contractorContractPrice', {
          initialValue: taskProps['contractorContractPrice']
        })(
          <InputNumber {...inputNumberProps} />
        )
      }
    </Item>,
    <Item label='Выплата аванса подрядчику' {...formItemLayout}>
      {
        getFieldDecorator('contractorPrepaymentIs', {
          initialValue: taskProps['contractorPrepaymentIs']
        })(
          <Switch />
        )
      }
    </Item>
  ]
}

const CreateClientPrepayFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата счета на аванс заказчику' {...formItemLayout}>
      {
        getFieldDecorator('invoiceDate', {
          initialValue: taskProps['invoiceDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Сумма аванса от Заказчика' {...formItemLayout}>
      {
        getFieldDecorator('invoicePrice', {
          initialValue: taskProps['invoicePrice']
        })(
          <InputNumber {...inputNumberProps} />
        )
      }
    </Item>
  ]
}

const ReceiveClientPrepayFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата получения аванса от заказчика' {...formItemLayout}>
      {
        getFieldDecorator('prepaymentDate', {
          initialValue: taskProps['prepaymentDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Фактическая сумма аванса от Заказчика' {...formItemLayout}>
      {
        getFieldDecorator('prepaymentPrice', {
          initialValue: taskProps['prepaymentPrice']
        })(
          <InputNumber {...inputNumberProps} />
        )
      }
    </Item>
  ]
}

const PayContractPrepayFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата оплаты аванса подрядчику' {...formItemLayout}>
      {
        getFieldDecorator('prepaymentDate', {
          initialValue: taskProps['prepaymentDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Сумма аванса подрядчику' {...formItemLayout}>
      {
        getFieldDecorator('prepaymentPrice', {
          initialValue: taskProps['prepaymentPrice']
        })(
          <InputNumber {...inputNumberProps} />
        )
      }
    </Item>
  ]
}

const CreateEditionFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата готовности редакции' {...formItemLayout}>
      {
        getFieldDecorator('readyDateEdition', {
          initialValue: taskProps['readyDateEdition']
        })(
          <DatePicker />
        )
      }
    </Item>
  ]
}

const SendEditionFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата сопроводительного письма' {...formItemLayout}>
      {
        getFieldDecorator('clSendDate', {
          initialValue: taskProps['clSendDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Исходящий номер сопроводительного письма' {...formItemLayout}>
      {
        getFieldDecorator('clEditionNum', {
          initialValue: taskProps['clEditionNum']
        })(
          <Input />
        )
      }
    </Item>
  ]
}

const AgreementEditionFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата согласования' {...formItemLayout}>
      {
        getFieldDecorator('agreementDate', {
          initialValue: taskProps['agreementDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Дата получения замечаний' {...formItemLayout}>
      {
        getFieldDecorator('dateReceiptComment', {
          initialValue: taskProps['dateReceiptComment']
        })(
          <DatePicker />
        )
      }
    </Item>
  ]
}

const SentApprovalFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата сопроводительного письма' {...formItemLayout}>
      {
        getFieldDecorator('clDate', {
          initialValue: taskProps['clDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Номер сопроводительного письма' {...formItemLayout}>
      {
        getFieldDecorator('clNum', {
          initialValue: taskProps['clNum']
        })(
          <Input />
        )
      }
    </Item>
  ]
}

const ApprovalFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата утверждения СТУ заказчиком' {...formItemLayout}>
      {
        getFieldDecorator('approvalDate', {
          initialValue: taskProps['approvalDate']
        })(
          <DatePicker />
        )
      }
    </Item>
  ]
}

const CreateClient1stInvoiceFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата счета на 1-й этап заказчику' {...formItemLayout}>
      {
        getFieldDecorator('invoiceDate', {
          initialValue: taskProps['invoiceDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Сумма счета на 1-й этап заказчику' {...formItemLayout}>
      {
        getFieldDecorator('invoicePrice', {
          initialValue: taskProps['invoicePrice']
        })(
          <InputNumber {...inputNumberProps} />
        )
      }
    </Item>,
    <Item label='Дата акта с заказчиком по 1-му этапу' {...formItemLayout}>
      {
        getFieldDecorator('actDate', {
          initialValue: taskProps['actDate']
        })(
          <DatePicker />
        )
      }
    </Item>
  ]
}

const ClientPayment1stFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата оплаты заказчиком 1-го этапа' {...formItemLayout}>
      {
        getFieldDecorator('paymentDate', {
          initialValue: taskProps['paymentDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Сумма оплаты заказчиком 1-го этапа' {...formItemLayout}>
      {
        getFieldDecorator('paymentPrice', {
          initialValue: taskProps['paymentPrice']
        })(
          <InputNumber {...inputNumberProps} />
        )
      }
    </Item>,
    <Item label='Дата подписания акта заказчиком по 1-му этапу' {...formItemLayout}>
      {
        getFieldDecorator('actSignDate', {
          initialValue: taskProps['actSignDate']
        })(
          <DatePicker />
        )
      }
    </Item>
  ]
}

const ContractPayment1stFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата сопроводительного письма подрядчику по 1-му этапу' {...formItemLayout}>
      {
        getFieldDecorator('clDate', {
          initialValue: taskProps['clDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Номер сопроводительного письма подрядчику' {...formItemLayout}>
      {
        getFieldDecorator('clNum', {
          initialValue: taskProps['clNum']
        })(
          <Input />
        )
      }
    </Item>,
    <Item label='Дата оплаты подрядчику 1-го этапа' {...formItemLayout}>
      {
        getFieldDecorator('paymentDate', {
          initialValue: taskProps['paymentDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Сумма оплаты подрядчику 1-го этапа' {...formItemLayout}>
      {
        getFieldDecorator('paymentPrice', {
          initialValue: taskProps['paymentPrice']
        })(
          <InputNumber {...inputNumberProps} />
        )
      }
    </Item>,
    <Item label='Дата подписания акта c подрядчиком по 1-му этапу' {...formItemLayout}>
      {
        getFieldDecorator('actSingDate', {
          initialValue: taskProps['actSingDate']
        })(
          <DatePicker />
        )
      }
    </Item>
  ]
}

const CreateClient2stInvoiceFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата счета на 2-й этап заказчику' {...formItemLayout}>
      {
        getFieldDecorator('invoiceDate', {
          initialValue: taskProps['invoiceDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Сумма счета на 2-й этап заказчику' {...formItemLayout}>
      {
        getFieldDecorator('invoicePrice', {
          initialValue: taskProps['invoicePrice']
        })(
          <InputNumber {...inputNumberProps} />
        )
      }
    </Item>,
    <Item label='Дата акта с заказчиком по 2-му этапу' {...formItemLayout}>
      {
        getFieldDecorator('actDate', {
          initialValue: taskProps['actDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Дата сопроводительного письма заказчику' {...formItemLayout}>
      {
        getFieldDecorator('clDate', {
          initialValue: taskProps['clDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Номер сопроводительного письма заказчику' {...formItemLayout}>
      {
        getFieldDecorator('clNum', {
          initialValue: taskProps['clNum']
        })(
          <Input />
        )
      }
    </Item>
  ]
}

const ClientPayment2stFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата оплаты заказчиком 2-го этапа' {...formItemLayout}>
      {
        getFieldDecorator('paymentDate', {
          initialValue: taskProps['paymentDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Сумма оплаты заказчиком 2-го этапа' {...formItemLayout}>
      {
        getFieldDecorator('paymentPrice', {
          initialValue: taskProps['paymentPrice']
        })(
          <InputNumber {...inputNumberProps} />
        )
      }
    </Item>,
    <Item label='Дата подписания акта заказчиком по 2-му этапу' {...formItemLayout}>
      {
        getFieldDecorator('actSignDate', {
          initialValue: taskProps['actSignDate']
        })(
          <DatePicker />
        )
      }
    </Item>
  ]
}

const ContractPayment2stFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата сопроводительного письма подрядчику по 2-му этапу' {...formItemLayout}>
      {
        getFieldDecorator('clDate', {
          initialValue: taskProps['clDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Номер сопроводительного письма подрядчику' {...formItemLayout}>
      {
        getFieldDecorator('clNum', {
          initialValue: taskProps['clNum']
        })(
          <Input />
        )
      }
    </Item>,
    <Item label='Дата оплаты подрядчику 2-го этапа' {...formItemLayout}>
      {
        getFieldDecorator('paymentDate', {
          initialValue: taskProps['paymentDate']
        })(
          <DatePicker />
        )
      }
    </Item>,
    <Item label='Сумма оплаты подрядчику 2-го этапа' {...formItemLayout}>
      {
        getFieldDecorator('paymentPrice', {
          initialValue: taskProps['paymentPrice']
        })(
          <InputNumber {...inputNumberProps} />
        )
      }
    </Item>,
    <Item label='Дата подписания акта c подрядчиком по 2-му этапу' {...formItemLayout}>
      {
        getFieldDecorator('actSingDate', {
          initialValue: taskProps['actSingDate']
        })(
          <DatePicker />
        )
      }
    </Item>
  ]
}

const MKEloadFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата размещения СТУ на портале МКЭ' {...formItemLayout}>
      {
        getFieldDecorator('portalLoadDate', {
          initialValue: taskProps['portalLoadDate']
        })(
          <DatePicker />
        )
      }
    </Item>
  ]
}

const MKEagreementFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  }

  return [
    <Item label='Дата выпуска заключения из МКЭ' {...formItemLayout}>
      {
        getFieldDecorator('resultDate', {
          initialValue: taskProps['resultDate']
        })(
          <DatePicker />
        )
      }
    </Item>
  ]
}

const CancelFormItems = (form, taskProps) => {
  const { getFieldDecorator } = form
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 }
  }

  return [
    <Item label='Причина отказа' {...formItemLayout}>
      {
        getFieldDecorator('cancelNote', {
          initialValue: taskProps['cancelNote']
        })(<Input />)
      }
    </Item>
  ]
}

const formItemsTypes = {
  'AppealRegistration': AppealRegistrationFormItems,
  'InitialData': InitialDataFormItems,
  'BusinessOffer': BusinessOfferFormItems,
  'AgreementOffer': AgreementOfferFormItems,
  'Tender': TenderFormItems,
  'Contract': ContractFormItems,
  'Subcontract': SubcontractFormItems,
  'CreateClientPrepay': CreateClientPrepayFormItems,
  'ReceiveClientPrepay': ReceiveClientPrepayFormItems,
  'PayContractPrepay': PayContractPrepayFormItems,
  'CreateEdition': CreateEditionFormItems,
  'SendEdition': SendEditionFormItems,
  'AgreementEdition': AgreementEditionFormItems,
  'SentApproval': SentApprovalFormItems,
  'Approval': ApprovalFormItems,
  'CreateClient1stInvoice': CreateClient1stInvoiceFormItems,
  'ClientPayment1st': ClientPayment1stFormItems,
  'ContractPayment1st': ContractPayment1stFormItems,
  'CreateClient2stInvoice': CreateClient2stInvoiceFormItems,
  'ClientPayment2st': ClientPayment2stFormItems,
  'ContractPayment2st': ContractPayment2stFormItems,
  'MKEload': MKEloadFormItems,
  'MKEAgreement': MKEagreementFormItems,
  'Cancel': CancelFormItems
}

class SchemeForm extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = { ...this.props.taskProps }
        Object.keys(data).forEach(key => {
          if (values[key]) data[key] = values[key]
        })
        this.props.onSubmit(data)
      }
    })
  }

  render() {
    const { taskProps, form } = this.props
    const { endStatus, _dateFinish, _taskClass } = taskProps
    const formItems = formItemsTypes[_taskClass] && formItemsTypes[_taskClass](form, taskProps)

    return <Form
      onSubmit={this.handleSubmit}
      layout='horizontal'>
      {formItems}
      <Item {...buttonItemLayout}>
        <Button disabled={endStatus || _dateFinish} type='primary' htmlType='submit'>Сохранить</Button>
      </Item>
    </Form>
  }
}

export default Form.create({})(SchemeForm)
