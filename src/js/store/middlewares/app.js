import Notification from "../../utils/notifications";
import Storage from "../../utils/storage";

const appMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case "APP_IS_ONLINE":
    case "APP_IS_OFFLINE":
      Notification.show({
        title: "Connection Status",
        body: action.isOnline ? "Online" : "Offline",
      });
    case "SETTINGS_UPDATE": {
      const { setting, value } = action;
      const currentSettings = Storage.getItem("app-settings");

      const settings = { ...currentSettings, [setting]: value };

      Storage.setItem("app-settings", settings);
    }
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
