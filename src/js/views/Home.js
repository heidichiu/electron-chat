import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchChats } from "../actions/chats";
import AvailableChatsList from "../components/AvailableChatsList";
import JoinedChatsList from "../components/JoinedChatsList";
import ViewTitle from "../components/shared/ViewTitle";
import { withBaseLayout } from "../layouts/Base";
import Notification from "../utils/notifications";

const Home = () => {
  const dispatch = useDispatch();
  // const chats = useSelector(({ chats }) => chats.items);

  useEffect(() => {
    Notification.setup();
    dispatch(fetchChats());
  }, [dispatch]);

  return (
    <div className="row no-gutters fh">
      <div className="col-3 fh">
        <JoinedChatsList chats={[]} />
      </div>
      <div className="col-9 fh">
        <ViewTitle text="Choose Your Channel">
          <Link className="btn btn-outline-primary" to="/chatCreate">
            New
          </Link>
        </ViewTitle>

        <AvailableChatsList chats={[]} />
      </div>
    </div>
  );
};

export default withBaseLayout(Home, { canGoBack: false });
