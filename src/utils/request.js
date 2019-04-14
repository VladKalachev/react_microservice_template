import React from 'react'
import { notification } from 'antd'

const codeMessage = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  204: 'No Content',
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  406: 'Not Acceptable',
  410: 'Gone',
  422: 'Unprocessable Entity (WebDAV)',
  500: 'Internal Server Error',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout'
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  }

  const errortext = codeMessage[response.status] || response.statusText

  if (process.env.NODE_ENV !== 'production') {
    notification.error({
      message: `Request error ${response.status}`,
      description: (
        <div>
          {errortext}
          <br />
          <small>
            <a href={response.url} target="_blank">
              {response.url}
            </a>
          </small>
        </div>
      )
    })
  }

  const error = new Error(errortext)
  error.name = response.status
  error.response = response

  return Promise.reject(error)
}

export default function request(url, options) {
  const defaultOptions = {
    // credentials: 'include'
  }
  const newOptions = { ...defaultOptions, ...options }
  if (newOptions.method === 'POST' || newOptions.method === 'PATCH') {
    newOptions.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      ...newOptions.headers
    }
    newOptions.body = JSON.stringify(newOptions.body)
  }

  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text()
      }
      return response.json()
    })
}
