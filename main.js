const { app, BrowserWindow, Notification, ipcMain, Menu } = require("electron");
const path = require("path");

const isDev = !app.isPackaged;

function createSplashWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 200,
    backgroundColor: "#6e707e",
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    },
  });
  win.loadFile("splash.html");
  return win;
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
  isDev && win.webContents.openDevTools();
  return win;
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

  const splash = createSplashWindow();
  const mainApp = createWindow();

  mainApp.once("ready-to-show", () => {
    setTimeout(() => {
      splash.destroy();
      mainApp.show();
    }, 1000);
  });
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
