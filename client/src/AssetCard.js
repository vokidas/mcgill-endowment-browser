import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

const { Content, Header, Meta, Description } = Card

function renderHolding (holding) {
  return (
    <div key={holding.id}>
      {holding.description1 + ' ' + holding.description2}
    </div>
  )
}

function AssetCard (props) {
  const { asset } = props
  const formattedValue = '$' + asset.marketValue.toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')

  return (
    <Card>
      <Content>
        <Header>{asset.name}</Header>
        <Meta>
          {asset.country + ' \u00b7 '}
          <span className="market-value">{formattedValue}</span>
        </Meta>
      </Content>
      <Content>
        <Description>
          {asset.holdings.map(renderHolding)}
        </Description>
      </Content>
    </Card>
  )

  /*
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
  */
}

export default AssetCard
