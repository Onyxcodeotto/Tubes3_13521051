import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './normal.css';
import './strmatch/strmatch';
const {getAnswer} = require('./database/IDatabase');

function App() {
  const [chatButtons, setChatButtons] = useState([]);
  const [chatInput, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([{message: "Hello World!", sender: "user"}, {message: "Hello Another World.", sender: "chatgpt"}]);

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

  return (
    <div className="App">
      <aside className='sidemenu'>
        <div className='side-menu-button' onClick={handleNewSession}>
          <span>
            +
          </span>
          New Chat
        </div>
        {chatButtons} {}
      </aside>  
      <section className='chatbox'>
        <div className='chat-log'>
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
        </div>
        <div
        className="chat-input-holder">
          <textarea
          rows="1"
          className="chat-input-textarea"
          placeholder = "Type Your message here"
          value={chatInput}
          onChange={handleMessageChange}
          >
          </textarea>
          <button className="chat-send-button" onClick={handleSend}>Send</button>
        </div>
      </section>
    </div>
  );
}

export default App;
