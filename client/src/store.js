const store = {
  holdings: [],
  ready: false,
  cache: {}
}

function initialize () {
  return fetch('/api/holdings')
    .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
    .then(holdings => {
      store.holdings = holdings
      store.ready = true
      return store
    })
}

function match (obj) {
  const shouldInclude = holding => {
    for (let key in obj) {
      for (let value of obj[key]) {
        for (let item of holding.holdings) {
          if (item[key] === value) {
            return true
          }
        }
      }
    }

    return false
  }

  return store.holdings.filter(shouldInclude)
}

store.applyView = view => (store.cache[view.name] =
  (store.ready && store.cache[view.name]) || match(view.match))

export default { initialize: initialize }
