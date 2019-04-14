import request from '../utils/request'
const BASE_URL =
  process.env.NODE_ENV !== 'production'
    ? 'http://0.0.0.31/ws-waterflow/v1'
    : '/ws-waterflow/v1'

export function fetchAll(queryString) {
  return request(`${BASE_URL}${queryString}`)
}

export function fetchById(id) {
  return request(`${BASE_URL}/tasks?select=_id['${id}']`)
}

export function fetchAllTasks(filter) {
  return request(`${BASE_URL}${filter}`)
}

export function fetchCaseWithTasks(id) {
  return request(`${BASE_URL}/tasks?filters=_caseId['${id}'],_id['${id}']`)
}

export function createTask(data) {
  return request(`${BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: data
  })
}

export function fetchEditTask({ data, id }) {
  return request(`${BASE_URL}/tasks?select=_id['${id}']`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'application/json; charset=UTF-8'
    },
    body: data
  })
}

export function fetchAllSchemes() {
  return request(`${BASE_URL}/scheme`)
}

export function createScheme(newScheme) {
  return request(`${BASE_URL}/scheme?caseSchemaTitle=${newScheme}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' }
  })
}

export function editScheme(editedScheme) {
  return request(`${BASE_URL}/scheme?select=_id['${editedScheme._id}']`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: editedScheme
  })
}

export function deleteScheme(templateId) {
  return request(`${BASE_URL}/scheme?caseSchemaId=${templateId}`)
}
