import React from 'react'

function Content (props) {
  return (
    <div className="content pure-u-1 pure-u-md-3-5 pure-u-lg-2-3 pure-u-xl-3-4">
      {props.children}
    </div>
  )
}

export default Content
