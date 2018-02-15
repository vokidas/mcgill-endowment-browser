import React, { Component } from 'react'
import MainAssetView from './MainAssetView'
import SummarySplash from './SummarySplash'

class MainViewWrapper extends Component {
  componentDidMount () {
    this.props.onMount()
  }

  render () {
    const { showSplash } = this.props

    if (showSplash) {
      return <SummarySplash />
    }

    return <MainAssetView />
  }
}

export default MainViewWrapper
