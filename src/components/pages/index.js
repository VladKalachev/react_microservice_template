import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Layout } from 'antd'
import { name as appName } from '../../../package.json'
import MainLayout from '../layout/MainLayout'
import Menu from '../common/Menu'
import Sidebar from '../layout/Sidebar'

import Home from './Home'
import Cases from './Cases'
import Tasks from './Tasks'
import Schemes from './Schemes'
import NoMatch from './NoMatch'

export const menuItems = [
  {
    icon: 'book',
    routePath: '/cases',
    name: 'Мои дела'
  },
  {
    icon: 'book',
    routePath: '/schemes',
    name: 'schemes'
  },
  {
    icon: 'folder',
    routePath: '/Example',
    name: 'example'
  },
  {
    icon: 'book',
    name: 'Мои задачи',
    children: [
      {
        routePath: '/tasks',
        name: 'Все'
      },
      {
        routePath:
          '/tasks?select=_dateStart["null"]_dateFinish["null"]&&filters=_taskClass[!=Case]',
        name: 'В ожидании'
      },
      {
        routePath:
          '/tasks?select=_dateFinish["null"]&&filters=_taskClass[!=Case]_dateStart[!=null]',
        name: 'Открыта'
      },
      {
        routePath:
          '/tasks?select=_dateStart["null"]&&filters=_taskClass[!=Case]_dateFinish[!=null]',
        name: 'Закрыта'
      }
    ]
  }
]

function getHeaderRoutes() {
  return (
    <Switch>
      <Route path="/" render={() => 'header'} />
    </Switch>
  )
}

function getFooterRoutes() {
  return (
    <Switch>
      <Route path="/" render={() => <span>&copy; 2018</span>} />
    </Switch>
  )
}

function Root() {
  return [
    <Helmet key="head">
      <title>{appName}</title>
    </Helmet>,
    <MainLayout
      key="mainLayout"
      header={getHeaderRoutes()}
      footer={getFooterRoutes()}
    >
      <Sidebar left>
        <Menu />
      </Sidebar>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/cases" component={Cases} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/schemes" component={Schemes} />
        <Route render={() => <NoMatch />} />
      </Switch>
    </MainLayout>
  ]
}

export default Root
