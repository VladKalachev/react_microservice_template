import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { LocaleProvider } from 'antd'
import { ConnectedRouter } from 'react-router-redux'
import { hot } from 'react-hot-loader'
import Ru from 'antd/lib/locale-provider/ru_RU'

import 'moment/locale/ru'

import store, { browserHistory } from './redux'
import Pages from './components/pages'

import './assets/fonts/PTSans/font.css'
import './components/layout/MainLayoutResponsive.css'

const { NODE_ENV } = process.env

function BaseApp() {
  return (
    <Provider store={store}>
      <LocaleProvider locale={Ru}>
        <ConnectedRouter key="app" history={browserHistory}>
          <Pages />
        </ConnectedRouter>
      </LocaleProvider>
    </Provider>
  )
}

const App = NODE_ENV === 'production' ? BaseApp : hot(module)(BaseApp)

render(<BaseApp />, document.getElementById('root'))
