import React from 'react'
import css from 'dom-css'
import { Scrollbars } from 'react-custom-scrollbars'

export class ShadowScrollbars extends React.PureComponent {
  state = {
    scrollTop: 0,
    scrollHeight: 0,
    clientHeight: 0
  }

  handleUpdate = values => {
    const { shadowTop, shadowBottom } = this.refs
    const { scrollTop, scrollHeight, clientHeight } = values
    const shadowTopOpacity = 1 / 20 * Math.min(scrollTop, 20)
    const bottomScrollTop = scrollHeight - clientHeight
    const shadowBottomOpacity =
      1 / 20 * (bottomScrollTop - Math.max(scrollTop, bottomScrollTop - 20))
    css(shadowTop, { opacity: shadowTopOpacity })
    css(shadowBottom, { opacity: shadowBottomOpacity })
  }

  render() {
    const { style, ...props } = this.props
    const containerStyle = {
      ...style,
      position: 'relative',
      height: '100%'
    }
    const shadowTopStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 4,
      background:
        'linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%)'
    }
    const shadowBottomStyle = {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 2,
      background:
        'linear-gradient(to top, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 100%)'
    }
    return (
      <div style={containerStyle}>
        <Scrollbars ref="scrollbars" onUpdate={this.handleUpdate} {...props} />
        <div ref="shadowTop" style={shadowTopStyle} />
        <div ref="shadowBottom" style={shadowBottomStyle} />
      </div>
    )
  }
}

export default ShadowScrollbars
