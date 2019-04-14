import { all, put, call, takeEvery } from 'redux-saga/effects'
import * as service from '../services/waterflow'
import { createSelector } from 'reselect'
import { goBack } from 'react-router-redux'
import { name as appName } from '../../package.json'
import { dataToEntities } from '../utils'

export const namespace = 'schemes'
const prefix = `${appName}/${namespace}`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`
export const FETCH_ALL_ERROR = `${prefix}/FETCH_ALL_ERROR`

export const CREATE_NEW_SCHEME_REQUEST = `${prefix}/CREATE_NEW_SCHEME_REQUEST`
export const CREATE_NEW_SCHEME_SUCCESS = `${prefix}/CREATE_NEW_SCHEME_SUCCESS`
export const CREATE_NEW_SCHEME_ERROR = `${prefix}/CREATE_NEW_SCHEME_ERROR`

export const EDIT_SCHEME_REQUEST = `${prefix}/EDIT_SCHEME_REQUEST`
export const EDIT_SCHEME_SUCCESS = `${prefix}/EDIT_SCHEME_SUCCESS`
export const EDIT_SCHEME_ERRROR = `${prefix}/EDIT_SCHEME_ERRROR`

export const DELETE_SCHEME_REQUEST = `${prefix}/DELETE_SCHEME_REQUEST`
export const DELETE_SCHEME_SUCCESS = `${prefix}/DELETE_SCHEME_SUCCESS`
export const DELETE_SCHEME_ERROR = `${prefix}/DELETE_SCHEME_ERROR`

export const SEARCH_SCHEME_REQUEST = `${prefix}/SEARCH_SCHEME_REQUEST`
export const SEARCH_SCHEME_SUCCESS = `${prefix}/SEARCH_SCHEME_SUCCESS`
export const SEARCH_SCHEME_ERROR = `${prefix}/SEARCH_SCHEME_ERROR`

export const SELECT_CASE_SCHEME_ROW_REQUEST = `${prefix}/SELECT_CASE_SCHEME_ROW_REQUEST`
export const SELECT_CASE_SCHEME_ROW_SUCCESS = `${prefix}/SELECT_CASE_SCHEME_ROW_SUCCESS`
export const SELECT_CASE_SCHEME_ROW_ERROR = `${prefix}/SELECT_CASE_SCHEME_ROW_ERROR`

/* initial state */
const initialsState = {
  entities: {},
  selected: null,
  loading: false
}

export default function reducer(state = initialsState, { type, payload }) {
  switch (type) {
    case FETCH_ALL_REQUEST:
      return { ...state, loading: true, selected: null }

    case FETCH_ALL_SUCCESS:
      return {
        ...state,
        entities: dataToEntities('_id', payload.response),
        loading: false
      }

    case FETCH_ALL_ERROR:
      return { ...state, loading: false }

    case CREATE_NEW_SCHEME_REQUEST:
      return { ...state }

    case CREATE_NEW_SCHEME_SUCCESS:
      return {
        ...state,
        entities: { ...state.entities, ...dataToEntities('_id', payload) }
      }

    case CREATE_NEW_SCHEME_ERROR:
      return { ...state }

    case EDIT_SCHEME_REQUEST:
      return { ...state }

    case EDIT_SCHEME_SUCCESS:
      return {
        ...state,
        entities: { ...state.entities, ...dataToEntities('_id', payload) }
      }

    case EDIT_SCHEME_ERRROR:
      return { ...state }

    case DELETE_SCHEME_REQUEST:
      return { ...state }

    case DELETE_SCHEME_SUCCESS:
      return { ...state }

    case DELETE_SCHEME_ERROR:
      return { ...state }

    case SELECT_CASE_SCHEME_ROW_REQUEST:
      return {
        ...state,
        selected: state.selected !== payload.id ? payload.id : null,
        loading: true
      }

    case SELECT_CASE_SCHEME_ROW_SUCCESS:
      return {
        ...state,
        entities: { ...state.entities, ...dataToEntities('_id', payload) },
        loading: false
      }

    case SELECT_CASE_SCHEME_ROW_ERROR:
      return { ...state }

    case SEARCH_SCHEME_REQUEST:
      return { ...state, loading: true, selected: null }

    case SEARCH_SCHEME_SUCCESS:
      return {
        ...state,
        loading: false,
        entities: dataToEntities('_id', payload)
      }

    case SEARCH_SCHEME_ERROR:
      return { ...state }

    default:
      return { ...state }
  }
}

/* reselect selectors */
export const stateSelector = state => state[namespace]
export const loadingSelector = createSelector(
  stateSelector,
  state => state.loading
)

export const schemeListSelector = createSelector(
  stateSelector,
  state => state.entities
)

export const caseSchemeListSelector = createSelector(
  schemeListSelector,
  entities => {
    return Object.values(entities)
      .filter(entity => entity)
      .filter(({ _taskClass }) => _taskClass === 'Case')
  }
)

export const taskSchemeListSelector = createSelector(
  schemeListSelector,
  entities => Object.values(entities).filter(({ _taskClass }) => _taskClass !== 'Case')
)

export const selectedSelector = createSelector(
  stateSelector,
  state => state.selected
)

/* external action creators */
export function fetchAll(queryString) {
  return {
    type: FETCH_ALL_REQUEST,
    payload: {
      queryString
    }
  }
}

export function selectCaseSchemeRow(id) {
  return {
    type: SELECT_CASE_SCHEME_ROW_REQUEST,
    payload: { id }
  }
}

export function createNewScheme(schemeName) {
  return {
    type: CREATE_NEW_SCHEME_REQUEST,
    payload: { schemeName }
  }
}

export function editScheme(id, data) {
  return {
    type: EDIT_SCHEME_REQUEST,
    payload: { data }
  }
}

export function searchScheme(schemeName, selectStr) {
  return {
    type: SEARCH_SCHEME_REQUEST,
    payload: {
      schemeName,
      selectStr
    }
  }
}

/* sagas */
export const fetchAllSaga = function* ({ payload: { queryString } }) {
  try {
    const response = yield call(service.fetchAll, queryString)

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

export const createSchemeSaga = function* ({ payload }) {
  try {
    const data = yield call(service.createScheme, payload.schemeName)

    yield put({
      type: CREATE_NEW_SCHEME_SUCCESS,
      payload: data.filter(task => task._taskClass === 'Case')
    })
  } catch (error) {
    yield put({
      type: CREATE_NEW_SCHEME_ERROR,
      error
    })
  }
}

export const editSchemeSaga = function* ({ payload }) {
  try {
    const data = yield call(service.editScheme, payload.data)

    yield put({
      type: EDIT_SCHEME_SUCCESS,
      payload: data
    })
    yield put(goBack())
  } catch (error) {
    yield put({
      type: EDIT_SCHEME_ERRROR,
      error
    })
  }
}

export const deleteSchemeSaga = function* ({ payload }) {
  try {
    const data = yield call(service.deleteScheme)

    yield put({
      type: DELETE_SCHEME_SUCCESS,
      payload: data
    })
  } catch (error) {
    yield put({
      type: EDIT_SCHEME_ERRROR,
      error
    })
  }
}

export const searchSchemeSaga = function* ({ payload }) {
  try {
    const { selectStr } = payload
    let data

    switch (selectStr) {
      case '':
        data = yield call(service.fetchAll, `/scheme?select=_taskClass['Case']`)
        break
      default:
        data = yield call(service.fetchAll, `/scheme${selectStr}_taskClass['Case']`)
        break
    }

    data = data.filter(data => ~data._caseSchemaTitle.toLowerCase().indexOf(payload.schemeName.toLowerCase()))

    yield put({
      type: SEARCH_SCHEME_SUCCESS,
      payload: data
    })
  } catch (error) {
    yield put({
      type: SEARCH_SCHEME_ERROR,
      error
    })
  }
}

export const selectCaseSchemeRowSaga = function* ({ payload }) {
  try {
    let data = yield call(service.fetchAll, `/scheme?select=_caseSchemaId['${payload.id}']`)
    data = data.filter(data => data._taskClass !== 'Case')

    yield put({
      type: SELECT_CASE_SCHEME_ROW_SUCCESS,
      payload: data
    })
  } catch (error) {
    yield put({
      type: SELECT_CASE_SCHEME_ROW_ERROR,
      error
    })
  }
}

export const saga = function* () {
  yield all([
    takeEvery(FETCH_ALL_REQUEST, fetchAllSaga),
    takeEvery(CREATE_NEW_SCHEME_REQUEST, createSchemeSaga),
    takeEvery(EDIT_SCHEME_REQUEST, editSchemeSaga),
    takeEvery(DELETE_SCHEME_REQUEST, deleteSchemeSaga),
    takeEvery(SEARCH_SCHEME_REQUEST, searchSchemeSaga),
    takeEvery(SELECT_CASE_SCHEME_ROW_REQUEST, selectCaseSchemeRowSaga)
  ])
}