// components/ChatComponent.jsx
import React, { useState } from 'react';
import { ChevronLeft, Users, Send } from 'lucide-react';

const ChatComponent = ({ selectedPickup, onBack }) => {

  const [messages, setMessages] = useState([
    { id: 1, sender: 'donor', text: 'Hello! Food is ready.', time: '2:25 PM' },
    { id: 2, sender: 'ngo', text: 'Thank you! On the way.', time: '2:26 PM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const msg = {
      id: messages.length + 1,
      sender: 'ngo',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, msg]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="bg-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          <button onClick={onBack} className="flex items-center text-gray-600 hover:text-green-600">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          <h2 className="text-xl font-bold text-gray-800">Chat with {selectedPickup.restaurant}</h2>
          <div className="w-20"></div>
        </div>
      </div>

      <div className="p-4 h-screen flex flex-col">
        <div className="flex-1 bg-white rounded-xl shadow-lg flex flex-col">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 flex items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">{selectedPickup.restaurant}</h3>
              <p className="text-sm opacity-90">Online now</p>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'ngo' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs px-4 py-2 rounded-xl ${msg.sender === 'ngo' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'ngo' ? 'text-green-100' : 'text-gray-500'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button onClick={handleSendMessage} className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
