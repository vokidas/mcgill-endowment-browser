import React, { Component } from 'react'
import Content from './Content'
import AssetCard from './AssetCard'

function renderLoadMore (onLoadMoreClick) {
  return (
    <button
      className="pure-button load-more"
      onClick={onLoadMoreClick}>
      load more...
    </button>
  )
}

class MainView extends Component {
  constructor (props) {
    super(props)
    props.onWillReceiveProps(props)
  }

  componentWillReceiveProps (nextProps) {
    this.props.onWillReceiveProps(nextProps)
  }

  render () {
    const { assets, init, showLoadMore, onLoadMoreClick } = this.props

    if (init.readyState === 'REQUEST_UNSENT' ||
      init.readyState === 'REQUEST_LOADING') {
      return (
        <Content>
          <i className="fas fa-fw fa-circle-notch fa-spin" />
          {' Loading...'}
        </Content>
      )
    }

    if (init.readyState === 'REQUEST_FAILED') {
      return (
        <Content>
          <i className="fas fa-fw fa-times" />
          {' Error: ' + init.error}
        </Content>
      )
    }

    if (assets.length === 0) {
      return (
        <Content>
          <i className="fas fa-fw fa-times" />
          {' No results.'}
        </Content>
      )
    }

    return (
      <Content>
        <div className="pure-g">
          {assets.map(asset => <AssetCard key={asset.id} asset={asset} />)}
        </div>
        {showLoadMore && renderLoadMore(onLoadMoreClick)}
      </Content>
    )
  }
}

export default MainView
