import React from 'react'
import { Icon, Tag, Tooltip } from 'antd'

// TODO: придумайте адекватное название к этому методу..

function getDay(countDays) {
  if (Math.floor((countDays % 100) / 10) === 1) return `${countDays} дней`
  else {
    switch (countDays % 10) {
      case 1:
        return `${countDays} день`
      case 2:
      case 3:
      case 4:
        return `${countDays} дня`
      default:
        return `${countDays} дней`
    }
  }
}

function getTaskStatus({ _duration, _dateFinish, _dateStart, _reminder }) {
  switch (true) {
    case _dateFinish !== null: {
      return {
        id: 'completed',
        name: 'Завершено',
        color: 'green',
        icon: 'check-circle-o',
        message: getCompletedMessage(_duration, _dateFinish, _dateStart)
      }
    }

    case _dateStart === null:
      return {
        id: 'inactive',
        name: 'Неактивно',
        color: 'grey',
        icon: 'close-circle-o',
        message: 'Дата начала не определена'
      }

    case _dateStart > Date.now(): {
      // seconds * minutes * hours * milliseconds = 1 day
      const day = 60 * 60 * 24 * 1000
      const start = new Date(_dateStart)
      const delta = Math.round((Date.now() - start.getTime()) / day)

      return {
        id: 'awaits',
        name: 'Ожидание',
        color: 'cyan',
        icon: 'clock-circle-o',
        message: `Осталось ${getDay(delta)} до начала`
      }
    }

    default:
      return {
        id: 'active',
        name: 'В работе',
        color: 'blue',
        icon: 'rocket',
        message: getActiveMessage(_duration, _dateStart, _reminder)
      }
  }
}

function getCompletedMessage(duration, dateStart, dateFinish) {
  // seconds * minutes * hours * milliseconds = 1 day
  const day = 60 * 60 * 24 * 1000
  const start = new Date(dateStart)
  const finish = new Date(dateFinish)
  const delta =
    Math.round(Number(duration) / day) -
    Math.round((start.getTime() - finish.getTime()) / day)

  switch (true) {
    case delta === 0:
      return 'Выполнено точно в срок'
    case delta > 0:
      return `C опережением на ${getDay(Math.abs(delta))}`
    case delta < 0:
      return `Cо срывом на ${getDay(Math.abs(delta))}`
  }
}

function getActiveMessage(duration = 0, dateStart, reminder) {
  // seconds * minutes * hours * milliseconds = 1 day
  const day = 60 * 60 * 24 * 1000
  const start = new Date(dateStart)
  const delta =
    Math.round(Number(duration) / day) -
    Math.round((start.getTime() - Date.now()) / day)

  switch (true) {
    case delta === 0:
      return 'Cрок СЕГОДНЯ'

    case delta > 0:
      return `Oсталось ${getDay(Math.abs(delta))}`

    case delta >= reminder:
      return `ВНИМАНИЕ осталось ${getDay(Math.abs(delta))}`

    case delta < 0:
      return `СОРВАНО на ${getDay(Math.abs(delta))}`
  }
}

function getStatusTooltip({ id, name, message, color, icon }) {
  return (
    // <Tooltip
    //   // placement="left"
    //   style={{ display: 'inline' }}
    //   placement="top"
    //   title={name}
    // >
    <Tag color={color}>
      <Icon type={icon} /> {message}
    </Tag>
    // </Tooltip>
  )
}

function Status({ record }) {
  const status = getTaskStatus(record)
  return getStatusTooltip(status)
}

export default Status
