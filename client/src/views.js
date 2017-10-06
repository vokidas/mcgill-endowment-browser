import views from './views.config.json'

const matches = (asset, match) => {
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
}

export function applyView (assets, view) {
  const { match } = view
  return match ? assets.filter(asset => matches(asset, match)) : assets
}

export function getMatchingViews (asset) {
  return views.filter(({ match }) => match && matches(asset, match))
}

export { views }
