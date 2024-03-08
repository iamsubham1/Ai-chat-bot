import { React, useState } from 'react'
import './App.css'


const App = () => {

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');



  const sendMessage = async (e) => {


    let data;
    e.preventDefault();
    const userMessage = userInput.trim();
    if (!userMessage) return;

    setMessages(messages => [...messages, { sender: 'You', text: userMessage }]);
    setUserInput('');

    const url = 'https://chatgpt-api8.p.rapidapi.com/';
    const payload = JSON.stringify([
      {
        content: userMessage,
        role: 'user',
      },
    ])
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '40b8311690msh7ca4c931665db33p18c6f1jsn60bc4c37a781',
        'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com'
      },
      body: payload
    };

    try {
      const response = await fetch(url, options);
      data = await response.json();
      console.log(data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    // Add chatbot response to the chat
    setMessages(messages => [...messages, { sender: 'Bot', text: data }]);
  };
  return (
    <div className="app">
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender.toLowerCase()}`}>
            {message.sender === 'You' ? (
              <span>{message.sender}: {message.text}</span>
            ) : (
              <span>{message.text} :{message.sender}</span>
            )}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="message-form">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  )
}

export default App
