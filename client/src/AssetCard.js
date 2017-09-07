import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

class AssetCard extends Component {
  render () {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.data.name}</Card.Header>
          <Card.Meta>{this.props.data.marketValue}</Card.Meta>
          <Card.Description>
            {this.props.data.holdings.map(h =>
              <div key={h.id}>{`${h.description1} ${h.description2}`}</div>)}
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

export default AssetCard
