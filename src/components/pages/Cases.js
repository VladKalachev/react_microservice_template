import React from 'react'
import { Helmet } from 'react-helmet'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Input, Pagination, Dropdown, Menu as AntMenu } from 'antd'

import Menu from '../common/Menu'
import PreviewCard from '../tasks/PreviewCard'
import Content from '../layout/Content'
import Sidebar from '../layout/Sidebar'
import List from '../tasks/List'
import TaskCard from '../tasks/TaskCard'
import TaskModal from '../tasks/TaskModal'

import OverlayLoader from '../layout/OverlayLoader'

import {
  loadingSelector,
  entitiesSelector,
  selectedSelector,
  dataSelector,
  sectionsSelector,
  fetchAll,
  selectRow,
  createTask
} from '../../modules/tasks'

import {
  caseSchemeListSelector,
  fetchAll as fetchAllSchemes
} from '../../modules/schemes'

import {
  CREATE_CASE as createCaseType,
  showModal,
  hideModal,
  namespace as modals
} from '../../modules/modals'

const alias = 'cases'

class Cases extends React.PureComponent {
  componentDidMount() {
    const { location: { search } } = this.props
    this.props.fetchAll('/tasks')
    this.props.fetchAllSchemes("/scheme?select=_taskClass['Case']")
  }

  // componentWillReceiveProps(nextProps) {
  //   const { location: { search, pathname } } = this.props
  //   console.log(nextProps)
  //   const {
  //     location: { search: nextSearch, pathname: nextPathname }
  //   } = nextProps
  //
  //   if (search !== nextSearch || pathname !== nextPathname) {
  //     const queryString = nextSearch
  //       ? `/tasks${nextSearch}`
  //       : '/tasks?filters=_taskClass[Case]'
  //
  //     this.props.fetchAll(queryString)
  //   }
  // }

  renderMenu = caseSchemeList => {
    const onMenuClick = ({
      item: { props: { class: _taskClass } },
      key: _caseSchemaId
    }) => {
      const data = {
        _taskClass,
        _caseSchemaId
      }
      this.props.showModal(createCaseType, data)
      // createTask(data)
    }

    return (
      <AntMenu onClick={onMenuClick}>
        {caseSchemeList.map(scheme => (
          <AntMenu.Item class={scheme._taskClass} key={scheme._id}>
            {scheme._caseSchemaTitle}
          </AntMenu.Item>
        ))}
      </AntMenu>
    )
  }

  handleCreateCase = data => {
    const { modalProps, hideModal, createTask } = this.props
    createTask({ ...data, ...modalProps })
    hideModal()
  }

  render() {
    const {
      loading,
      entities,
      selectRow,
      selected,
      history,
      data,
      caseSchemeList,
      visibleCreateCaseModal,
      hideModal
    } = this.props

    const menu = this.renderMenu(caseSchemeList)

    const filterData = ({ _taskClass, endStatus }) => {
      switch (this.props.location.search) {
        case '?select=_taskClass["Case"]endStatus[null]':
          return endStatus === null
        case '?select=_taskClass["Case"]endStatus["Архив"]':
          return endStatus === 'Архив'
        case '?select=_taskClass["Case"]endStatus["Отказ"]':
          return endStatus === 'Отказ'
        default:
          return true
      }
    }

    return [
      <Helmet key="head">
        <title>Дела</title>
      </Helmet>,
      <Route
        exact
        key="list"
        path={`/${alias}`}
        render={() => (
          <Content
            header={[
              <Dropdown
                overlay={menu}
                trigger={['click']}
                placement="bottomRight"
              >
                <Button
                  type="primary"
                  icon="folder-add"
                  size="small"
                  children="Создать дело"
                />
              </Dropdown>,
              <TaskModal
                visible={visibleCreateCaseModal}
                type={createCaseType}
                onOk={this.handleCreateCase}
                onCancel={hideModal}
                okText="Создать"
                title="Создание нового дела"
              />,
              <Input
                style={{ margin: '10px 0 10px 10px' }}
                size="small"
                placeholder=" Поиск"
              />
            ]}
            key="content"
          >
            {loading ? (
              <OverlayLoader backgroundOpacity={0.7} />
            ) : (
              <List
                alias={alias}
                history={history}
                selectRow={selectRow}
                selected={selected}
                data={data.filter(filterData)}
                entities={entities}
              />
            )}
          </Content>
        )}
      />,
      <Route
        key="card"
        path={`/${alias}/:id`}
        render={() => (
          <TaskCard
            alias={alias}
            history={history}
            selected={selected}
            entities={entities}
          />
        )}
        exact
      />
    ]
  }
}

export default connect(
  state => ({
    sections: sectionsSelector(state),
    loading: loadingSelector(state),
    entities: entitiesSelector(state),
    selected: selectedSelector(state),
    data: dataSelector(alias)(state),
    // for add-case button rerendering
    caseSchemeList: caseSchemeListSelector(state),
    // for create case
    visibleCreateCaseModal: state[modals].modalType === createCaseType,
    modalProps: state[modals].modalProps
  }),
  {
    fetchAll,
    selectRow,
    createTask,
    showModal,
    hideModal,
    fetchAllSchemes
  }
)(Cases)
