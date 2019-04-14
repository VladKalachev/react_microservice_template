import React, { PureComponent } from 'react'
import {
  Form,
  Button,
  Input,
  Select,
  InputNumber,
  Switch,
  Upload,
  Icon
} from 'antd'
import DatePicker from './DatePicker'
const { Item } = Form

const buttonItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
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

export const createCaseFormItems = form => {
  const { getFieldDecorator } = form
  return [
    <Item key="caseNum" label="Номер дела" {...formItemLayout}>
      {getFieldDecorator('caseNum', {})(<Input />)}
    </Item>,
    <Item key="objectTitle" label="Наименование объекта" {...formItemLayout}>
      {getFieldDecorator('objectTitle', {})(<Input />)}
    </Item>,
    <Item key="client" label="Заказчик" {...formItemLayout}>
      {getFieldDecorator('client', {})(<Input />)}
    </Item>,
    <Item
      key="objectAddress"
      label="Адрес объекта проектирования"
      {...formItemLayout}
    >
      {getFieldDecorator('objectAddress', {})(<Input />)}
    </Item>
  ]
}

export const rejectCaseFormItems = form => {
  const { getFieldDecorator } = form

  return [
    <Item key="cancelNote" label="Причина отказа" {...formItemLayout}>
      {getFieldDecorator('cancelNote', {})(<Input />)}
    </Item>
  ]
}

const AppealRegistrationFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form
  return [
    <Item key="requestDate" label="Дата поступления заявки" {...formItemLayout}>
      {getFieldDecorator('requestDate', {
        initialValue: record['requestDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item key="requestNum" label="Номер входящего письма" {...formItemLayout}>
      {getFieldDecorator('requestNum', {
        initialValue: record['requestNum']
      })(<Input disabled={disabled} />)}
    </Item>
  ]
}

const InitialDataFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item key="client" label="Заказчик" {...formItemLayout}>
      {getFieldDecorator('client', {})(<Input disabled={disabled} />)}
    </Item>,
    <Item key="objectTitle" label="Название объекта" {...formItemLayout}>
      {getFieldDecorator('objectTitle', {
        initialValue: record['objectTitle']
      })(<Input disabled={disabled} />)}
    </Item>,
    <Item
      key="objectAddress"
      label="Адрес объекта проектирования"
      {...formItemLayout}
    >
      {getFieldDecorator('objectAddress', {
        initialValue: record['objectAddress']
      })(<Input disabled={disabled} />)}
    </Item>,
    <Item key="gettingDate" label="Дата получения" {...formItemLayout}>
      {getFieldDecorator('gettingDate', {
        initialValue: record['gettingDate']
      })(<DatePicker placeholder="" disabled={disabled} />)}
    </Item>,
    <Item key="contractor" label="Подрядчик" {...formItemLayout}>
      {getFieldDecorator('contractor', {
        initialValue: record['contractor']
      })(
        <Select disabled={disabled}>
          {selectTestOptions.map(option => (
            <Select.Option key={option}>{option}</Select.Option>
          ))}
        </Select>
      )}
    </Item>,
    <Item key="expert" label="Эксперт" {...formItemLayout}>
      {getFieldDecorator('expert', {
        initialValue: record['expert']
      })(
        <Select disabled={disabled}>
          {selectTestOptions.map(option => (
            <Select.Option key={option}>{option}</Select.Option>
          ))}
        </Select>
      )}
    </Item>
  ]
}

const BusinessOfferFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item key="price" label="Цена" {...formItemLayout}>
      {getFieldDecorator('price', {
        initialValue: record['price']
      })(<InputNumber {...inputNumberProps} disabled={disabled} />)}
    </Item>,
    <Item
      key="offerDate"
      label="Дата сопроводительного письма по КП"
      {...formItemLayout}
    >
      {getFieldDecorator('offerDate', {
        initialValue: record['offerDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item
      key="offerNum"
      label="Номер сопроводительного письма по КП"
      {...formItemLayout}
    >
      {getFieldDecorator('offerNum', {
        initialValue: record['offerNum']
      })(<Input disabled={disabled} />)}
    </Item>
  ]
}

const AgreementOfferFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item key="offerApprovedDate" label="Дата одобрения КП" {...formItemLayout}>
      {getFieldDecorator('offerApprovedDate', {
        initialValue: record['offerApprovedDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item key="tenderIs" label="Конкурс" {...formItemLayout}>
      {getFieldDecorator('tenderIs', {
        initialValue: record['tenderIs'],
        valuePropName: 'checked'
      })(<Switch disabled={disabled} />)}
    </Item>
  ]
}

const TenderFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form
  return [
    <Item key="tenderDate" label="Дата проведения конкурса" {...formItemLayout}>
      {getFieldDecorator('tenderDate', {
        initialValue: record['tenderDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item key="tenderReceived" label="Тендер выигран" {...formItemLayout}>
      {getFieldDecorator('tenderReceived', {
        initialValue: record['tenderReceived'],
        valuePropName: 'checked'
      })(
        <Select disabled={disabled}>
          <Select.Option key="no" />
          <Select.Option key="Да">Да</Select.Option>
          <Select.Option key="Нет">Нет</Select.Option>
        </Select>
      )}
    </Item>
  ]
}

const ContractFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item
      key="clientContractDate"
      label="Дата договора с заказчиком"
      {...formItemLayout}
    >
      {getFieldDecorator('clientContractDate', {
        initialValue: record['clientContractDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item
      key="clientContractNum"
      label="Номер договора с заказчиком"
      {...formItemLayout}
    >
      {getFieldDecorator('clientContractNum', {
        initialValue: record['clientContractNum']
      })(<Input disabled={disabled} />)}
    </Item>,
    <Item
      key="clientContractPrice"
      label="Сумма договора с заказчиком"
      {...formItemLayout}
    >
      {getFieldDecorator('clientContractPrice', {
        initialValue: record['clientContractPrice']
      })(<InputNumber {...inputNumberProps} disabled={disabled} />)}
    </Item>,
    <Item
      key="clientContractSentDate"
      label="Дата отправки договора заказчику"
      {...formItemLayout}
    >
      {getFieldDecorator('clientContractSentDate', {
        initialValue: record['clientContractSentDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>
  ]
}

const SubcontractFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item
      key="contractorContractDate"
      label="Дата договора с подрядчиком"
      {...formItemLayout}
    >
      {getFieldDecorator('contractorContractDate', {
        initialValue: record['contractorContractDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item
      key="contractorContractNum"
      label="Номер договора с подрядчиком"
      {...formItemLayout}
    >
      {getFieldDecorator('contractorContractNum', {
        initialValue: record['contractorContractNum']
      })(<Input disabled={disabled} />)}
    </Item>,
    <Item
      key="contractorContractPrice"
      label="Сумма договора с подрядчиком"
      {...formItemLayout}
    >
      {getFieldDecorator('contractorContractPrice', {
        initialValue: record['contractorContractPrice']
      })(<InputNumber {...inputNumberProps} disabled={disabled} />)}
    </Item>,
    <Item
      key="contractorPrepaymentIs"
      label="Выплата аванса подрядчику"
      {...formItemLayout}
    >
      {getFieldDecorator('contractorPrepaymentIs', {
        initialValue: record['contractorPrepaymentIs'],
        valuePropName: 'checked'
      })(<Switch disabled={disabled} />)}
    </Item>
  ]
}

const CreateClientPrepayFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item
      key="invoiceDate"
      label="Дата счета на аванс заказчику"
      {...formItemLayout}
    >
      {getFieldDecorator('invoiceDate', {
        initialValue: record['invoiceDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item
      key="invoicePrice"
      label="Сумма аванса от Заказчика"
      {...formItemLayout}
    >
      {getFieldDecorator('invoicePrice', {
        initialValue: record['invoicePrice']
      })(<InputNumber {...inputNumberProps} disabled={disabled} />)}
    </Item>
  ]
}

const ReceiveClientPrepayFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item
      key="prepaymentDate"
      label="Дата получения аванса от заказчика"
      {...formItemLayout}
    >
      {getFieldDecorator('prepaymentDate', {
        initialValue: record['prepaymentDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item
      key="prepaymentPrice"
      label="Фактическая сумма аванса от Заказчика"
      {...formItemLayout}
    >
      {getFieldDecorator('prepaymentPrice', {
        initialValue: record['prepaymentPrice']
      })(<InputNumber {...inputNumberProps} disabled={disabled} />)}
    </Item>
  ]
}

const PayContractPrepayFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item
      key="prepaymentDate"
      label="Дата оплаты аванса подрядчику"
      {...formItemLayout}
    >
      {getFieldDecorator('prepaymentDate', {
        initialValue: record['prepaymentDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item
      key="prepaymentPrice"
      label="Сумма аванса подрядчику"
      {...formItemLayout}
    >
      {getFieldDecorator('prepaymentPrice', {
        initialValue: record['prepaymentPrice']
      })(<InputNumber {...inputNumberProps} disabled={disabled} />)}
    </Item>
  ]
}

const CreateEditionFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item
      key="readyDateEdition"
      label="Дата готовности редакции"
      {...formItemLayout}
    >
      {getFieldDecorator('readyDateEdition', {
        initialValue: record['readyDateEdition']
      })(<DatePicker disabled={disabled} />)}
    </Item>
  ]
}

const SendEditionFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item
      key="clSendDate"
      label="Дата сопроводительного письма"
      {...formItemLayout}
    >
      {getFieldDecorator('clSendDate', {
        initialValue: record['clSendDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item
      key="clEditionNum"
      label="Исходящий номер сопроводительного письма"
      {...formItemLayout}
    >
      {getFieldDecorator('clEditionNum', {
        initialValue: record['clEditionNum']
      })(<Input disabled={disabled} />)}
    </Item>
  ]
}

const AgreementEditionFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item key="agreementDate" label="Дата согласования" {...formItemLayout}>
      {getFieldDecorator('agreementDate', {
        initialValue: record['agreementDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item
      key="dateReceiptComment"
      label="Дата получения замечаний"
      {...formItemLayout}
    >
      {getFieldDecorator('dateReceiptComment', {
        initialValue: record['dateReceiptComment']
      })(<DatePicker disabled={disabled} />)}
    </Item>
  ]
}

const SentApprovalFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item
      key="clDate"
      label="Дата сопроводительного письма"
      {...formItemLayout}
    >
      {getFieldDecorator('clDate', {
        initialValue: record['clDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item
      key="clNum"
      label="Номер сопроводительного письма"
      {...formItemLayout}
    >
      {getFieldDecorator('clNum', {
        initialValue: record['clNum']
      })(<Input disabled={disabled} />)}
    </Item>
  ]
}

const ApprovalFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item
      key="approvalDate"
      label="Дата утверждения СТУ заказчиком"
      {...formItemLayout}
    >
      {getFieldDecorator('approvalDate', {
        initialValue: record['approvalDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>
  ]
}

const CreateClient1stInvoiceFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item
      key="invoiceDate"
      label="Дата счета на 1-й этап заказчику"
      {...formItemLayout}
    >
      {getFieldDecorator('invoiceDate', {
        initialValue: record['invoiceDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item
      key="invoicePrice"
      label="Сумма счета на 1-й этап заказчику"
      {...formItemLayout}
    >
      {getFieldDecorator('invoicePrice', {
        initialValue: record['invoicePrice']
      })(<InputNumber {...inputNumberProps} disabled={disabled} />)}
    </Item>,
    <Item
      key="actDate"
      label="Дата акта с заказчиком по 1-му этапу"
      {...formItemLayout}
    >
      {getFieldDecorator('actDate', {
        initialValue: record['actDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>
  ]
}

const ClientPayment1stFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item
      key="paymentDate"
      label="Дата оплаты заказчиком 1-го этапа"
      {...formItemLayout}
    >
      {getFieldDecorator('paymentDate', {
        initialValue: record['paymentDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item
      key="paymentPrice"
      label="Сумма оплаты заказчиком 1-го этапа"
      {...formItemLayout}
    >
      {getFieldDecorator('paymentPrice', {
        initialValue: record['paymentPrice']
      })(<InputNumber {...inputNumberProps} disabled={disabled} />)}
    </Item>,
    <Item
      key="actSignDate"
      label="Дата подписания акта заказчиком по 1-му этапу"
      {...formItemLayout}
    >
      {getFieldDecorator('actSignDate', {
        initialValue: record['actSignDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>
  ]
}

const ContractPayment1stFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item
      key="clDate"
      label="Дата сопроводительного письма подрядчику по 1-му этапу"
      {...formItemLayout}
    >
      {getFieldDecorator('clDate', {
        initialValue: record['clDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item
      key="clNum"
      label="Номер сопроводительного письма подрядчику"
      {...formItemLayout}
    >
      {getFieldDecorator('clNum', {
        initialValue: record['clNum']
      })(<Input disabled={disabled} />)}
    </Item>,
    <Item
      key="paymentDate"
      label="Дата оплаты подрядчику 1-го этапа"
      {...formItemLayout}
    >
      {getFieldDecorator('paymentDate', {
        initialValue: record['paymentDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item
      key="paymentPrice"
      label="Сумма оплаты подрядчику 1-го этапа"
      {...formItemLayout}
    >
      {getFieldDecorator('paymentPrice', {
        initialValue: record['paymentPrice']
      })(<InputNumber {...inputNumberProps} disabled={disabled} />)}
    </Item>,
    <Item
      key="actSingDate"
      label="Дата подписания акта c подрядчиком по 1-му этапу"
      {...formItemLayout}
    >
      {getFieldDecorator('actSingDate', {
        initialValue: record['actSingDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>
  ]
}

const CreateClient2stInvoiceFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item
      key="invoiceDate"
      label="Дата счета на 2-й этап заказчику"
      {...formItemLayout}
    >
      {getFieldDecorator('invoiceDate', {
        initialValue: record['invoiceDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item
      key="invoicePrice"
      label="Сумма счета на 2-й этап заказчику"
      {...formItemLayout}
    >
      {getFieldDecorator('invoicePrice', {
        initialValue: record['invoicePrice']
      })(<InputNumber {...inputNumberProps} disabled={disabled} />)}
    </Item>,
    <Item
      key="actDate"
      label="Дата акта с заказчиком по 2-му этапу"
      {...formItemLayout}
    >
      {getFieldDecorator('actDate', {
        initialValue: record['actDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item
      key="clDate"
      label="Дата сопроводительного письма заказчику"
      {...formItemLayout}
    >
      {getFieldDecorator('clDate', {
        initialValue: record['clDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item
      key="clNum"
      label="Номер сопроводительного письма заказчику"
      {...formItemLayout}
    >
      {getFieldDecorator('clNum', {
        initialValue: record['clNum']
      })(<Input disabled={disabled} />)}
    </Item>
  ]
}

const ClientPayment2stFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item
      key="paymentDate"
      label="Дата оплаты заказчиком 2-го этапа"
      {...formItemLayout}
    >
      {getFieldDecorator('paymentDate', {
        initialValue: record['paymentDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item
      key="paymentPrice"
      label="Сумма оплаты заказчиком 2-го этапа"
      {...formItemLayout}
    >
      {getFieldDecorator('paymentPrice', {
        initialValue: record['paymentPrice']
      })(<InputNumber {...inputNumberProps} disabled={disabled} />)}
    </Item>,
    <Item
      key="actSignDate"
      label="Дата подписания акта заказчиком по 2-му этапу"
      {...formItemLayout}
    >
      {getFieldDecorator('actSignDate', {
        initialValue: record['actSignDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>
  ]
}

const ContractPayment2stFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item
      key="clDate"
      label="Дата сопроводительного письма подрядчику по 2-му этапу"
      {...formItemLayout}
    >
      {getFieldDecorator('clDate', {
        initialValue: record['clDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item
      key="clNum"
      label="Номер сопроводительного письма подрядчику"
      {...formItemLayout}
    >
      {getFieldDecorator('clNum', {
        initialValue: record['clNum']
      })(<Input disabled={disabled} />)}
    </Item>,
    <Item
      key="paymentDate"
      label="Дата оплаты подрядчику 2-го этапа"
      {...formItemLayout}
    >
      {getFieldDecorator('paymentDate', {
        initialValue: record['paymentDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>,
    <Item
      key="paymentPrice"
      label="Сумма оплаты подрядчику 2-го этапа"
      {...formItemLayout}
    >
      {getFieldDecorator('paymentPrice', {
        initialValue: record['paymentPrice']
      })(<InputNumber {...inputNumberProps} disabled={disabled} />)}
    </Item>,
    <Item
      key="actSingDate"
      label="Дата подписания акта c подрядчиком по 2-му этапу"
      {...formItemLayout}
    >
      {getFieldDecorator('actSingDate', {
        initialValue: record['actSingDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>
  ]
}

const MKEloadFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item
      key="portalLoadDate"
      label="Дата размещения СТУ на портале МКЭ"
      {...formItemLayout}
    >
      {getFieldDecorator('portalLoadDate', {
        initialValue: record['portalLoadDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>
  ]
}

const MKEagreementFormItems = (form, record, disabled) => {
  const { getFieldDecorator } = form

  return [
    <Item
      key="resultDate"
      label="Дата выпуска заключения из МКЭ"
      {...formItemLayout}
    >
      {getFieldDecorator('resultDate', {
        initialValue: record['resultDate']
      })(<DatePicker disabled={disabled} />)}
    </Item>
  ]
}

const formItemsTypes = {
  AppealRegistration: AppealRegistrationFormItems,
  InitialData: InitialDataFormItems,
  BusinessOffer: BusinessOfferFormItems,
  AgreementOffer: AgreementOfferFormItems,
  Tender: TenderFormItems,
  Contract: ContractFormItems,
  Subcontract: SubcontractFormItems,
  CreateClientPrepay: CreateClientPrepayFormItems,
  ReceiveClientPrepay: ReceiveClientPrepayFormItems,
  PayContractPrepay: PayContractPrepayFormItems,
  CreateEdition: CreateEditionFormItems,
  SendEdition: SendEditionFormItems,
  AgreementEdition: AgreementEditionFormItems,
  SentApproval: SentApprovalFormItems,
  Approval: ApprovalFormItems,
  CreateClient1stInvoice: CreateClient1stInvoiceFormItems,
  ClientPayment1st: ClientPayment1stFormItems,
  ContractPayment1st: ContractPayment1stFormItems,
  CreateClient2stInvoice: CreateClient2stInvoiceFormItems,
  ClientPayment2st: ClientPayment2stFormItems,
  ContractPayment2st: ContractPayment2stFormItems,
  MKEload: MKEloadFormItems,
  MKEAgreement: MKEagreementFormItems
}

class TaskForm extends PureComponent {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = { ...this.props.record }
        Object.keys(data).forEach(key => {
          if (values[key]) data[key] = values[key]
        })

        this.props.onSubmit(data)
      }
    })
  }

  render() {
    const { record, form, disabled, toggle } = this.props
    const { endStatus, _dateFinish, _taskClass } = record
    const { getFieldDecorator } = form

    const formItems =
      formItemsTypes[_taskClass] &&
      formItemsTypes[_taskClass](form, record, disabled)

    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        {formItems}
        <Item style={{ marginBottom: 0 }} {...buttonItemLayout}>
          {getFieldDecorator('files')(
            <Upload action="/" disabled={disabled}>
              <Button
                icon="upload"
                disabled={disabled}
                children="Загрузить файлы"
              />
            </Upload>
          )}
        </Item>
        {!disabled && (
          <Item style={{ marginBottom: 0 }} {...buttonItemLayout}>
            <Button
              style={{ marginRight: 15 }}
              type="primary"
              htmlType="submit"
            >
              Сохранить
            </Button>
            <Button
              onClick={() => {
                this.props.form.resetFields()
                toggle()
              }}
            >
              Отмена
            </Button>
          </Item>
        )}
      </Form>
    )
  }
}

export default Form.create({})(TaskForm)
