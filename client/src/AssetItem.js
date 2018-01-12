import { connect } from 'react-redux'
import AssetCard from './AssetCard'

const mapStateToProps = ({ activeAssetId, descriptions, metadata }, { asset }) => ({
  description: descriptions[asset.ticker],
  metadata: metadata[asset.ticker],
  isActive: activeAssetId === asset.id
})

const mapDispatchToProps = (dispatch, { asset }) => ({
  onLoadMoreClick: () => dispatch({ type: 'LOAD_MORE' }),
  onCardHeaderClick: () => dispatch({
    type: 'SET_ACTIVE_ASSET',
    id: asset.id
  })
})

const AssetItem = connect(mapStateToProps, mapDispatchToProps)(AssetCard)

export default AssetItem
