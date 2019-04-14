import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Modal,
  Popover,
  Row,
  Col,
  Form,
  DatePicker,
  InputNumber
} from 'antd'
import contractDevelopmentIcon from './contractDevelopment.png'
// import contractKpIcon from './contractKP.png'
// import contractTerminationIcon from './contractTermination.png'
// import contractConclusionIcon from './contractConclusion.png'
import userIcon from './userIcon.png'
import './Task.css'
const { Item } = Form

// придумать нормальные названия каждому статусу и классу
// const status1 = (
//   <div className="status status-1">
//     осталось <span className="bold">14</span> дней
//   </div>
// )
// const status2 = <div className="status status-2">выполнено точно в срок</div>
// const status3 = (
//   <div className="status status-2 status-3">
//     с опережением на <span className="bold">14</span> дней
//   </div>
// )
// const status4 = (
//   <div className="status status-2 status-4">
//     со срывом на <span className="bold">14</span> дней
//   </div>
// )
// const status5 = <div className="status status-5">задача не активна</div>
// const status6 = (
//   <div className="status status-6">
//     осталось <span className="bold">14</span> дней до начала
//   </div>
// )
// const status7 = <div className="status status-7">срок СЕГОДНЯ</div>
// const status8 = (
//   <div className="status status-8">
//     ВНИМАНИЕ осталось <span className="bold">14</span> дней
//   </div>
// )
const status9 = (
  <div className="status status-9">
    СОРВАНО на <span className="bold">14</span> дней
  </div>
)

class TaskComponent extends Component {
  static defaultProps = {
    buttonText: '',
    titleText: '',
    responsible: '',
    creationDate: '',
    duration: '',
    reminder: ''
  }

  static propTypes = {
    buttonText: PropTypes.string,
    titleText: PropTypes.string,
    responsible: PropTypes.string,
    creationDate: PropTypes.string,
    duration: PropTypes.string,
    reminder: PropTypes.number
  }

  state = { visible: false }

  showModal = () => this.setState({ visible: true })

  hideModal = () => this.setState({ visible: false })

  getPopoverContent = () => {
    const { creationDate, duration, reminder } = this.props

    return [
      <Row key="1" className="popover-row">
        <Col className="popover-title">ЗАДАЧА В РАБОТЕ</Col>
      </Row>,
      <Row key="2" className="popover-row">
        <Col span={14}>
          Дата начала <span className="bold">{creationDate}</span>
        </Col>
        <Col span={10}>Уведомление через:</Col>
      </Row>,
      <Row key="3" className="popover-row">
        <Col span={14}>
          Длительность <span className="bold">{duration}</span>
        </Col>
        <Col style={{ textAlign: 'center' }} span={10}>
          <span className="bold">{reminder}</span> дней
        </Col>
      </Row>,
      <Row key="4" className="popover-row">
        <Col>
          Истекает <span className="bold">25.02.2018</span>
        </Col>
      </Row>
    ]
  }

  getTitle = () => {
    const { titleText, responsible } = this.props

    return (
      <Popover placement="topLeft" content={this.getPopoverContent()}>
        <div key="titleRow1" className="title-row-1">
          <div className="title-column-1">
            <img src={contractDevelopmentIcon} alt="" />
            <span className="title-text">{titleText}</span>
          </div>
          <div className="title-column-2">
            <img src={userIcon} alt="" />
            <span className="title-author">{responsible}</span>
          </div>
        </div>
        <div key="titleRow2" className="title-row-2">
          {status9}
        </div>
      </Popover>
    )
  }

  render() {
    const { buttonText } = this.props
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      }
    }

    return [
      <Button key="button" type="primary" onClick={this.showModal}>
        {buttonText}
      </Button>,
      <Modal
        key="modal"
        title={this.getTitle()}
        visible={this.state.visible}
        okText="Сохранить"
        width={960}
        style={{ top: 160 }}
        onOk={this.hideModal}
        onCancel={this.hideModal}
      >
        <Row>
          <Col span={12}>
            <Item
              {...formItemLayout}
              label="Дата заключения договора с Заказчиком"
            >
              {getFieldDecorator('contractConclusionDate')(<DatePicker />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item {...formItemLayout} label="Длительность 1-го этапа">
              {getFieldDecorator('durationStage1')(<InputNumber />)}
            </Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Item {...formItemLayout} label="Дата отправки договора Заказчику">
              {getFieldDecorator('contractSendingDate')(<DatePicker />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item {...formItemLayout} label="Длительность оплаты 1-ого этапа">
              {getFieldDecorator('paymentDurationStage1')(<InputNumber />)}
            </Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Item {...formItemLayout} label="Сумма договора с Заказчиком">
              {getFieldDecorator('contractAmount')(<InputNumber />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item {...formItemLayout} label="Длительность 2-го этапа">
              {getFieldDecorator('durationStage2')(<InputNumber />)}
            </Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Item {...formItemLayout} label="Номер договора с заказчиком">
              {getFieldDecorator('contractNumber')(<InputNumber />)}
            </Item>
          </Col>
          <Col span={12}>
            <Item {...formItemLayout} label="Длительность оплаты 2-го этапа">
              {getFieldDecorator('paymentDurationStage2')(<InputNumber />)}
            </Item>
          </Col>
        </Row>
      </Modal>
    ]
  }
}

export default Form.create()(TaskComponent)
