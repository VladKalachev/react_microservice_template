import React from 'react'
import { Helmet } from 'react-helmet'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Input, Pagination, Button } from 'antd'

import Menu from '../common/Menu'
import Sidebar from '../layout/Sidebar'
import Content from '../layout/Content'
import List from '../schemes/List'
import SchemeCard from '../schemes/SchemeCard'
import OverlayLoader from '../layout/OverlayLoader'
import Modal from '../schemes/Modal'

import {
  loadingSelector,
  schemeListSelector,
  caseSchemeListSelector,
  selectedSelector,
  fetchAll,
  selectCaseSchemeRow,
  createNewScheme,
  searchScheme
} from '../../modules/schemes'

const alias = 'schemes'

class Schemes extends React.PureComponent {
  state = {
    modalVisible: false,
    searchText: ''
  }

  componentDidMount() {
    const { location: { search } } = this.props

    const queryString =
      alias === 'schemes' &&
      (search ? `/scheme${search}` : "/scheme?select=_taskClass['Case']")
    this.props.fetchAll(queryString)
  }

  componentWillReceiveProps(nextProps) {
    const { location: { search, pathname } } = this.props
    const {
      location: { search: nextSearch, pathname: nextPathname }
    } = nextProps

    if (search !== nextSearch || pathname !== nextPathname) {
      const filter = nextSearch
        ? `/scheme${nextSearch}`
        : "/scheme?select=_taskClass['Case']"
      this.props.fetchAll(filter)
    }
  }

  render() {
    const {
      loading,
      selectCaseSchemeRow,
      selected,
      history,
      schemeList,
      caseSchemeList
    } = this.props

    return [
      <Helmet key="head">
        <title>Шаблоны</title>
      </Helmet>,
      <Route
        key="schemes"
        exact
        path={`/${alias}`}
        render={() => (
          <Content
            header={[
              <Button
                type="primary"
                size="small"
                icon="folder-add"
                children="Создать шаблон"
                onClick={() => this.setState({ modalVisible: true })}
              />,
              <Modal
                visible={this.state.modalVisible}
                onOk={value => {
                  this.props.createNewScheme(value.schemaName)
                  this.setState({ modalVisible: false })
                }}
                onCancel={() => this.setState({ modalVisible: false })}
                okText="Создать"
                title="Создание нового шаблона"
              />,
              <Input
                style={{ margin: '10px 0 10px 10px' }}
                size="small"
                placeholder=" Поиск"
                value={this.state.searchText}
                onChange={event =>
                  this.setState({ searchText: event.target.value })
                }
                onPressEnter={event =>
                  this.props.searchScheme(
                    event.target.value,
                    this.props.location.search
                  )
                }
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
                selectRow={selectCaseSchemeRow}
                selected={selected}
                data={caseSchemeList}
                rowNameKey="_caseSchemaTitle"
                clickableRow
              />
            )}
          </Content>
        )}
      />,
      <Route
        key="card"
        path={`/${alias}/:id`}
        render={({ match }) => (
          <SchemeCard
            schemeId={match.params.id}
            alias={alias}
            history={history}
            selected={selected}
            entities={schemeList}
            selectRow={selectCaseSchemeRow}
          />
        )}
      />
    ]
  }
}

export default connect(
  state => ({
    loading: loadingSelector(state),
    schemeList: schemeListSelector(state),
    caseSchemeList: caseSchemeListSelector(state),
    selected: selectedSelector(state)
  }),
  { fetchAll, selectCaseSchemeRow, createNewScheme, searchScheme }
)(Schemes)
