import React from 'react'
import { formatCurrency } from './util'

function renderHolding (holding, index) {
  const { description1, description2, marketValue } = holding
  return (
    <div key={index} className="card-holding-item">
      <span className="bold-value">
        {formatCurrency(marketValue)}
      </span>
      {' \u00b7 ' + description1 + ' ' + description2}
    </div>
  )
}

function CardContentHoldings (props) {
  const { holdings } = props

  if (holdings.length < 2) {
    return null
  }

  return (
    <div className="card-content">
      {holdings.map(renderHolding)}
    </div>
  )
}

export default CardContentHoldings
