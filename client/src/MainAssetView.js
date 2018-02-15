import { connect } from 'react-redux'
import Asset from './Asset'
import MainView from './MainView'
import { fetchDescriptions } from './store'

function getFilteredAssets (state) {
  const { assets, activeViewIndex, searchTerm, showBonds } = state
  const view = Asset.getView(activeViewIndex)
  const terms = searchTerm.toLowerCase().split(' ')
    .filter(term => term.length > 0)

  return assets.filter(asset =>
    asset.matchesView(view) && asset.matchesSearchTerms(terms) &&
      (showBonds || !asset.isBond())
  )
}

const mapStateToProps = state => {
  const filtered = getFilteredAssets(state)
  return {
    assets: filtered.slice(0, state.visibleAmount),
    showLoadMore: state.visibleAmount < filtered.length,
    init: state.init
  }
}

const mapDispatchToProps = dispatch => ({
  onLoadMoreClick: () => dispatch({ type: 'LOAD_MORE' }),
  onWillReceiveProps: ({ assets }) => dispatch(fetchDescriptions(assets))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
