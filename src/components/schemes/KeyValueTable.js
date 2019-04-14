import React from 'react'
import { Table } from 'antd'
import * as css from './KeyValueTable.module.css'

const columns = [
  {
    title: 'Название',
    dataIndex: 'name',
    key: 'name',
    className: css.nameColumn,
    render: text => (
      <div style={{ wordBreak: 'break-word' }} title={String(text)}>
        <strong>{text}</strong>
      </div>
    )
  },
  {
    title: 'Значение',
    dataIndex: 'value',
    key: 'value',
    className: css.valueColumn,
    render: text => (
      <div style={{ textAlign: text ? 'left' : 'center' }} title={String(text)}>
        {text || <i>&mdash;</i>}
      </div>
    )
  }
]

function KeyValueTable({ data, ...props }) {
  return (
    <Table
      style={{
        padding: 10
      }}
      rowKey="name"
      showHeader={false}
      columns={columns}
      dataSource={data}
      pagination={false}
      size="small"
    />
  )
}

export default KeyValueTable
