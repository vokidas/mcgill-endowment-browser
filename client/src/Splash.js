import React from 'react'
import Content from './Content'

function SplashContent (props) {
  const { init } = props

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

  return <div>{JSON.stringify(init)}</div>
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
