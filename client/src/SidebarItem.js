import React from 'react'

function SidebarItem (props) {
  const { active, view, onItemClick } = props
  const { name, icon } = view
  const iconClasses = ['fas', 'fa-fw', icon]
  const liClasses = ['pure-menu-item']

  if (active) {
    liClasses.push('pure-menu-active')
  }

  return (
    <li className={liClasses.join(' ')}>
      <a href="#" className="pure-menu-link"
        onClick={onItemClick}>
        <i className={iconClasses.join(' ')} />
        {name}
      </a>
    </li>
  )
}

export default SidebarItem
