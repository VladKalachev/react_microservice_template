import React from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd'
import ShadowScrollbars from './ShadowScrollbars'
import { collapsedSelector, toggle } from '../../modules/sidebar'
import * as styles from './Sidebar.module.css'

const css = {
  sidebar: {
    background: '#fff',
    overflowY: 'auto',
    borderRadius: '3px',
    overflow: 'hidden',
    boxShadow: '1px 1px 5px 0px rgba(0, 0, 0, 0.15)'
  },
  inner: {
    height: '100%',
    background: '#fff'
  },
  header: {
    background: '#fff',
    height: 40,
    lineHeight: '40px',
    padding: '0 10px',
    borderBottom: '1px dotted #ebebeb'
  },
  scrollbar: {},
  footer: {
    background: '#fff',
    height: 40,
    lineHeight: '40px',
    padding: '0 10px',
    borderTop: '1px dotted #ebebeb'
  }
}

export function Sidebar({
  id = 'sidebar',
  collapsed,
  left,
  right,
  // collapsible,
  toggle,
  children,
  header,
  footer,
  ...props
}) {
  let classes = [styles.sidebar]

  if (left) {
    classes.push(styles.left)
  }

  if (right) {
    classes.push(styles.right)
  }

  return (
    <Layout.Sider
      className={classes.join(' ')}
      style={css.sidebar}
      collapsed={collapsed.includes(id)}
      onCollapse={() => toggle(id)}
      {...props}
    >
      <Layout style={css.inner}>
        {header && <Layout.Header style={css.header} children={header} />}
        <ShadowScrollbars style={css.scrollbar} children={children} />
        {footer && <Layout.Footer style={css.footer} children={footer} />}
      </Layout>
    </Layout.Sider>
  )
}

export default connect(state => collapsedSelector(state), {
  toggle
})(Sidebar)
