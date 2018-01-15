import React from 'react'
import SelectorItem from './SelectorItem'

function renderView (view, index) {
  return <SelectorItem key={index} index={index} view={view} />
}

function Sidebar (props) {
  const { views, open, onMenuToggle } = props
  let className = 'sidebar pure-u-1 pure-u-md-2-5 pure-u-lg-1-3 pure-u-xl-1-4'

  if (open) {
    className += ' open'
  }

  return (
    <aside className={className}>
      <header className="header">
        <a href="#" className="menu-toggle"
          onClick={onMenuToggle}>
          <i className="fas fa-fw fa-bars" />
        </a>
        McGill Endowment Browser
      </header>
      <nav className="pure-menu">
        <ul className="pure-menu-list">
          {views.map(renderView)}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
