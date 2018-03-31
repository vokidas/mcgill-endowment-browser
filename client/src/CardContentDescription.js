import React from 'react'
import CardLink from './CardLink'

function CardContentDescription (props) {
  const { ticker, description } = props

  if (description === undefined) {
    return null
  }

  if (description.readyState === 'REQUEST_LOADING') {
    return (
      <div className="card-content">
        <i className="fas fa-fw fa-circle-notch fa-spin" />
        {' Loading...'}
      </div>
    )
  }

  if (description.readyState === 'REQUEST_FAILED') {
    return (
      <div className="card-content">
        <i className="fas fa-fw fa-times" />
        {' There was an error fetching the description.'}
      </div>
    )
  }

  if (!description.value) {
    return null
  }

  // cut at 15 words
  const value = description.value.split(' ')
    .slice(0, 15).join(' ')

  return (
    <div className="card-content">
      <i className="fas fa-fw fa-info-circle" />
      {' ' + value + '... '}
      <CardLink href={`https://finance.yahoo.com/quote/${ticker}`}>
        Yahoo Finance
      </CardLink>
    </div>
  )
}

export default CardContentDescription
