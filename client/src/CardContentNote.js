import React from 'react'

function CardContentNote (props) {
  const { note } = props

  if (!note) {
    return null
  }

  return (
    <div className="card-content">
      <i className="fas fa-fw fa-exclamation-triangle icon-harmful" />
      {' ' + note}
    </div>
  )
}

export default CardContentNote
