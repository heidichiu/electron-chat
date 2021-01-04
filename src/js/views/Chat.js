import React from "react";
import { useParams } from "react-router-dom";
import ChatMessagesList from "../components/ChatMessagesList";
import ChatUsersList from "../components/ChatUsersList";
import ViewTitle from "../components/shared/ViewTitle";

const Chat = () => {
  const { id } = useParams();
  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUsersList />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Joined channel: ${id}`} />
        <ChatMessagesList />
      </div>
    </div>
  );
};

export default Chat;
