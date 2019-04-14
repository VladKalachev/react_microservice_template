import React from 'react'
import { connect } from 'react-redux'
import { Menu as AntMenu, Icon } from 'antd'
import { NavLink, withRouter } from 'react-router-dom'
import * as css from './Menu.module.css'

const menuItems = [
  {
    name: 'Мои дела',
    routePath: '/cases',
    children: [
      {
        routePath: '/cases',
        name: 'Все'
      },
      {
        routePath: '/cases?select=_taskClass["Case"]endStatus[null]',
        name: 'В работе'
      },
      {
        routePath: '/cases?select=_taskClass["Case"]endStatus["Архив"]',
        name: 'Архив'
      },
      {
        routePath: '/cases?select=_taskClass["Case"]endStatus["Отказ"]',
        name: 'Отказ'
      }
    ]
  },
  {
    routePath: '/schemes',
    name: 'Мои шаблоны',
    children: [
      {
        routePath: '/schemes',
        name: 'Все'
      },
      {
        routePath: '/schemes?select=_isArchived[false]',
        name: 'Рабочие'
      },
      {
        routePath: '/schemes?select=_isArchived[true]',
        name: 'Архивные'
      }
    ]
  }
  // {
  //   name: 'Мои задачи',
  //   routePath: '/tasks',
  //   children: [
  //     {
  //       routePath: '/tasks',
  //       name: 'Все'
  //     },
  //     {
  //       routePath:
  //         '/tasks?select=_dateFinish[null]&&filters=_taskClass[!=Case]',
  //       name: 'В работе'
  //     },
  //     {
  //       routePath: '/tasks?filters=_taskClass[!=Case]_dateFinish[!=null]',
  //       name: 'Выполнено'
  //     }
  //   ]
  // }
]

const { Item, SubMenu } = AntMenu

function Menu({ pathname, location: { search }, ...rest }) {
  return (
    <AntMenu
      className={css.menu}
      mode="inline"
      selectedKeys={[pathname + search]}
      defaultOpenKeys={['/cases']}
    >
      {menuItems.map(getMenuItem)}
    </AntMenu>
  )
}

function getMenuItem(item) {
  if (item.children) return getSubmenu(item)
  else {
    const { icon, routePath, name } = item
    return (
      <Item key={routePath}>
        <NavLink to={routePath}>
          {icon && <Icon type={icon} />}
          <span>{name}</span>
        </NavLink>
      </Item>
    )
  }
}

function getSubmenu({ icon, routePath, name, children }) {
  return (
    <AntMenu.SubMenu
      key={routePath}
      title={
        <span>
          {icon && <Icon type={icon} />} {name}
        </span>
      }
    >
      {children.map(getMenuItem)}
    </AntMenu.SubMenu>
  )
}

export default withRouter(
  connect(state => ({
    pathname: state.router.location.pathname,
    // for menu rerendering
    sidebar: state.sidebar
  }))(Menu)
)
