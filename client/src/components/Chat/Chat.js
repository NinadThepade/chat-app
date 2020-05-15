import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import './Chat.css';
import InfoBar from "../InfoBar/InfoBar";
import InputBox from "../InputBox/InputBox";
import MessageBox from "../MessageBox/MessageBox"

let socket;

// location comes from react-router
const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);
    
    socket.emit('join', {name, room}, () => {
      console.log('Callback called')
    })

    return () => {
      socket.emit('disconnect')

      socket.off()
    }
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  const sendMessage = (event) => {
    event.preventDefault()

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <InfoBar room={room} />
        <MessageBox messages={messages} name={name} />
        <InputBox message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;