import React, { PureComponent } from 'react'
import { DatePicker as AntdDatePicker } from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'

class DatePicker extends PureComponent {
  render() {
    const { value, onChange, ...rest } = this.props
    return <AntdDatePicker
      onChange={this.onChange}
      format='DD MM YYYY'
      value={this.props.value && moment(this.props.value)}
      {...rest}
    />
  }

  onChange = (date) => {
    const value = date ? date.valueOf() : date
    this.props.onChange(value)
  }
}

export default DatePicker

DatePicker.propTypes = {
  onChange: PropTypes.func
}