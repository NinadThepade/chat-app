import React from 'react'

import './InfoBar.css'

const InfoBar = ({room}) => (
  <div className="infoBar">
    <div className="innerLeftContainer">
      <h3>{room}</h3>
    </div>
    <div className="innerRightContainer">
      <a href="/">
        <button>Close</button>
      </a>
    </div>
  </div>
)

export default InfoBar