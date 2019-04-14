import React from 'react'
import { Popover, InputNumber } from 'antd'
import moment from 'moment'

function Dates({ record = {}, ...props }) {
  const { _reminder, _duration, _dateStart, _dateFinish } = record
  // seconds * minutes * hours * milliseconds = 1 day
  const day = 60 * 60 * 24 * 1000

  // const start = new Date(_dateStart || Date.now())
  // const finish = start.setDate(start.getDate() + Number(_duration) || 0)

  const content = (
    <table>
      <tr>
        <td style={{ textAlign: 'right', paddingRight: 10 }}>
          Длительность задачи
        </td>
        <td>
          <InputNumber
            size="small"
            defaultValue={Math.ceil(Number(_duration) / day)}
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
            defaultValue={Math.ceil(Number(_reminder) / day)}
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
          с {moment(_dateStart).format('DD MM YYYY')} {_dateFinish && 'по ' + moment(_dateFinish).format('DD MM YYYY')}
        </small>
      )}
    </Popover>
  )
}

export default Dates
