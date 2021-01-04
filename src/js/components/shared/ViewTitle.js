import React from "react";
import { Link } from "react-router-dom";

const ViewTitle = ({ text }) => {
  return (
    <div className="chat-name-container">
      <span className="name">{text}</span>
    </div>
  );
};

export default ViewTitle;
