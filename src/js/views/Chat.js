import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { subscribeToChat } from "../actions/chats";
import ChatMessagesList from "../components/ChatMessagesList";
import ChatUsersList from "../components/ChatUsersList";
import ViewTitle from "../components/shared/ViewTitle";
import { withBaseLayout } from "../layouts/Base";

const Chat = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  useEffect(() => {
    const unsubFromChat = dispatch(subscribeToChat(id));
    return () => {
      ubsubFromChat();
    };
  }, []);

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

export default withBaseLayout(Chat, { canGoBack: true });
