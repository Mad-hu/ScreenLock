/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, Menu, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
let mainWindow: BrowserWindow | null = null;
let lockScreen: any = undefined;
let userClose = process.platform == 'win32'? false : true;

if(process.platform == 'win32') {
  lockScreen = require('./lockScreen.node');
}

function setScreenLock(lock: boolean) {
  if (process.platform === 'win32') {
    if (lock) {
      lockScreen.lock();
    } else {
      lockScreen.unlock();
    }
  }
}

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}



if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const autoRun = () => {
  const exeName = path.basename(process.execPath)
  app.setLoginItemSettings({
    openAtLogin: true,
    openAsHidden: false,
    path: process.execPath,
    args: [
      '--processStart', `"${exeName}"`,
    ]
  })
}
const fullScreen = () => {
  if (process.platform === 'darwin') {
    mainWindow?.setSimpleFullScreen(true);
  } else {
    mainWindow?.setFullScreen(true);
  }
}
const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    // await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    center: true,
    frame: true,
    "resizable": true,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
    },
  });
  // mainWindow.webContents.openDevTools();
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }

    // application auto power on
    if (!app.getLoginItemSettings().openAtLogin) {
      autoRun();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (process.platform === 'darwin') {
    Menu.setApplicationMenu(null);
  } else {
    Menu.setApplicationMenu(null);
  }

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  ipcMain.on('unclock', () => {
    setScreenLock(false);
  });
  ipcMain.on('clock', () => {
    setScreenLock(true);
  });
  ipcMain.on('close-window', () => {
    userClose = true;
    app.exit(0);
  });

  // on the top screen of the window
  setInterval(() => {
    if (!mainWindow?.isAlwaysOnTop()) {
      mainWindow?.setAlwaysOnTop(true);
    }
    if (!mainWindow?.isFocused()) {
      mainWindow?.focus();
    }
    if (mainWindow?.isMinimized()) {
      mainWindow.show();
      fullScreen();
    }
  }, 300);
  // full Screen！
  fullScreen();
  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
