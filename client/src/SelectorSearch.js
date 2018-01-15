import { connect } from 'react-redux'
import Search from './Search'

const mapStateToProps = state => ({
  searchTerm: state.searchTerm
})

const mapDispatchToProps = dispatch => ({
  onChange: event => dispatch({
    type: 'SET_SEARCH_TERM',
    value: event.target.value
  }),
  onSubmit: event => {
    dispatch({ type: 'TOGGLE_MENU' })
    event.preventDefault()
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
