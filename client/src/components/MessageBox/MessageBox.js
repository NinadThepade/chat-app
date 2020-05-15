import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from './Message/Message'

import './MessageBox.css'

const MessageBox = ({messages, name}) => (
  <ScrollToBottom className="messageBox">
    {messages.map((message, index) => (
      <div key={index}>
        <Message name={name} message={message} />
      </div>
    ))}
  </ScrollToBottom>
)

export default MessageBox