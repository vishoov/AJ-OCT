
import './App.css'

import { io } from 'socket.io-client';
import { useEffect } from 'react';

function App() {
  const socket = io("http://localhost:3000")

  useEffect(()=>{
    socket.on('connect', ()=>{
      console.log(`The client is connected to the server`)
    })
  })

  return (
    <>
    <h1>Welcome to the chat app</h1>
    </>
  )
}

export default App
