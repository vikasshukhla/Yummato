import React from 'react'

const ChatHeader = ({closeChat}) => {
  return (
    <div className='chat-header'>
        <h2>Chatbot</h2>
        <button onClick={closeChat}>x</button>
    </div>
  )
}

export default ChatHeader