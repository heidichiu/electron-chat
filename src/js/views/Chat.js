import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  sendChatMessage,
  subscribeToChat,
  subscribeToMessages,
  subscribeToProfile,
} from "../actions/chats";
import ChatMessagesList from "../components/ChatMessagesList";
import ChatUsersList from "../components/ChatUsersList";
import Messenger from "../components/Messenger";
import LoadingView from "../components/shared/LoadingView";
import ViewTitle from "../components/shared/ViewTitle";
import { withBaseLayout } from "../layouts/Base";

const Chat = () => {
  const dispatch = useDispatch();
  const peopleWatchers = useRef({});
  const { id } = useParams();
  const activeChat = useSelector(({ chats }) => chats.activeChats[id]);
  const messages = useSelector(({ chats }) => chats.messages[id]);
  const joinedUsers = activeChat?.joinedUsers;

  useEffect(() => {
    const unsubFromChat = dispatch(subscribeToChat(id));
    dispatch(subscribeToMessages(id));
    return () => {
      unsubFromChat();
      unSubFromJoinedUsers();
    };
  }, []);

  useEffect(() => {
    joinedUsers && subscribeToJoinedUsers(joinedUsers);
  }, [joinedUsers]);

  const sendMessage = useCallback(
    (message) => {
      dispatch(sendChatMessage(message, id));
    },
    [id]
  );

  const subscribeToJoinedUsers = useCallback(
    (jUsers) => {
      jUsers.forEach((user) => {
        if (!peopleWatchers.current[user.uid]) {
          peopleWatchers.current[user.uid] = dispatch(
            subscribeToProfile(user.uid, id)
          );
        }
      });
    },
    [dispatch, id]
  );

  const unSubFromJoinedUsers = useCallback(() => {
    Object.keys(peopleWatchers.current).forEach((id) =>
      peopleWatchers.current[id]()
    );
  }, [peopleWatchers.current]);

  if (!activeChat?.id) {
    return <LoadingView message="Loading chat..." />;
  }

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <ChatUsersList users={activeChat?.joinedUsers} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text={`Channel: ${activeChat?.name}`} />
        <ChatMessagesList messages={messages} />
        <Messenger onSubmit={sendMessage} />
      </div>
    </div>
  );
};

export default withBaseLayout(Chat, { canGoBack: true });
