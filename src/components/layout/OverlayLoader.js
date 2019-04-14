import React from 'react'
import { Progress as AntProgress, Icon } from 'antd'
import * as theme from '../../theme'
export default function OverlayLoader({
  percent,
  message,
  backgroundOpacity = 1
}) {
  const css = {
    overlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      height: '100%',
      backgroundColor: `rgba(255, 255, 255, ${backgroundOpacity})`,
      zIndex: 800,
      overflow: 'hidden'
    },
    loader: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    message: {
      fontSize: '0.6em',
      lineHeight: '1em',
      padding: '0 10px'
    },
    percent: {
      display: 'block',
      marginTop: 7
    }
  }

  const getLoader = function() {
    if (percent > 0) {
      return (
        <AntProgress
          style={css.loader}
          type="circle"
          status="active"
          percent={percent}
          format={percent => (
            <div style={css.message}>
              {message}
              {percent < 100 && <strong style={css.percent}>{percent}%</strong>}
            </div>
          )}
        />
      )
    } else {
      return (
        <Icon
          type="loading"
          style={{
            ...css.loader,
            color: theme['@primary-color'],
            transform: 'scale(4,4) translate(-15%, -15%)'
          }}
        />
      )
    }
  }

  return <div style={css.overlay}>{getLoader()}</div>
}
