import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerMiddleware, routerReducer as router } from 'react-router-redux'
import createBrowserHistory from 'history/createBrowserHistory'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import { all } from 'redux-saga/effects'
import modules from './modules'

const getReducersAndSagas = modules =>
  Object.keys(modules).reduce(
    (acc, name) => {
      const reducer = modules[name].default
      const saga = modules[name].saga
      if (reducer && typeof reducer === 'function') {
        acc.reducers[name] = reducer
      }
      if (saga && typeof saga === 'function') {
        acc.sagas[name] = saga()
      }
      return acc
    },
    { reducers: {}, sagas: {} }
  )

export const browserHistory = createBrowserHistory()

const { reducers, sagas } = getReducersAndSagas(modules)

const rootReducer = combineReducers({ router, ...reducers })

const sagaMiddleware = createSagaMiddleware()
let middlewares = [sagaMiddleware, routerMiddleware(browserHistory)]

if (process.env.NODE_ENV !== 'production') {
  middlewares = [
    ...middlewares,
    createLogger({
      collapsed: true
    })
  ]
}

function* rootSaga() {
  yield all(sagas)
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)))

sagaMiddleware.run(rootSaga)

export default store
