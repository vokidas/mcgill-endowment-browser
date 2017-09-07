import React from 'react'
import { Container, Menu } from 'semantic-ui-react'
import AssetBrowser from './AssetBrowser'

function App () {
  return (
    <div>
      <Menu inverted>
        <Container>
          <Menu.Item>mcgill investment browser</Menu.Item>
        </Container>
      </Menu>
      <AssetBrowser />
    </div>
  )
}

export default App
