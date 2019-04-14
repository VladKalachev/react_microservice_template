import { name as appName } from '../../package.json'

export const namespace = 'modals'
const prefix = `${appName}/${namespace}`

// constants
export const SHOW_MODAL = `${prefix}/SHOW_MODAL`
export const HIDE_MODAL = `${prefix}/HIDE_MODAL`

// types of modal
export const CREATE_CASE = 'CREATE_CASE'
export const REJECT_CASE = 'REJECT_CASE'

const initialState = {
  modalType: '',
  modalProps: {}
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SHOW_MODAL:
      return { ...state, ...payload }
    case HIDE_MODAL:
      return { ...initialState }
    default:
      return { ...state }
  }
}

// action creators
export function hideModal() {
  return {
    type: HIDE_MODAL
  }
}

export function showModal(modalType, modalProps) {
  return {
    type: SHOW_MODAL,
    payload: { modalType, modalProps }
  }
}
