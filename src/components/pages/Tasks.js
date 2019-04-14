import React from 'react'
import { Helmet } from 'react-helmet'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Input, Pagination } from 'antd'

import Menu from '../common/Menu'
import PreviewCard from '../tasks/PreviewCard'
import Content from '../layout/Content'
import Sidebar from '../layout/Sidebar'
import List from '../tasks/List'
import TaskCard from '../tasks/TaskCard'
import OverlayLoader from '../layout/OverlayLoader'

import {
  loadingSelector,
  selectedSelector,
  dataSelector,
  sectionsSelector,
  fetchAll,
  selectRow,
  entitiesSelector
} from '../../modules/tasks'

const alias = 'tasks'

class Tasks extends React.PureComponent {
  componentDidMount() {
    const { location: { search } } = this.props

    const filter =
      alias === 'tasks' &&
      (search ? `/tasks${search}` : '/tasks?filters=_taskClass[!=Case]')

    this.props.fetchAll(filter)
  }

  componentWillReceiveProps(nextProps) {
    const { location: { search, pathname } } = this.props
    const {
      location: { search: nextSearch, pathname: nextPathname }
    } = nextProps

    if (search !== nextSearch || pathname !== nextPathname) {
      const filter = nextSearch
        ? `/tasks${nextSearch}`
        : '/tasks?filters=_taskClass[!=Case]'
      this.props.fetchAll(filter)
    }
  }

  render() {
    const {
      match,
      sections,
      loading,
      selectRow,
      selected,
      history,
      data,
      entities
    } = this.props

    return [
      <Helmet key="head">
        <title>Мои задачи</title>
      </Helmet>,
      <Route
        exact
        key="list"
        path={`/${alias}`}
        render={() => (
          <Content
            header={<Input size="small" placeholder=" Поиск" />}
            key="content"
          >
            {loading ? (
              <OverlayLoader backgroundOpacity={0.7} />
            ) : (
              <List
                entities={entities}
                history={history}
                selectRow={selectRow}
                selected={selected}
                data={data}
              />
            )}
          </Content>
        )}
      />,
      <Route
        key="previewCard"
        path={`/${alias}`}
        render={() =>
          selected && (
            <Sidebar
              key="sidebar"
              id="rightSidebar"
              right
              width={400}
              header="Карточка задачи"
            >
              <PreviewCard
                history={history}
                selected={selected}
                entities={entities}
                alias={alias}
              />
            </Sidebar>
          )
        }
        exact
      />,
      <Route
        key="card"
        path={`/${alias}/:id`}
        render={() => (
          <TaskCard alias={alias} history={history} selected={selected} />
        )}
      />
    ]
  }
}

export default connect(
  state => ({
    sections: sectionsSelector(state),
    loading: loadingSelector(state),
    selected: selectedSelector(state),
    data: dataSelector(alias)(state),
    entities: entitiesSelector(state)
  }),
  {
    fetchAll,
    selectRow
  }
)(Tasks)
