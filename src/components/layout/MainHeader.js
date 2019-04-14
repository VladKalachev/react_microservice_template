import React from 'react'
import { Menu, Icon, Avatar, Badge, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import { browserHistory } from '../../redux'
import {
  name as appName,
  description as appDescription
} from '../../../package.json'

const css = {
  layout: {
    display: 'flex',
    height: '100%',
    alignItems: 'center'
  },
  logo: {
    width: 210
  },
  logoImage: {
    maxHeight: '100%',
    maxWidth: 84,
    marginRight: 20,
    transform: 'scale(0.8)'
  },
  content: {
    width: 'calc(100% - 210px - 300px)'
  },
  user: {
    width: 300
  },
  userMenuTrigger: {
    float: 'right',
    cursor: 'pointer',
    // opacity: 0.7,
    transition: 'opacity 0.3s'
  },
  userMenuCaret: {
    marginLeft: 4,
    transform: 'scale(0.8)'
  }
}

function MainHeader({ children, height }) {
  const onMenuClick = ({ item, key, keyPath }) => browserHistory.push(key)

  const menu = (
    <Menu onClick={onMenuClick}>
      <Menu.Item key="/profile">Профиль</Menu.Item>
      <Menu.Item key="/settings">Настройки</Menu.Item>
      <Menu.Item key="/help">Помощь</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="/auth/logout">Выход</Menu.Item>
    </Menu>
  )

  return (
    <div style={css.layout}>
      <div style={css.logo}>
        <Link to="/">
         <a href={appDescription}>Logo</a>
        </Link>
      </div>
      <div style={css.content}>{children}</div>
      <div style={css.user}>
        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
          <span style={css.userMenuTrigger}>
            <Badge dot>
              <Avatar size="small" icon="user" />
            </Badge>
            <Icon style={css.userMenuCaret} type="down" />
          </span>
        </Dropdown>
      </div>
    </div>
  )
}

export default MainHeader
