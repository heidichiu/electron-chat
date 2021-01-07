import React from "react";

const ChatMessagesList = ({ messages = [] }) => {
  console.log(messages);
  return (
    <div className="chat-container">
      <ul className="chat-box chatContainerScroll">
        {messages.map((message) => (
          <li className="chat-left" key={message.id}>
            <div className="chat-avatar">
              <img
                src="https://www.pinclipart.com/picdir/middle/133-1331433_free-user-avatar-icons-happy-flat-design-png.png"
                alt="Retail Admin"
              />
              <div className="chat-name">Test User 1</div>
            </div>
            <div className="chat-text-wrapper">
              <span className="chat-text">{message.content}</span>
              <span className="chat-spacer"></span>
              <div className="chat-hour">{message.timestamp}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatMessagesList;
