import React from 'react'
import { Icon, Tag } from 'antd'
import { formatDate } from '../../utils'

const css = {
  tag: {
    display: 'inline-block',
    marginRight: 0,
    cursor: 'default'
  }
}

function CaseStatus({ record }) {
  const { _dateFinish, _dateStart, endStatus } = record
  switch (endStatus) {
    case 'Архив':
      return (
        <Tag
          style={css.tag}
          color="green"
          children={`В архиве c ${formatDate(_dateFinish)}`}
        />
      )
    case 'Отказ':
      return (
        <Tag
          style={css.tag}
          color="red"
          children={`Отказано c ${formatDate(_dateStart)}`}
        />
      )

    default:
      return (
        <Tag
          style={css.tag}
          color="blue"
          children={`В работе c ${formatDate(_dateStart)}`}
        />
      )
  }
}

export default CaseStatus
