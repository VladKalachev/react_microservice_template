import { createSelector } from 'reselect'
import { name as appName } from '../../package.json'

export const namespace = 'sidebar'

const prefix = `${appName}/${namespace}`

const initialState = {
  collapsed: []
}

export const TOGGLE = `${prefix}/TOGGLE`

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case TOGGLE:
      return {
        ...state,
        collapsed: state.collapsed.includes(payload.id)
          ? state.collapsed.filter(id => id !== payload.id)
          : state.collapsed.concat(payload.id)
      }
    default:
      return state
  }
}

export const stateSelector = state => state[namespace]
export const collapsedSelector = createSelector(
  stateSelector,
  ({ collapsed }) => ({ collapsed })
)

export function toggle(id) {
  return {
    type: TOGGLE,
    payload: { id }
  }
}
