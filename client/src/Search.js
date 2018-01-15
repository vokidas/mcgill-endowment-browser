import React, { Component } from 'react'

class Search extends Component {
  render () {
    const { searchTerm, showBonds, onChange, onShowBondsChange,
      onSubmit } = this.props

    return (
      <form className="pure-form pure-form-stacked" onSubmit={onSubmit}>
        <input type="text" placeholder="search..."
          value={searchTerm} onChange={onChange} />
        <label htmlFor="show-bonds" className="pure-checkbox">
          <input id="show-bonds" type="checkbox"
            chcked={showBonds} onChange={onShowBondsChange} />
          {' show bonds'}
        </label>
      </form>
    )
  }
}

export default Search
