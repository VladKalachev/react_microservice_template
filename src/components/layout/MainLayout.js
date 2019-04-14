import React from 'react'
import { ConnectedRouter } from 'react-router-redux'
import { Route, Switch } from 'react-router-dom'
import { Button } from 'antd'
import { Layout } from 'antd'

import { name as appName } from '../../../package.json'

import MainHeader from './MainHeader'
import MainFooter from './MainFooter'

import './MainLayoutResponsive.css'

let css = {
  layout: {
    height: '100%'
  },
  header: {
    height: 60,
    background: 'transparent',
    lineHeight: 'normal'
  },
  content: {
    height: '100%'
  },
  footer: {
    height: 60,
    paddingTop: 0,
    paddingBottom: 0
  }
}

function MainLayout({ header, children, footer }) {
  return (
    <Layout style={css.layout}>
      <Layout.Header style={css.header}>
        <MainHeader height={css.header.height} children={header} />
      </Layout.Header>
      <Layout style={css.content}>{children}</Layout>
      <Layout.Footer style={css.footer}>
        <MainFooter height={css.footer.height} children={footer} />
      </Layout.Footer>
    </Layout>
  )
}

export default MainLayout
