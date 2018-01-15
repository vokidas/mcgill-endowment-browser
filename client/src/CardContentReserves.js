import React from 'react'
import { precisionRound } from './util'

function CardContentReserves (props) {
  const { oilGas, coal } = props

  if (!oilGas && !coal) {
    return null
  }

  const values = [oilGas, coal]
  const description = ['oil & gas', 'coal']
    .filter((_, i) => !!values[i])
    .join(', ')

  const total = precisionRound(+oilGas + +coal, 3)

  return (
    <div className="card-content">
      <i className="fas fa-fw fa-industry" />{' '}
      <span className="bold-value">{total}</span>{' '}
      tons of CO<sub>2</sub>{' '}reserves ({description})
    </div>
  )
}

export default CardContentReserves
