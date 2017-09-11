import React, { Component } from 'react'
import { Container, Grid, Card } from 'semantic-ui-react'
import ViewSelector from './ViewSelector'
import AssetCard from './AssetCard'
import store from './store'
import views from './views.config.json'

class AssetBrowser extends Component {
  state = {
    activeViewIndex: 0,
    store: null
  }

  componentDidMount () {
    store.initialize()
      .then(store => this.setState({ store: store }))
  }

  setActiveIndex = index => {
    this.setState({ activeViewIndex: index })
  }

  render () {
    const view = views[this.state.activeViewIndex]
    const holdings = this.state.store
      ? this.state.store.applyView(view) : []

    return (
      <Container>
        <Grid stackable>
          <Grid.Column width={5}>
            <ViewSelector
              views={views}
              activeIndex={this.state.activeViewIndex}
              setActiveIndex={this.setActiveIndex} />
          </Grid.Column>
          <Grid.Column width={9}>
            <Card.Group itemsPerRow={1}>
              {holdings.map(d => <AssetCard data={d} key={d.id} />)}
            </Card.Group>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

export default AssetBrowser
