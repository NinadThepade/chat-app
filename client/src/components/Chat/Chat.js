import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import './Chat.css';

let socket;

// location comes from react-router
const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
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

  return (
    <div className="outerContainer">
      Chat Component
    </div>
  );
}

export default Chat;