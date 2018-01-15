import { connect } from 'react-redux'
import Card from './Card'

const mapStateToProps = (state, { asset }) => ({
  description: state.descriptions[asset.searchableTicker],
  metadata: state.metadata[asset.ticker]
})

export default connect(mapStateToProps)(Card)
