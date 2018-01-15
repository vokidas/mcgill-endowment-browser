import { connect } from 'react-redux'
import MainView from './MainView'
import { initialize } from './store'

const mapStateToProps = state => {
  const { init, filtered, visibleAmount } = state
  return {
    assets: filtered.slice(0, visibleAmount),
    showLoadMore: visibleAmount < filtered.length,
    init
  }
}

const mapDispatchToProps = dispatch => ({
  onLoadModeClick: () => dispatch({ type: 'LOAD_MORE' }),
  onMount: () => dispatch(initialize())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainView)
