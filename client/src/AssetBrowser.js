import React, { Component } from 'react'
import { Container, Grid } from 'semantic-ui-react'
import { connect } from 'react-redux'
import ViewSelector from './ViewSelector'
import AssetCardGroup from './AssetCardGroup'
import { initialize } from './store'

class AssetBrowser extends Component {
  componentDidMount () {
    this.props.onMount()
  }

  renderContent () {
    const { readyState, error } = this.props

    switch (readyState) {
      case 'REQUEST_LOADING':
        return 'Loading...'
      case 'REQUEST_READY':
        return <AssetCardGroup />
      case 'REQUEST_FAILED':
        return `Error: ${error}`
      case 'REQUEST_UNSENT':
      default:
        return false
    }
  }

  render () {
    return (
      <Container>
        <Grid stackable>
          <Grid.Column width={5}>
            <ViewSelector />
          </Grid.Column>
          <Grid.Column width={9}>
            {this.renderContent()}
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = ({ init }) => init

const mapDispatchToProps = dispatch => ({
  onMount: () => dispatch(initialize())
})

export default connect(mapStateToProps, mapDispatchToProps)(AssetBrowser)
