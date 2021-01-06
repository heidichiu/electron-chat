import Notification from "../../utils/notifications";

const appMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case "APP_IS_ONLINE":
    case "APP_IS_OFFLINE":
      Notification.show({
        title: "Connection Status",
        body: action.isOnline ? "Online" : "Offline",
      });
  }
  next(action);
};

export default appMiddleware;
