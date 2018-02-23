import views from './views.config.json'

class Asset {
  constructor (holdings) {
    Object.assign(this, holdings)
  }

  isBond () {
    return this.assetCategory === 'FIXED INCOME SECURITIES'
  }

  matchesView (view) {
    const { match } = view

    if (!match) {
      return true
    }

    for (let key in match) {
      for (let value of match[key]) {
        for (let item of this.holdings) {
          if (item[key] === value) {
            return true
          }
        }
      }
    }

    return false
  }

  matchesSearchTerms (terms) {
    loop: for (let term of terms) {
      for (let token of this.getSearchTokens()) {
        if (token.indexOf(term) !== -1) {
          continue loop
        }
      }

      return false
    }

    return true
  }

  getMatchingViews () {
    if (this._views === undefined) {
      this._views = views.filter(
        view => view.match && this.matchesView(view)
      )
    }

    return this._views
  }

  getSearchTokens () {
    if (this._tokens === undefined) {
      let tokens = this.name.toLowerCase().split(' ')
      tokens.push(this.country.toLowerCase())
      this._tokens = tokens
    }

    return this._tokens
  }

  static getView (index) {
    return views[index]
  }

  static getSummary (assets) {
    const summary = []

    for (let view of views) {
      const total = assets.reduce((acc, asset) => {
        return asset.matchesView(view) ? acc + asset.marketValue : acc
      }, 0)

      summary.push(Object.assign({}, view, { total }))
    }

    return summary
  }
}

export default Asset
