import views from './views.config.json'

const visibleAmountIncrement = 20

const initialState = {
  filtered: [],
  visibleAmount: visibleAmountIncrement,
  holdings: [],
  metadata: {},
  descriptions: {},
  init: {
    readyState: 'REQUEST_UNSENT',
    error: null
  },
  activeViewIndex: 0,
  views
}

/* reducers */

export function app (state = initialState, action) {
  const { holdings, views, activeViewIndex, visibleAmount } = state

  switch (action.type) {
    case 'INIT_SENT':
      return Object.assign({}, state, {
        init: { readyState: 'REQUEST_LOADING' }
      })
    case 'INIT_SUCCESS':
      return Object.assign({}, state, {
        holdings: action.holdings,
        filtered: applyView(action.holdings, views[activeViewIndex]),
        metadata: action.metadata,
        init: { readyState: 'REQUEST_READY' }
      })
    case 'INIT_FAILURE':
      return Object.assign({}, state, {
        init: {
          readyState: 'REQUEST_FAILED',
          error: action.error
        }
      })
    case 'SELECT_VIEW':
      return Object.assign({}, state, {
        filtered: applyView(holdings, views[action.index]),
        activeViewIndex: action.index
      })
    case 'LOAD_MORE':
      return Object.assign({}, state, {
        visibleAmount: visibleAmount + visibleAmountIncrement
      })
    default:
      return state
  }
}

function applyView (holdings, view) {
  const { match } = view

  return !match ? holdings : holdings.filter(asset => {
    for (let key in match) {
      for (let value of match[key]) {
        for (let item of asset.holdings) {
          if (item[key] === value) {
            return true
          }
        }
      }
    }

    return false
  })
}

/* actions */

export function initialize () {
  return function (dispatch) {
    dispatch({
      type: 'INIT_SENT'
    })

    const success = ([ holdings, metadata ]) => {
      dispatch({
        type: 'INIT_SUCCESS',
        holdings,
        metadata
      })
    }

    const failure = error => {
      dispatch({
        type: 'INIT_FAILURE',
        error
      })
    }

    const requests = [ 'holdings', 'metadata' ].map(api)
    return Promise.all(requests).then(success).catch(failure)
  }
}

/* helpers */

function api (target) {
  return fetch(`/api/${target}`).then(res =>
    res.ok ? res.json() : Promise.reject(res.statusText))
}
