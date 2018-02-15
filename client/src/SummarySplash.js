import { connect } from 'react-redux'
import Splash from './Splash'

const mapStateToProps = state => {
  const { summary, init } = state
  return {
    summary,
    init
  }
}

export default connect(mapStateToProps)(Splash)
