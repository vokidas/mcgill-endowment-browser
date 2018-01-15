import React from 'react'
import Asset from './Asset'
import SelectorSidebar from './SelectorSidebar'
import MainAssetView from './MainAssetView'

function App () {
  const views = Asset.getViews()
  return (
    <div className="pure-g">
      <SelectorSidebar views={views} />
      <MainAssetView />
    </div>
  )
}

export default App
