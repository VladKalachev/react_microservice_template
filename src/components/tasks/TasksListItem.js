import React from 'react'
import { List } from 'antd'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils'
import CaseStatus from './CaseStatus'

const css = {
  item: {
    // background: 'yellow'
  },
  selected: {
    // background: 'red'
  },
  wrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    height: 75,
    width: '100%'
  },
  left: {
    height: '100%'
  },
  right: {
    height: '100%',
    textAlign: 'right'
  },
  innerRow: {
    height: '50%'
  },
  small: {
    fontWeight: 600
  }
}

const redirectToInfo = (alias, record, history) => {
  record._taskClass !== 'Case'
    ? history.push(`/tasks/${record._id}`)
    : history.push(`/${alias}/${record._id}`)
}

function TasksListItem({ record, selectRow, alias, selected, history }) {
  const {
    _id,
    _taskClass,
    _dateFinish,
    _caseSchemaTitle,

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
    <div style={css.wrap}>
      <div style={css.left}>
        <div style={css.innerRow}>
          <h3 style={{ display: 'inline' }}>
            {caseNum && <span>#{caseNum}</span>} &ndash;{' '}
            <Link to={`/cases/${_id}`}>{objectTitle}</Link>
          </h3>
        </div>
        <div style={css.innerRow}>
          {client && (
            <small>
              <strong>Заказчик:</strong> {client}{' '}
            </small>
          )}
          {objectAddress && (
            <small>
              <strong>Адрес:</strong> {objectAddress}{' '}
            </small>
          )}
          {clientContractNum && (
            <small>
              <strong>Договор:</strong> {clientContractNum}{' '}
            </small>
          )}
          {clientContractDate && (
            <small>от: {formatDate(clientContractDate)}</small>
          )}
        </div>
      </div>
      <div style={css.right}>
        <div style={css.innerRow}>
          {_caseSchemaTitle} <CaseStatus record={record} />
        </div>
        <div style={css.innerRow}>
          {contractor && (
            <span>
              Исполнитель: {contractor} {expert}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default TasksListItem
