import React from 'react'
import SelectorSidebar from './SelectorSidebar'
import MainAssetViewWrapper from './MainAssetViewWrapper'
import views from './views.config.json'

function App () {
  return (
    <div className="pure-g">
      <SelectorSidebar views={views} />
      <MainAssetViewWrapper />
    </div>
  )
}

export default App
