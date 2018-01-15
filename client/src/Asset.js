import views from './views.config.json'

class Asset {
  constructor (holdings) {
    Object.assign(this, holdings)
  }

  matches (pattern) {
    for (let key in pattern) {
      for (let value of pattern[key]) {
        for (let item of this.holdings) {
          if (item[key] === value) {
            return true
          }
        }
      }
    }

    return false
  }

  getMatchingViews () {
    if (this._views === undefined) {
      this._views = views.filter(view =>
        view.match && this.matches(view.match))
    }

    return this._views
  }

  static applyView (assets, index) {
    const view = views[index]
    return view.match ? assets.filter(
      asset => asset.matches(view.match)
    ) : assets
  }

  static getViews () {
    return views
  }
}

export default Asset
