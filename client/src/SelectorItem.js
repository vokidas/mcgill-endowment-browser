import { connect } from 'react-redux'
import SidebarItem from './SidebarItem'

const mapStateToProps = (state, { index }) => ({
  active: state.activeViewIndex === index
})

const mapDispatchToProps = (dispatch, { index }) => ({
  onItemClick: () => dispatch({
    type: 'SET_ACTIVE_VIEW',
    index
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarItem)
