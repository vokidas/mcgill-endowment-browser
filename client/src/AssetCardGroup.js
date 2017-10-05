import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'
import { connect } from 'react-redux'
import AssetCard from './AssetCard'

class AssetCardGroup extends Component {
  renderLoadMore () {
    const { showLoadMore, onLoadMoreClick } = this.props

    if (!showLoadMore) {
      return false
    }

    return (
      <button onClick={onLoadMoreClick}>Load more...</button>
    )
  }

  render () {
    const { assets } = this.props

    return (
      <div>
        <Card.Group itemsPerRow={1}>
          {assets.map(asset => <AssetCard key={asset.id} asset={asset} />)}
        </Card.Group>
        {this.renderLoadMore()}
      </div>
    )
  }
}

const mapStateToProps = ({ visibleAmount, filtered }) => ({
  assets: filtered.slice(0, visibleAmount),
  showLoadMore: visibleAmount < filtered.length
})

const mapDispatchToProps = dispatch => ({
  onLoadMoreClick: () => dispatch({ type: 'LOAD_MORE' })
})

export default connect(mapStateToProps, mapDispatchToProps)(AssetCardGroup)
