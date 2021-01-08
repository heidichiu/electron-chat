const { app, BrowserWindow, Notification, ipcMain, Menu } = require("electron");
const path = require("path");

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "#6e707e",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  isDev && win.webContents.openDevTools();
}

if (isDev) {
  require("electron-reload")(__dirname, {
    //electron: path.join(__dirname, "node_modules", ".bin", "electron.cmd"),
    electron: process.execPath,
  });
}

app.whenReady().then(() => {
  const template = require("./utils/Menu").createTemplate(app);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  createWindow();
});

ipcMain.on("notify", (_, message) => {
  const notification = new Notification({
    title: "Notification",
    body: message,
  });
  notification.show();
});

ipcMain.on("app-quit", () => {
  app.quit();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
