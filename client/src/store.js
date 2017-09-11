const store = {
  holdings: [],
  ready: false,
  cache: {}
}

function initialize () {
  const req1 = fetch('/api/holdings')
  const req2 = fetch('/api/metadata')

  const checkOk = ([ res1, res2 ]) => {
    switch (false) {
      case res1.ok:
        return Promise.reject(res1.statusText)
      case res2.ok:
        return Promise.reject(res2.statusText)
      default:
        return Promise.all([ res1.json(), res2.json() ])
    }
  }

  const setUp = ([ holdings, metadata ]) => {
    store.holdings = holdings.map(holding => {
      if (holding.holdings[0].ticker in metadata) {
        holding.metadata = metadata[holding.holdings[0].ticker]
      }

      return holding
    })

    store.ready = true
    return store
  }

  return Promise.all([ req1, req2 ]).then(checkOk).then(setUp)
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
