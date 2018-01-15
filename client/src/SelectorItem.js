import { connect } from 'react-redux'
import SidebarItem from './SidebarItem'
import { selectView } from './store'

const mapStateToProps = (state, { index }) => ({
  active: state.activeViewIndex === index
})

const mapDispatchToProps = (dispatch, { index }) => ({
  onItemClick: () => dispatch(selectView(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(SidebarItem)
