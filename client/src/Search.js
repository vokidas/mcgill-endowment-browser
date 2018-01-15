import React, { Component } from 'react'

class Search extends Component {
  render () {
    const { searchTerm, onChange } = this.props

    return (
      <form className="pure-form">
        <input type="text" placeholder="search..."
          value={searchTerm} onChange={onChange} />
      </form>
    )
  }
}

export default Search
