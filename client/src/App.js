import React from 'react'
import SelectorSidebar from './SelectorSidebar'
import MainAssetView from './MainAssetView'
import views from './views.config.json'

function App () {
  return (
    <div className="pure-g">
      <SelectorSidebar views={views} />
      <MainAssetView />
    </div>
  )
}

export default App
