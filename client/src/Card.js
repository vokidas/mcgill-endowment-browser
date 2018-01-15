import React from 'react'
import CardContentHoldings from './CardContentHoldings'
import CardContentDescription from './CardContentDescription'
import CardContentNote from './CardContentNote'
import CardContentReserves from './CardContentReserves'
import CardContentDossier from './CardContentDossier'
import { formatCurrency } from './util'

function renderIcon (view, index) {
  const { icon, name } = view
  const classes = ['fas', 'fa-fw', icon].join(' ')
  return <i key={index} title={name} className={classes} />
}

function Card (props) {
  const { asset, description, metadata } = props
  const views = asset.getMatchingViews()

  return (
    <div className="card pure-u-1 pure-u-xl-1-2">
      <header className="card-header">
        <h3>{asset.name}</h3>
        <div className="card-meta">
          {asset.country + ' \u00b7 '}
          <span className="bold-value">
            {formatCurrency(asset.marketValue)}
          </span>
          {views.length > 0 && ' \u00b7 '}
          {views.length > 0 && views.map(renderIcon)}
        </div>
      </header>
      <CardContentHoldings holdings={asset.holdings} />
      <CardContentDescription
        ticker={asset.ticker}
        description={description} />
      <CardContentNote {...metadata} />
      <CardContentReserves {...metadata} />
      <CardContentDossier {...metadata} />
    </div>
  )
}

export default Card
