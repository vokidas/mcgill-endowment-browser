import React from 'react'
import CardLink from './CardLink'

function CardContentDossier (props) {
  const { link } = props

  if (!link) {
    return null
  }

  return (
    <div className="card-content">
      <i className="fas fa-fw fa-folder-open" />
      {' Divest McGill dossier \u00b7 '}
      <CardLink href={link}>Google Drive</CardLink>
    </div>
  )
}

export default CardContentDossier
