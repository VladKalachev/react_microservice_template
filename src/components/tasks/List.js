import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import moment from 'moment'
import {
  Button,
  Input,
  List,
  Icon,
  Tooltip,
  Popconfirm,
  Row,
  Col,
  Avatar
} from 'antd'
import { NavLink, withRouter } from 'react-router-dom'
import Task from '../common/Task'
import OverlayLoader from '../layout/OverlayLoader'
import TasksListItem from './TasksListItem'
import TasksItem from './TasksItem'

const css = {
  list: {
    minWidth: 300
  },
  header: {
    // 136px - width of action column
    width: 'calc(100% - 136px)',
    padding: '5px 2px 5px 5px'
  },
  listItem: {
    padding: '5px 10px',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center'
  },
  itemInner: {
    width: '100%'
    // display: 'flex
  },
  selectedListItem: {
    padding: '5px 10px',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DBF2F5'
  },
  name: {
    padding: '0 15px'
  },
  status: {
    padding: '0 15px'
  },
  titleBlock: {
    cursor: 'pointer'
  },
  mainTitle: {
    color: '#409cb3'
  },
  subInfo: {
    color: '#a1a1a1',
    fontSize: 11,
    marginTop: 5
  }
}

class TasksList extends React.PureComponent {
  getDate = (dateStart = Date.now(), duration = 0) => {
    // seconds * minutes * hours * milliseconds = 1 day
    const day = 60 * 60 * 24 * 1000
    return moment(dateStart + duration).format('DD MM YYYY')
  }

  taskTitle = task => {
    return (
      <div>
        <div style={css.mainTitle}>{task._taskTitle}</div>
        <div style={css.subInfo}>
          Выполнить до {this.getDate(task._dateStart, task._duration)}
        </div>
      </div>
    )
  }

  caseTitle = (
    {
      _id,
      caseNum,
      objectTitle,
      objectAddress,
      client,
      expert,
      contractor,
      clientContractNum,
      clientContractDate,
      _caseSchemaTitle
    },
    selectRow
  ) => {
    return (
      <div style={css.titleBlock} onClick={() => selectRow(_id)}>
        <div style={css.mainTitle}>
          {caseNum && <small>#{caseNum}</small>} {objectTitle}
        </div>
        <div style={css.subInfo}>{objectAddress}</div>
      </div>
    )
  }

  render() {
    const { selectRow, alias, selected, history, entities } = this.props

    return (
      <List
        style={css.list}
        size="large"
        // pagination={{
        //   onChange: page => {
        //     console.log(page)
        //   },
        //   pageSize: 3
        // }}
        bordered={false}
        dataSource={this.props.data}
        renderItem={record =>
          alias === 'cases' ? (
            <List.Item key={record._id} style={{ padding: 0 }}>
              <TasksListItem
                record={record}
                selectRow={selectRow}
                alias={alias}
                selected={selected}
                history={history}
              />
            </List.Item>
          ) : (
            <List.Item
              key={record._id}
              style={{ padding: 0, borderBottom: 'none' }}
            >
              <TasksItem entities={entities} alias="tasks" record={record} />
            </List.Item>
          )
        }
      />
    )
  }
}

export default TasksList
