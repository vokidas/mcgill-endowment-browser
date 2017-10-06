import React from 'react'
import { Card, Icon, Accordion } from 'semantic-ui-react'
import { getMatchingViews } from './views'
import { formatCurrency, any } from './util'

const { Content, Header, Meta, Description } = Card

function renderHolding ({ id, description1, description2 }) {
  return (
    <div key={id}>
      {description1 + ' ' + description2}
    </div>
  )
}

function renderIcon ({ icon, name }, index) {
  return <Icon key={index} name={icon} title={name} />
}

function GoogleDescription ({ description }) {
  if (!description) {
    return null
  }

  if (description.readyState === 'REQUEST_LOADING') {
    return <span>Loading...</span>
  } else if (description.readyState === 'REQUEST_FAILED') {
    return <span>`Error: ${description.error}`</span>
  }

  return (
    <Accordion>
      <Accordion.Title>
        <Icon name='dropdown' />
        View description
      </Accordion.Title>
      <Accordion.Content>
        {description.value}
      </Accordion.Content>
    </Accordion>
  )
}

function ActiveContent ({ asset, description }) {
  return (
    <Content>
      <Description>
        {/* asset.holdings.map(renderHolding) */}
        <GoogleDescription description={description} />
      </Description>
    </Content>
  )
}

function AssetCard (props) {
  const { asset, isActive, onCardHeaderClick } = props
  const views = getMatchingViews(asset)
  const isHarmful = any(views, view => view.harmful)

  return (
    <Card>
      <Content className="clickable" onClick={onCardHeaderClick}>
        <Header className={!isHarmful && 'sub'}>
          {views.map(renderIcon)}
          {asset.name}
        </Header>
        <Meta>
          {asset.country + ' \u00b7 '}
          <span className="market-value">
            {formatCurrency(asset.marketValue)}
          </span>
        </Meta>
      </Content>
      {isActive && <ActiveContent {...props} />}
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
