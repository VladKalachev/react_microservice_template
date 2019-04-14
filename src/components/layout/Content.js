import React from 'react'
import { Layout } from 'antd'
import ShadowScrollbars from './ShadowScrollbars'

const css = {
  layout: {
    background: '#fff',
    borderRadius: 3,
    boxShadow: '1px 1px 5px 0px rgba(0, 0, 0, 0.15)'
  },
  header: {
    background: '#fff',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    paddingTop: 'initial',
    lineHeight: 'normal',
    paddingBottom: 'initial',
    borderBottom: '1px dotted #ebebeb'
  },
  scrollbar: {
    // padding: 5
  },
  footer: {
    background: '#fff',
    height: 40,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
    paddingRight: '10px',
    paddingTop: 'initial',
    paddingBottom: 'initial',
    borderTop: '1px dotted #ebebeb'
  }
}

export default function Content({ header, children, footer, ...props }) {
  return (
    <Layout style={css.layout} {...props}>
      {header && <Layout.Header style={css.header} children={header} />}
      <ShadowScrollbars style={css.scrollbar} children={children} />
      {footer && <Layout.Footer style={css.footer} children={footer} />}
    </Layout>
  )
}
