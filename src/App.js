
import logo from './logo.svg';
import './App.css';
import './normal.css';
<<<<<<< HEAD
import './strmatch/strmatch.js';
import React, { useState, useEffect, useRef } from 'react';
import {getAnswer}  from './database/IDatabase';
=======
import './strmatch/strmatch.js';
import {getAnswer}  from './database/IDatabase';
>>>>>>> 1900f8f46d6f837d7ce1cfc62fa4a7bd263f359e

function App() {
  const [chatButtons, setChatButtons] = useState([]);
  const [chatInput, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([{message: "Hello World!", sender: "user"}, {message: "Hello Another World.", sender: "chatgpt"}]);
  const chatLogRef = useRef(null);

  const handleNewSession = () => {
    setChatButtons([...chatButtons, <div className='side-menu-button'>New Session</div>]);
  }
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  }
  const handleSend = () => {
    if (chatInput) {
      const newMessage = {
        message: chatInput,
        sender: 'user'
      };
      setMessage('');

      const replyMessage = {
        message: 'reply',
        sender: 'chatgpt'
      }
      setChatLog([...chatLog, newMessage, replyMessage]);
    }
  }

  useEffect(() => {
    chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
  }, [chatLog]);

  return (
    <div className="App">
      <aside className='sidemenu'  style={{overflowY: 'auto'}} >
        <div className='side-menu-button' onClick={handleNewSession}>
          <span>
            +
          </span>
          New Chat
        </div>
        {chatButtons} {}
      </aside>  
      <section className='chatbox'  style={{overflowY: 'auto'}} >
        <div className='chat-log' ref={chatLogRef}>
          {chatLog.map((chat, index) => (
            <div key={index} className={`chat-message ${chat.sender}`}>
              <div className='chat-message-center'>
                <div className={`avatar ${chat.sender}`}>
                </div>
                <div className='message'>
                  {chat.message}
                </div>
              </div>
            </div>
          ))}
          <div className="chat-input-holder">
            <textarea
              rows="1"
              className="chat-input-textarea"
              placeholder="Type Your message here"
              value={chatInput}
              onChange={handleMessageChange}
            ></textarea>
            <button className="chat-send-button" onClick={handleSend}>Send</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
