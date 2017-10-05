import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

function ViewItem ({ view, ...rest }) {
  return (
    <Menu.Item as="a" {...rest}>
      <Icon name={view.icon} />
      {view.name}
    </Menu.Item>
  )
}

function ViewSelector ({ views, activeViewIndex, makeViewItemOnClick }) {
  const renderViewItem = (view, index) => {
    const props = {
      active: activeViewIndex === index,
      onClick: makeViewItemOnClick(index),
      view
    }

    return <ViewItem {...props} />
  }

  return (
    <Menu secondary fluid pointing vertical>
      {views.map(renderViewItem)}
    </Menu>
  )
}

const mapStateToProps = ({ activeViewIndex, views }) => ({
  activeViewIndex,
  views
})

const mapDispatchToProps = (dispatch, { index }) => ({
  makeViewItemOnClick: index => () => dispatch({
    type: 'SELECT_VIEW',
    index
  })
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewSelector)
