import React, { Component } from 'react'
import Content from './Content'
import AssetCard from './AssetCard'

function renderLoadMore (onLoadModeClick) {
  return (
    <button
      className="pure-button load-more"
      onClick={onLoadModeClick}>
      load more...
    </button>
  )
}

class MainView extends Component {
  componentDidMount () {
    this.props.onMount()
  }

  render () {
    const { assets, init, showLoadMore, onLoadModeClick } = this.props

    switch (init.readyState) {
      case 'REQUEST_UNSENT':
      case 'REQUEST_LOADING':
        return (
          <Content>
            <i className="fas fa-fw fa-circle-notch fa-spin" />
            {' Loading...'}
          </Content>
        )
      case 'REQUEST_FAILED':
        return (
          <Content>
            <i className="fas fa-fw fa-times" />
            {' Error: ' + init.error}
          </Content>
        )
      default:
        // pass
    }

    return (
      <Content>
        <div className="pure-g">
          {assets.map(asset => <AssetCard key={asset.id} asset={asset} />)}
        </div>
        {showLoadMore && renderLoadMore(onLoadModeClick)}
      </Content>
    )
  }
}

export default MainView
