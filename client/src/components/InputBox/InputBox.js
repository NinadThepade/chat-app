import React from 'react'

import './InputBox.css'

const InputBox = ({message, setMessage, sendMessage}) => (
  <form className="inputBox">
    <input 
      className="input"
      type="text"
      placeholder="Message here...."
      value={message} 
      onChange={(event) => setMessage(event.target.value) }
      onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null} 
    />
    <button className="sendButton" onClick={(event) => sendMessage(event)}>Send</button>
  </form>
)

export default InputBox