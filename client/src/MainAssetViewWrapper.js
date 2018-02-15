import { connect } from 'react-redux'
import MainViewWrapper from './MainViewWrapper'
import { initialize } from './store'

const mapStateToProps = state => {
  return {
    showSplash: state.activeViewIndex === null
  }
}

const mapDispatchToProps = dispatch => ({
  onMount: () => dispatch(initialize())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainViewWrapper)
