import React from 'react'
import { connect } from 'react-redux'
import { Button, Tabs } from 'antd'
import { Route, withRouter } from 'react-router-dom'

import Content from '../layout/Content'
import Dates from './Dates'
import { editScheme, fetchAll } from '../../modules/schemes'
import OverlayLoader from '../layout/OverlayLoader'
import KeyValueTable from './KeyValueTable'
import SchemeForm from './SchemeForm'
import Status from './Status'
import CaseSchemeList from './CaseSchemeList'

const css = {
  // wrapper: {
  //   display: 'flex'
  // }
  header: {
    display: 'flex',
    width: '100%',
    padding: '10px 0',
    justifyContent: 'space-between'
  },
  caseScheme: {
    display: 'flex',
    justifyContent: 'space-between',
    height: 40,
    margin: 20,
    alignItems: 'center',
    padding: 10
  }
}

class SchemeCard extends React.PureComponent {
  componentDidMount() {
    this.props.fetchAll(
      `/scheme?select=_caseSchemaId['${this.props.schemeId}']`
    )
  }

  render() {
    const {
      match,
      history,
      entities,
      alias,
      meta,
      schemeId,
      ...props
    } = this.props
    const record = entities[match.params.id] || {}
    const filteredSchemes = Object.values(entities).filter(
      schema =>
        schema._caseSchemaId === schemeId && schema._caseSchemaId !== schema._id
    )

    return (
      <Content
        header={this.renderHeader(record, entities, alias, match, history)}
        footer={this.renderFooter(match)}
      >
        <div style={css.caseScheme}>
          <h2>{record._caseSchemaTitle}</h2>
          <Status record={record} />
        </div>
        {this.renderChildrenTasks(filteredSchemes, entities)}
      </Content>
    )
  }

  renderChildrenTasks(childTasks, entities, history) {
    const sections = [...new Set(childTasks.map(task => task._setTitle))]

    return sections.map(name => (
      <div
        style={{
          padding: 10
        }}
      >
        <h4>Раздел &laquo;{name}&raquo;:</h4>
      </div>
    ))
  }

  renderHeader(record, entities, alias, match, history) {
    return (
      <div style={css.header}>
        <div>
          {/* <Button
            style={{ marginRight: 10 }}
            type="dashed"
            size="small"
            icon="left-circle-o"
            // children="Назад"
            onClick={() => history.goBack()}
          /> */}
          <strong>{record._caseSchemaTitle}</strong> <Dates record={record} />
        </div>
        <div
          style={{
            textAlign: 'right'
          }}
        >
          <Route
            path={match.url}
            exact
            render={() =>
              record._caseSchemaTitle ? null : (
                <Button
                  type="dashed"
                  size="small"
                  icon="edit"
                  onClick={() => history.push(match.url + '/edit')}
                />
              )
            }
          />
        </div>
      </div>
    )
  }

  renderFooter(match) {
    return (
      <Route
        path={match.url + '/edit'}
        render={() => (
          <div style={{ width: '100%', textAlign: 'right' }}>
            <Button
              size="small"
              style={{ marginRight: 10 }}
              children="Отмена"
            />
            <Button size="small" type="primary" children="Сохранить" />
          </div>
        )}
      />
    )
  }
}

export default withRouter(
  connect(state => ({}), { editScheme, fetchAll })(SchemeCard)
)
