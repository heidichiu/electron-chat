import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { subscribeToChat, subscribeToProfile } from "../actions/chats";
import ChatMessagesList from "../components/ChatMessagesList";
import ChatUsersList from "../components/ChatUsersList";
import ViewTitle from "../components/shared/ViewTitle";
import { withBaseLayout } from "../layouts/Base";

const Chat = () => {
  const dispatch = useDispatch();
  const peopleWatchers = useRef({});
  const { id } = useParams();
  const activeChat = useSelector(({ chats }) => chats.activeChats[id]);
  const joinedUsers = activeChat?.joinedUsers;

  useEffect(() => {
    const unsubFromChat = dispatch(subscribeToChat(id));
    return () => {
      ubsubFromChat();
      unSubFromJoinedUsers();
    };
  }, []);

  useEffect(() => {
    joinedUsers && subscribeToJoinedUsers(joinedUsers);
  }, [joinedUsers]);

  const subscribeToJoinedUsers = (jUsers) => {
    jUsers.forEach((user) => {
      if (!peopleWatchers.current[user.uid]) {
        peopleWatchers.current[user.uid] = dispatch(
          subscribeToProfile(user.uid, id)
        );
      }
    });
  };

  const unSubFromJoinedUsers = () => {
    Object.keys(peopleWatchers.current).forEach((id) =>
      peopleWatchers.current[id]()
    );
  };

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
