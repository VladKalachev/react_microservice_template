import React from 'react'
import { Button, Affix } from 'antd'
import { Link } from 'react-router-dom'
import Status from './Status'
import OverlayLoader from '../layout/OverlayLoader'
import TaskForm from './TaskForm'
const css = {
  wrap: {
    position: 'relative',
    width: '100%',
    border: '1px solid #ebebeb',
    borderRadius: 5,
    marginBottom: 15,
    transition: 'all 0.5s'
    // background: 'red'
  },
  task: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderBottom: '1px dotted #ebebeb'
  },
  taskLeft: {
    // width: '33.33333%'
  },
  title: {
    display: 'inline-block',
    fontWeight: 700,
    margin: 0
  },
  taskRight: {
    // width: '33.33333%',
    textAlign: 'right'
  },
  form: {
    padding: 10
    // width: 400,
    // borderTop: '1px dotted #ebebeb'
  }
}
class TasksItem extends React.PureComponent {
  state = {
    formDisabled: true,
    loading: false
  }

  toggleForm = () => this.setState({ formDisabled: !this.state.formDisabled })

  render() {
    const { record, alias, history, entities, onSubmit } = this.props
    const {
      // system fields
      _id,
      _taskClass,
      _taskTitle,
      _dateFinish,
      _caseSchemaTitle,
      _responsible,

      // custom fields
      caseNum,
      objectTitle,
      objectAddress,
      client,
      expert,
      contractor,
      clientContractNum,
      clientContractDate
    } = record

    return (
      <div
        style={{
          ...css.wrap
          // backgroundColor: this.state.formDisabled
          //   ? 'transparent'
          //   : 'transparent'
        }}
      >
        {this.state.loading && <OverlayLoader backgroundOpacity={0.7} />}
        <div style={css.task}>
          <div style={css.taskLeft}>
            <Button
              type="primary"
              disabled={record._dateFinish}
              ghost
              icon={this.state.formDisabled ? 'lock' : 'unlock'}
              onClick={this.toggleForm}
              children={_taskTitle}
            />
          </div>
          <div style={css.taskRight}>
            {_responsible && <span>Ответственный: {_responsible}</span>}
            <Status record={record} />
          </div>
        </div>
        <div style={css.form}>
          <TaskForm
            disabled={this.state.formDisabled}
            toggle={this.toggleForm}
            record={record}
            onSubmit={data => {
              this.setState({ loading: true })
              onSubmit(data._id, data, response => {
                this.setState({ loading: false })
                this.toggleForm()
              })
            }}
          />
        </div>
      </div>
    )
  }
}

export default TasksItem
