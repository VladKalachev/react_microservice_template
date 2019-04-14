import React from 'react'
import { Tag, Tooltip } from 'antd'

// TODO: Кто-нибудь запилите склонение слова "день"
function getSchemeStatus(isArchived) {
  switch (isArchived) {
    case false: {
      return {
        id: 'active',
        color: 'blue',
        message: 'В работе'
      }
    }

    default:
      return {
        id: 'archived',
        color: 'green',
        message: 'В архиве'
      }
  }
}

function getStatusTooltip({ id, message, color }) {
  return (
    <Tooltip placement="top">
      <Tag color={color}>{message}</Tag>
    </Tooltip>
  )
}

function Status({ record }) {
  if (record._isArchived === undefined) {
    return null
  }

  return getStatusTooltip(getSchemeStatus(record._isArchived))
}

export default Status
