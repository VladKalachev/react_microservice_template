import { createSelector } from 'reselect'
import { all, put, call, takeEvery } from 'redux-saga/effects'
import * as service from '../services/waterflow'
import { name as appName } from '../../package.json'
import { dataToEntities } from '../utils'
import { goBack, push } from 'react-router-redux'

export const namespace = 'tasks'

const prefix = `${appName}/${namespace}`

/* types */
export const FETCH_REQUEST = `${prefix}/FETCH_REQUEST`
export const FETCH_SUCCESS = `${prefix}/FETCH_REQUEST`
export const FETCH_ERROR = `${prefix}/FETCH_REQUEST`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`
export const FETCH_ALL_ERROR = `${prefix}/FETCH_ALL_ERROR`

export const FETCH_CASE_WITH_TASKS_REQUEST = `${prefix}/FETCH_CASE_WITH_TASKS_REQUEST`
export const FETCH_CASE_WITH_TASKS_SUCCESS = `${prefix}/FETCH_CASE_WITH_TASKS_SUCCESS`
export const FETCH_CASE_WITH_TASKS_ERROR = `${prefix}/FETCH_CASE_WITH_TASKS_ERROR`

export const CREATE_TASK_REQUEST = `${prefix}/CREATE_TASK_REQUEST`
export const CREATE_TASK_SUCCESS = `${prefix}/CREATE_TASK_SUCCESS`
export const CREATE_TASK_ERROR = `${prefix}/CREATE_TASK_ERROR`

export const FETCH_EDIT_TASK_REQUEST = `${prefix}/FETCH_EDIT_TASK_REQUEST`
export const FETCH_EDIT_TASK_SUCCESS = `${prefix}/FETCH_EDIT_TASK_SUCCESS`
export const FETCH_EDIT_TASK_ERROR = `${prefix}/FETCH_EDIT_TASK_ERROR`

export const SELECT = `${prefix}/SELECT_ROW`

/* initial state */
const inititalState = {
  entities: {},
  selected: null,
  sections: [],
  tree: [],
  loading: false
}

/* reducer */
export default function reducer(state = inititalState, { type, payload }) {
  switch (type) {
    case FETCH_ALL_REQUEST:
    case FETCH_CASE_WITH_TASKS_REQUEST:
    case CREATE_TASK_REQUEST:
      return { ...state, selected: null, loading: true }

    case FETCH_ALL_ERROR:
    case FETCH_CASE_WITH_TASKS_ERROR:
    case CREATE_TASK_ERROR:
      return { ...state, loading: false }

    case FETCH_ALL_SUCCESS:
    case FETCH_CASE_WITH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        entities: {
          ...state.entities,
          ...dataToEntities('_id', payload.response)
        }
      }

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        entities: {
          ...state.entities,
          ...dataToEntities('_id', payload.response)
        },
        loading: false
      }

    case SELECT:
      return {
        ...state,
        selected: state.selected !== payload.id ? payload.id : null
      }

    default:
      return state
  }
}

/* reselect selectors */
export const stateSelector = state => state[namespace]
export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
)

export const entitiesSelector = createSelector(
  stateSelector,
  state => state.entities
)

export const selectedSelector = createSelector(
  stateSelector,
  state => state.selected
)

export const dataSelector = alias =>
  createSelector(entitiesSelector, entities =>
    Object.values(entities)
      .filter(({ _taskClass }) => {
        switch (alias) {
          case 'cases':
            return _taskClass === 'Case'
          case 'tasks':
            return _taskClass !== 'Case'
          default:
            return false
        }
      })
      .sort((a, b) => b._creationDate - a._creationDate)
  )

export const sectionsSelector = createSelector(dataSelector, tasks => [
  // ...new Set(tasks.map(task => task._setTitle))
])

/* external action creators */
export function fetchAll(queryString) {
  return {
    type: FETCH_ALL_REQUEST,
    payload: {
      queryString
    }
  }
}

export function fetchCaseWithTasks(id) {
  return {
    type: FETCH_CASE_WITH_TASKS_REQUEST,
    payload: {
      id
    }
  }
}

export function createTask(data) {
  return {
    type: CREATE_TASK_REQUEST,
    payload: {
      data
    }
  }
}

export function fetchEditTask(id, data, callback) {
  return {
    type: FETCH_EDIT_TASK_REQUEST,
    payload: {
      id,
      data,
      callback
    }
  }
}

export function fetch(id) {
  return {
    type: FETCH_REQUEST,
    payload: {
      id
    }
  }
}

export function selectRow(id) {
  return {
    type: SELECT,
    payload: {
      id
    }
  }
}

/* sagas */
export const fetchAllSaga = function*({ payload: { queryString } }) {
  try {
    const response = yield call(service.fetchAll, queryString)

    // const response = mockData

    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: { response }
    })
  } catch (error) {
    yield put({
      type: FETCH_ALL_ERROR,
      error
    })
  }
}

export const fetchCaseWithTasksSaga = function*({ payload: { id } }) {
  try {
    const response = yield call(service.fetchCaseWithTasks, id)

    yield put({
      type: FETCH_CASE_WITH_TASKS_SUCCESS,
      payload: { response }
    })
  } catch (error) {
    yield put({
      type: FETCH_CASE_WITH_TASKS_ERROR,
      error
    })
  }
}

export const createTaskSaga = function*({ payload: { data } }) {
  try {
    const response = yield call(service.createTask, data)

    // const response = mockData

    yield put({
      type: CREATE_TASK_SUCCESS,
      payload: { response }
    })

    yield put(push('/cases'))
  } catch (error) {
    yield put({
      type: CREATE_TASK_ERROR,
      error
    })
  }
}

export const fetchEditTaskSaga = function*({ payload }) {
  try {
    const response = yield call(service.fetchEditTask, payload)

    yield put({
      type: FETCH_EDIT_TASK_SUCCESS,
      payload: { response }
    })
    payload.callback(response)
    yield put(fetchAll('/tasks'))
    // yield put(goBack())
  } catch (error) {
    yield put({
      type: FETCH_EDIT_TASK_ERROR,
      error
    })
  }
}

export const fetchSaga = function*({ payload: { id } }) {
  try {
    const data = yield call(service.fetchById, id)

    yield put({
      type: FETCH_SUCCESS,
      payload: data
    })
  } catch (error) {
    yield put({
      type: FETCH_ERROR,
      error
    })
  }
}

export const saga = function*() {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(FETCH_REQUEST, fetchSaga),
    takeEvery(CREATE_TASK_REQUEST, createTaskSaga),
    takeEvery(FETCH_CASE_WITH_TASKS_REQUEST, fetchCaseWithTasksSaga),
    takeEvery(FETCH_EDIT_TASK_REQUEST, fetchEditTaskSaga)
  ])
}
