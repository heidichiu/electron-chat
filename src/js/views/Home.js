import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../actions/chats";
import AvailableChatsList from "../components/AvailableChatsList";
import JoinedChatsList from "../components/JoinedChatsList";
import ViewTitle from "../components/shared/ViewTitle";

const Home = () => {
  const dispatch = useDispatch();
  const chats = useSelector(({ chats }) => chats.items);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatsList chats={chats} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text="Choose Your Channel" />
        <AvailableChatsList chats={chats} />
      </div>
    </div>
  );
};

export default Home;
