import React, { Component } from 'react'
import { Card, Icon } from 'semantic-ui-react'

class AssetCard extends Component {
  render () {
    const holding = this.props.data
    const metadata = holding.metadata && holding.metadata.link &&
      <Card.Content extra>
        <Icon name="info" />
        <a href={holding.metadata.link}>
          Read Divest McGill's dossier.
        </a>
      </Card.Content>

    return (
      <Card>
        <Card.Content>
          <Card.Header>{holding.name}</Card.Header>
          <Card.Meta>{holding.holdings[0].ticker}</Card.Meta>
          <Card.Meta>{holding.marketValue}</Card.Meta>
          <Card.Description>
            {holding.holdings.map(h =>
              <div key={h.id}>{`${h.description1} ${h.description2}`}</div>)}
          </Card.Description>
        </Card.Content>
        {metadata}
      </Card>
    )
  }
}

export default AssetCard
