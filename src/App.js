import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './normal.css';

function App() {
  const [chatButtons, setChatButtons] = useState([]);

  const handleNewChat = () => {
    setChatButtons([...chatButtons, <div className='side-menu-button'>New Chat</div>]);
  }

  return (
    <div className="App">
      <aside className='sidemenu'>
        <div className='side-menu-button' onClick={handleNewChat}>
          <span>
            +
          </span>
          New Chat
        </div>
        {chatButtons} {}
      </aside>  
      <section className='chatbox'>
        <div className='chat-log'>
          <div className='chat-message'>
            <div 
            className='chat-message-center'>
              <div className='avatar'>

              </div>
              <div className='message'>
                  Hello world
              </div>
            </div>
          </div>
          <div className='chat-message chatgpt'>
            <div 
            className='chat-message-center'>
              <div className='avatar chatgpt'>

              </div>
              <div className='message'>
                  I am villain
              </div>

            </div>
          </div>
        </div>
        <div
        className="chat-input-holder">
          <textarea
          rows="1"
          className="chat-input-textarea"
          placeholder = "Type Your message here">
          </textarea>
          <button className="chat-send-button">Send</button>
        </div>
      </section>
    </div>
  );
}

export default App;
