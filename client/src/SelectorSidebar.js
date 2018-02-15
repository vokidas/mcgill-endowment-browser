import { connect } from 'react-redux'
import Sidebar from './Sidebar'

const mapStateToProps = state => ({
  open: state.menuOpen
})

const mapDispatchToProps = dispatch => ({
  onMenuToggle: () => dispatch({ type: 'TOGGLE_MENU' }),
  onHeaderClick: () => dispatch({ type: 'SET_ACTIVE_VIEW', index: null })
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
