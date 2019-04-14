import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Row, Col, List } from 'antd'
import Status from './Status'
const { Item } = List

const css = {
  list: {
    minWidth: 700
  },
  header: {
    // 136px - width of action column
    width: 'calc(100% - 136px)',
    padding: '5px 2px 5px 5px'
  },
  title: {
    color: '#409cb3'
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
  name: {
    padding: '0 15px'
  },
  status: {
    padding: '0 15px'
  }
}

class SchemeList extends React.PureComponent {
  renderItem = record => {
    const { selected, rowNameKey, clickableRow, history } = this.props

    css.listItem = {
      ...css.listItem,
      backgroundColor: selected === record._id ? '#DBF2F5' : 'white',
      cursor: clickableRow ? 'pointer' : 'default'
    }

    return (
      <Item
        style={css.listItem}
        onClick={() => history.push(`/schemes/${record._id}`)}
      >
        <Row style={css.itemInner}>
          <Col span={22}>
            <strong>
              <Switch>
                <Route
                  path="/schemes"
                  render={() => (
                    <span style={{ color: this.props.colorTitle || '#409cb3' }}>
                      {record[rowNameKey]}
                    </span>
                  )}
                />
              </Switch>
            </strong>
          </Col>
          <Col span={2}>
            <Status record={record} />
          </Col>
        </Row>
      </Item>
    )
  }

  render() {
    return (
      <List
        style={css.list}
        size="large"
        bordered={false}
        dataSource={this.props.data}
        renderItem={this.renderItem}
        {...this.props}
      />
    )
  }
}

export default SchemeList
