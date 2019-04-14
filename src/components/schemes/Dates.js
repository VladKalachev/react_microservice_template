import React from 'react'
import { Popover, InputNumber } from 'antd'
import moment from 'moment'

function Dates({ record = {}, ...props }) {
  const { _reminder, _duration, _dateStart } = record
  // seconds * minutes * hours * milliseconds = 1 day
  const start = new Date(_dateStart || Date.now())
  const finish = start.setDate(start.getDate() + Number(_duration) || 0)

  const content = (
    <table>
      <tr>
        <td style={{ textAlign: 'right', paddingRight: 10 }}>
          Длительность задачи
        </td>
        <td>
          <InputNumber
            size="small"
            defaultValue={Number(_duration)}
            min={0}
            max={100}
          />{' '}
          дней
        </td>
      </tr>
      <tr>
        <td style={{ textAlign: 'right', paddingRight: 10 }}>
          Напомнить мне за
        </td>
        <td>
          <InputNumber
            size="small"
            defaultValue={Number(_reminder)}
            min={0}
            max={100}
          />{' '}
          дней
        </td>
      </tr>
    </table>
  )

  return (
    <Popover content={content} position="left" title="Настройки">
      {_dateStart && (
        <small style={{ cursor: 'help' }}>
          с {moment(_dateStart).format('DD MM YYYY')} по{' '}
          {moment(finish).format('DD MM YYYY')}
        </small>
      )}
    </Popover>
  )
}

export default Dates
