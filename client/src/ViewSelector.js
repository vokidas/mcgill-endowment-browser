import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react'

function ViewItem (props) {
  const { view, ...other } = props

  return (
    <Menu.Item as="a" {...other}>
      <Icon name={view.icon} />
      {view.name}
    </Menu.Item>
  )
}

class ViewSelector extends Component {
  makeViewItem = (view, i) => {
    const props = {
      active: this.props.activeIndex === i,
      view: view,
      onClick: () => this.props.setActiveIndex(i)
    }

    return <ViewItem key={i} {...props} />
  }

  render () {
    return (
      <Menu secondary fluid pointing vertical>
        {this.props.views.map(this.makeViewItem)}
      </Menu>
    )
  }
}

export default ViewSelector
