import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { subscribeToChat } from "../actions/chats";
import ChatMessagesList from "../components/ChatMessagesList";
import ChatUsersList from "../components/ChatUsersList";
import ViewTitle from "../components/shared/ViewTitle";
import { withBaseLayout } from "../layouts/Base";

const Chat = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const activeChat = useSelector(({ chats }) => chats.activeChats[id]);

  useEffect(() => {
    const unsubFromChat = dispatch(subscribeToChat(id));
    return () => {
      ubsubFromChat();
    };
  }, []);

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUsersList users={activeChat?.joinedUsers} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Channel: ${activeChat?.name}`} />
        <ChatMessagesList />
      </div>
    </div>
  );
};

export default withBaseLayout(Chat, { canGoBack: true });
