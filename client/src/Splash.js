import React from 'react'
import { Chart } from 'react-google-charts'
import Content from './Content'

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

  const data = [['Asset type', 'Value']]
    .concat(summary)

  return (
    <Chart
      chartType="PieChart"
      data={data}
      width="100%"
    />
  )
}

function Splash (props) {
  const { summary, init } = props

  return (
    <Content>
      <h3>welcome.</h3>
      <p>The description goes here.</p>
      <SplashContent {...props} />
    </Content>
  )
}

export default Splash
