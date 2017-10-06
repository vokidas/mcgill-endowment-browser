import { views, applyView } from './views'

const DISPLAY_INCREMENT = 20

const initialState = {
  filtered: [],
  visibleAmount: DISPLAY_INCREMENT,
  holdings: [],
  metadata: {},
  descriptions: {},
  init: {
    readyState: 'REQUEST_UNSENT',
    error: null
  },
  activeViewIndex: 0,
  activeAssetId: null,
  views
}

/* reducers */

export function app (state = initialState, action) {
  const { holdings, views, activeViewIndex, activeAssetId, visibleAmount } =
    state

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
    case 'FETCH_DESCRIPTIONS_SENT':
    case 'FETCH_DESCRIPTIONS_SUCCESS':
    case 'FETCH_DESCRIPTIONS_FAILURE':
      return Object.assign({}, state, {
        descriptions: descriptions(state.descriptions, action)
      })
    case 'SELECT_VIEW':
      return Object.assign({}, state, {
        filtered: applyView(holdings, views[action.index]),
        activeViewIndex: action.index
      })
    case 'SET_ACTIVE_ASSET':
      return Object.assign({}, state, {
        activeAssetId: activeAssetId === action.id ? null : action.id
      })
    case 'LOAD_MORE':
      return Object.assign({}, state, {
        visibleAmount: visibleAmount + DISPLAY_INCREMENT
      })
    default:
      return state
  }
}

function descriptions (state = {}, action) {
  const descriptions = {}

  for (let ticker of action.tickers) {
    if (action.type === 'FETCH_DESCRIPTIONS_SENT') {
      descriptions[ticker] = { readyState: 'REQUEST_LOADING' }
    } else if (action.type === 'FETCH_DESCRIPTIONS_SUCCESS') {
      descriptions[ticker] = {
        readyState: 'REQUEST_READY',
        value: action.descriptions[ticker] // may be null
      }
    } else if (action.type === 'FETCH_DESCRIPTIONS_FAILURE') {
      descriptions[ticker] = {
        readyState: 'REQUEST_FAILED',
        error: action.error
      }
    }
  }

  return Object.assign({}, state, descriptions)
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

      dispatch(fetchActiveDescriptions())
    }

    const failure = error => dispatch({
      type: 'INIT_FAILURE',
      error
    })

    const requests = [ 'holdings', 'metadata' ].map(target => api(target))
    return Promise.all(requests).then(success).catch(failure)
  }
}

export function fetchActiveDescriptions (page) {
  return function (dispatch, getState) {
    const { filtered, descriptions } = getState()

    const needsDescription = ({ ticker }) =>
      ticker &&
      (!(ticker in descriptions) ||
        descriptions[ticker].readyState === 'REQUEST_FAILED')

    const tickers = filtered.slice(0, 20)
      .filter(needsDescription)
      .map(({ ticker }) => ticker)

    if (!tickers.length) {
      return
    }

    dispatch({
      type: 'FETCH_DESCRIPTIONS_SENT',
      tickers
    })

    const success = descriptions => dispatch({
      type: 'FETCH_DESCRIPTIONS_SUCCESS',
      tickers,
      descriptions
    })

    const failure = error => dispatch({
      type: 'FETCH_DESCRIPTIONS_FAILURE',
      tickers,
      error
    })

    const target = 'descriptions?tickers=' + tickers.join(',')
    return api(target).then(success).catch(failure)
  }
}

/* helpers */

function api (target) {
  return fetch(`/api/${target}`).then(res =>
    res.ok ? res.json() : Promise.reject(res.statusText))
}
