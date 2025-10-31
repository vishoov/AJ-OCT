
import './App.css'

import { io } from 'socket.io-client';
import { useEffect, useMemo, useState } from 'react';

function App() {
  const socket = useMemo(()=>io("http://localhost:3000"), []);

  const [messages, setMessages] = useState([])
  const [socketId, setsocketId] = useState("")
  useEffect(()=>{
    socket.on('connect', ()=>{
      setsocketId(socket.id)
      console.log(`The client is connected to the server ${socketId}`)
    })

    console.log(socket)

    socket.on("forward", (message)=>{
      console.log(message)
      setMessages([...messages, message])
    })
  })
  const handleSubmit = (e)=>{
    e.preventDefault();
    const message = e.target[0].value;
    const reciever = e.target[1].value;
    socket.emit("message", {message, reciever})
  }
  return (
    <>
    <h1>Welcome to the chat app</h1>
    <h2>{socketId}</h2>
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Message'/>
      <input type="text" placeholder='Reciever' />
      <button type='submit'>Send</button>
    </form>
<ul>
    {messages.map((message, index)=>{
        return <li key={index}>{message}</li>})
    
    }
    </ul>
    </>
  )
}

export default App
