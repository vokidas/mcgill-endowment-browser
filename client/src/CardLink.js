import React from 'react'

function CardLink (props) {
  const { href, children } = props
  return (
    <a href={href} className="card-link" target="_blank">
      {children}{' '}
      <i className="fas fa-fw fa-external-link-alt" />
    </a>
  )
}

export default CardLink
