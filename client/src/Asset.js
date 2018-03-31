import views from './views.config.json'

const fundRegex = /EQUITY.*FUND/

class Asset {
  constructor (holdings) {
    Object.assign(this, holdings)
  }

  isBond () {
    return this.assetCategory === 'FIXED INCOME SECURITIES'
  }

  isFund () {
    return fundRegex.test(this.assetType)
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
      const origin = { can: 0, us: 0, intl: 0 }
      const total = 0
      const totalCompanies = 0

      const data = assets.reduce(({ origin, total, totalCompanies }, asset) => {
        if (asset.matchesView(view)) {
          if (asset.country === 'Canada') {
            origin.can += asset.marketValue
          } else if (asset.country === 'United States') {
            origin.us += asset.marketValue
          } else {
            origin.intl += asset.marketValue
          }

          if (!asset.isBond() && !asset.isFund()) {
            totalCompanies += asset.marketValue
          }

          total += asset.marketValue
        }

        return { origin, total, totalCompanies }
      }, { origin, total, totalCompanies })

      summary.push(Object.assign({}, view, data))
    }

    return summary
  }
}

export default Asset
