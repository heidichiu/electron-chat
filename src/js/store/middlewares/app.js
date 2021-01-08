import Notification from "../../utils/notifications";

const appMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case "APP_IS_ONLINE":
    case "APP_IS_OFFLINE":
      Notification.show({
        title: "Connection Status",
        body: action.isOnline ? "Online" : "Offline",
      });
    case "AUTH_LOGOUT_SUCCESS": {
      const { messagesSubs } = store.getState().chats;
      if (messagesSubs) {
        Object.keys(messagesSubs).forEach((messageSub) =>
          messagesSub[messageSub]()
        );
      }
    }
  }
  next(action);
};

export default appMiddleware;
