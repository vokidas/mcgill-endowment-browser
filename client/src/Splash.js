import React from 'react'
// import { Chart } from 'react-google-charts'
import Content from './Content'
import { formatCurrency } from './util'

function SummaryTableRow (props) {
  const { view } = props
  return (
    <tr>
      <td>{view.name}</td>
      <td>{formatCurrency(view.total)}</td>
    </tr>
  )
}

function SummaryTable (props) {
  const { summary } = props
  const all = summary[0]
  const views = summary.slice(1)

  return (
    <table className="pure-table">
      <tr>
        <th>{all.name}</th>
        <th>{formatCurrency(all.total)}</th>
      </tr>
      {views.map(view => <SummaryTableRow view={view} />)}
    </table>
  )
}

function SplashContent (props) {
  const { summary, init } = props

  if (init.readyState === 'REQUEST_UNSENT' ||
    init.readyState === 'REQUEST_LOADING') {
    return (
      <div>
        <i className="fas fa-fw fa-circle-notch fa-spin" />
        {' Loading...'}
      </div>
    )
  }

  if (init.readyState === 'REQUEST_FAILED') {
    return (
      <div>
        <i className="fas fa-fw fa-times" />
        {' Error: ' + init.error}
      </div>
    )
  }

  return <SummaryTable summary={summary} />
}

function Splash (props) {
  return (
    <Content>
      <h3>welcome.</h3>
      <p>The description goes here.</p>
      <SplashContent {...props} />
    </Content>
  )
}

export default Splash
