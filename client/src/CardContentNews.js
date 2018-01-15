import React from 'react'
import CardLink from './CardLink'

function renderItem (item, index) {
  return (
    <CardLink key={index} href={item.href}>
      {item.text}
    </CardLink>
  )
}

function CardContentNews (props) {
  const { news1, news2 } = props

  if (!news1) {
    return null
  }

  const values = [news1, news2]
    .filter(item => !!item)
    .map(item => {
      const a = document.createElement('a')
      a.href = item
      return {
        text: a.hostname.split('.').slice(-2).join('.'),
        href: item
      }
    })

  return (
    <div className="card-content">
      <i className="fas fa-fw fa-globe" />
      {' In the news \u00b7 '}
      {values.map(renderItem)}
    </div>
  )
}

export default CardContentNews
