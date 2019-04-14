import React, { PureComponent } from 'react'
import { Icon, Button, Tabs, Badge, List, Timeline, Divider } from 'antd'
import { Route, withRouter } from 'react-router-dom'

import moment from 'moment'
import Content from '../layout/Content'
import Status from './Status'
import Dates from './Dates'
import KeyValueTable from './KeyValueTable'
import OverlayLoader from '../layout/OverlayLoader'
import TaskForm from './TaskForm'
import TaskModal from './TaskModal'
import TasksListItem from './TasksListItem'
import TasksItem from './TasksItem'

import { connect } from 'react-redux'
import {
  entitiesSelector,
  fetchCaseWithTasks,
  loadingSelector,
  fetchEditTask,
  createTask
} from '../../modules/tasks'

import {
  REJECT_CASE as rejectCaseType,
  showModal,
  hideModal,
  namespace as modals,
  CREATE_CASE as createCaseType
} from '../../modules/modals'

const css = {
  // wrapper: {
  //   display: 'flex'
  // }
  header: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between'
  },
  formStyle: {
    marginTop: 25,
    marginRight: 30,
    marginLeft: 30
  }
}

function renderHeader(record, entities, alias, match, history, showModal) {
  return <TasksListItem record={record} />
}

function renderChildrenTasks(childTasks, entities, history, fetchEditTask) {
  const sections = [...new Set(childTasks.map(task => task._setTitle))]

  return sections.map(name => [
    <h3>Раздел &laquo;{name}&raquo;</h3>,
    <List
      size="large"
      bordered={false}
      dataSource={childTasks.filter(task => task._setTitle === name)}
      renderItem={record => (
        <List.Item style={{ padding: 0, borderBottom: 'none' }}>
          <TasksItem
            entities={entities}
            record={record}
            onSubmit={fetchEditTask}
          />
        </List.Item>
      )}
    />
  ])
}
function renderFooter(match) {
  return (
    <Route
      path={match.url + '/edit'}
      render={() => (
        <div style={{ width: '100%', textAlign: 'right' }}>card footer</div>
      )}
    />
  )
}
function renderEditBlock(record, onTaskEdit) {
  return (
    <div style={css.formStyle}>
      <TaskForm
        taskProps={record}
        onSubmit={data => onTaskEdit(record._id, data)}
      />
    </div>
  )
}

function renderTaskCard({
  match,
  history,
  alias,
  entities,
  loading,
  fetchEditTask,
  ...props
}) {
  const record = entities[match.params.id] || {}

  const childTasks = Object.values(entities)
    .filter(
      task => task._caseId === match.params.id && task._id !== match.params.id
    )
    .sort((a, b) => b._creationDate - a._creationDate)

  return (
    <Content
      header={renderHeader(
        record,
        entities,
        alias,
        match,
        history,
        props.showModal
      )}
      // footer={renderFooter(match)}
    >
      <Route
        path={match.url + '/edit'}
        render={() => renderEditBlock(record, fetchEditTask)}
      />
      <Route
        path={match.url}
        exact
        render={() =>
          loading ? (
            <OverlayLoader backgroundOpacity={0.7} />
          ) : (
            <Tabs style={{ padding: '0 10px 0' }} defaultActiveKey={'main'}>
              {record._taskClass === 'Case' ? (
                <Tabs.TabPane tab="Общее" key="main">
                  {renderChildrenTasks(
                    childTasks.filter(({ _taskClass }) =>
                      [
                        'AppealRegistration',
                        'InitialData',
                        'CreateEdition',
                        'SendEdition',
                        'AgreementEdition',
                        'SentApproval',
                        'Approval',
                        'MKEload',
                        'MKEagreement'
                      ].includes(_taskClass)
                    ),
                    entities,
                    history,
                    fetchEditTask
                  )}
                </Tabs.TabPane>
              ) : null}
              <Tabs.TabPane tab="Финансы" key="finance">
                {renderChildrenTasks(
                  childTasks.filter(({ _taskClass }) =>
                    [
                      'BusinessOffer',
                      'AgreementOffer',
                      'Tender',
                      'Contract',
                      'Subcontract',
                      'CreateClientPrepay',
                      'ReceiveClientPrepay',
                      'PayContractPrepay',
                      'CreateClient1stInvoice',
                      'ClientPayment1st',
                      'ContractPayment1st',
                      'CreateClient2stInvoice',
                      'ClientPayment2st',
                      'ContractPayment2st'
                    ].includes(_taskClass)
                  ),
                  entities,
                  history,
                  fetchEditTask
                )}
              </Tabs.TabPane>
              <Tabs.TabPane tab="Файлы дела" key="caseFiles">
                <h2>Файлы дела</h2>
              </Tabs.TabPane>
            </Tabs>
          )
        }
      />
      <Route
        path="/cases/:id"
        exact
        render={() => (
          <TaskModal
            visible={props.visibleRejectCaseModal}
            type={rejectCaseType}
            onOk={data => handleRejectCase(data, props)}
            onCancel={props.hideModal}
            title="Отказ от дела"
          />
        )}
      />
    </Content>
  )
}

function handleRejectCase(rejectData, { modalProps, hideModal, createTask }) {
  const data = {
    ...rejectData,
    _caseId: modalProps._id,
    _taskClass: 'Cancel'
  }
  createTask(data)
  hideModal()
}

class TaskCard extends PureComponent {
  render() {
    return renderTaskCard(this.props)
  }
}

export default withRouter(
  connect(
    state => ({
      entities: entitiesSelector(state),
      loading: loadingSelector(state),
      visibleRejectCaseModal: state[modals].modalType === rejectCaseType,
      modalProps: state[modals].modalProps
    }),
    { fetchCaseWithTasks, fetchEditTask, showModal, hideModal, createTask }
  )(TaskCard)
)
