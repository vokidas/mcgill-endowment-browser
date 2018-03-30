import Asset from './Asset'

const DISPLAY_INCREMENT = 20

const initialState = {
  assets: [],
  metadata: {}, // indexed by ticker
  descriptions: {}, // indexed by searchableTicker
  summary: {},
  init: {
    readyState: 'REQUEST_UNSENT',
    error: null
  },
  activeViewIndex: null,
  searchTerm: '',
  visibleAmount: DISPLAY_INCREMENT,
  menuOpen: false,
  showBonds: false
}

/* reducers */

export function app (state = initialState, action) {
  switch (action.type) {
    case 'INIT_SENT':
      return Object.assign({}, state, {
        init: { readyState: 'REQUEST_LOADING' }
      })
    case 'INIT_SUCCESS':
      return Object.assign({}, state, {
        assets: action.assets,
        metadata: action.metadata,
        summary: action.summary,
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
        descriptions: descriptions(
          state.descriptions,
          action
        )
      })
    case 'SET_ACTIVE_VIEW':
      return Object.assign({}, state, {
        activeViewIndex: action.index,
        // clear the search term when changing view
        searchTerm: '',
        visibleAmount: DISPLAY_INCREMENT,
        menuOpen: false
      })
    case 'SET_SEARCH_TERM':
      return Object.assign({}, state, {
        // If we are on the splash screen, set active view to "all"
        activeViewIndex: state.activeViewIndex === null ? 0 : state.activeViewIndex,
        searchTerm: action.value,
        visibleAmount: DISPLAY_INCREMENT
      })
    case 'TOGGLE_MENU':
      return Object.assign({}, state, {
        menuOpen: !state.menuOpen
      })
    case 'TOGGLE_SHOW_BONDS':
      return Object.assign({}, state, {
        showBonds: !state.showBonds
      })
    case 'LOAD_MORE':
      return Object.assign({}, state, {
        visibleAmount: state.visibleAmount + DISPLAY_INCREMENT
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
      const assets = holdings.map(holding => new Asset(holding))
      const summary = Asset.getSummary(assets)

      dispatch({
        type: 'INIT_SUCCESS',
        assets,
        metadata,
        summary
      })
    }

    const failure = error => dispatch({
      type: 'INIT_FAILURE',
      error
    })

    const requests = ['holdings', 'metadata'].map(target => api(target))
    return Promise.all(requests).then(success, failure)
  }
}

export function fetchDescriptions (assets) {
  return function (dispatch, getState) {
    const { descriptions } = getState()

    const needsDescription = ticker => {
      return ticker && (!descriptions[ticker] ||
        descriptions[ticker].readyState === 'REQUEST_FAILED')
    }

    const tickers = assets
      .map(asset => asset.searchableTicker)
      .filter(needsDescription)

    if (tickers.length === 0) {
      return // nothing to fetch
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
    return api(target).then(success, failure)
  }
}

/* helpers */

function api (target) {
  return fetch(`/api/${target}`).then(res =>
    res.ok ? res.json() : Promise.reject(res.statusText))
}
