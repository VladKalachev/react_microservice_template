import React from 'react'
import { version } from '../../../package.json'
import { name as appName } from '../../../package.json'

let css = {
  wrapper: {
    display: 'flex'
  },
  content: {
    width: '100%'
  },
  right: {
    width: 300,
    textAlign: 'right'
  },
  link: {
    marginLeft: 4
  },
  image: {
    height: 36
  }
}

function MainFooter({ children, height }) {
  css.wrapper = {
    ...css.wrapper,
    lineHeight: height + 'px',
    height
  }

  return (
    <div style={css.wrapper}>
      <div style={css.content}>{children}</div>
      <div style={css.right}>
        <small>
          {appName} <strong>{version}</strong> &mdash;
        </small>
        <a style={css.link} href="http://ursip.ru">
         Logo
        </a>
      </div>
    </div>
  )
}

export default MainFooter
