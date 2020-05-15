import React from 'react'
import ReactEmoji from 'react-emoji'

import './Message.css'

const Message = ({name, message: {user, text}}) => {
  let isSentByCurrentUser = false;

  const formattedName = name.trim().toLowerCase();

  if(user === formattedName) {
    isSentByCurrentUser = true
  }

  return(
    isSentByCurrentUser ? (
      <div className="messageContainer justifyEnd">
        <p className="sentText pr-10">{formattedName}</p>
        <div className="messages backgroundBlue">
          <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
        </div>
      </div>
    ) : (
      <div className="messageContainer justifyStart">
        <div className="messages backgroundLight">
          <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
        </div>
        <p className="sentText pl-10">{user}</p>
      </div>
    )
  )
}

export default Message