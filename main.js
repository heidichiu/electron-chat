const { app, BrowserWindow, Notification, ipcMain } = require("electron");
const path = require("path");

const isDev = !app.isPackaged;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: "white",
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

app.whenReady().then(createWindow);

ipcMain.on("notify", (_, message) => {
  const notification = new Notification({
    title: "Notification",
    body: message,
  });
  notification.show();
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
