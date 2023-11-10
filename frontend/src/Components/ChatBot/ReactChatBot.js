import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import "./ReactChatBot.css";
import { useEffect, useState } from "react";
import { BiMessage } from "react-icons/bi";
import { FaRobot } from "react-icons/fa";
import { ChatBot } from "react-simple-chatbot";

const ReactChatBot = () => {
  const [showBot, setShowBot] = useState(false);
  const [showMessage, setShowMessage] = useState(true);

  const saveMessages = (messages, HTMLString) => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem("chat_messages"));
    return messages;
  };

  const handleShowMessage = () => {
    setShowMessage(false);
  };

  return (
    <>
      <div className="chatbox">
        {showBot && (
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            messageHistory={loadMessages()}
            saveMessages={saveMessages}
          />
        )}
        {showMessage && (
          <div className="message-main">
            <div className="message-container">
              <span onClick={handleShowMessage}>x</span>
              <div className="message">
                <p>Ask to ChatBot If you have any queries</p>
              </div>
            </div>
          </div>
        )}
        <button
          className="chatbtn"
          onClick={() => {
            setShowBot(!showBot);
            setShowMessage(false);
          }}
        >
          <FaRobot />
        </button>
      </div>
    </>
  );
};

export default ReactChatBot;
