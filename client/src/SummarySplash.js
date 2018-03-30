import { connect } from 'react-redux'
import Splash from './Splash'

const mapStateToProps = state => {
  const { summary, init } = state
  return {
    summary,
    init
  }
}

const mapDispatchToProps = dispatch => ({
  onShellClick: () => dispatch({
    type: 'SET_SEARCH_TERM',
    value: 'shell'
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(Splash)
