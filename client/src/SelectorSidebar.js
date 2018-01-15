import { connect } from 'react-redux'
import Sidebar from './Sidebar'

const mapStateToProps = state => ({
  open: state.menuOpen
})

const mapDispatchToProps = dispatch => ({
  onMenuToggle: () => dispatch({ type: 'TOGGLE_MENU' })
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
