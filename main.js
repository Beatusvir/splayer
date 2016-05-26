const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let miniWindow
let settingsWindow

function createWindow() {
  mainWindow = new BrowserWindow({ width: 250, height: 250, frame: false })
  mainWindow.setMenu(null)
  mainWindow.loadURL(`file://${__dirname}/views/index.html`)

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

function createMiniWindow() {
  miniWindow = new BrowserWindow({ width: 250, height: 75, frame: false })
  miniWindow.setMenu(null)
  miniWindow.loadURL(`file://${__dirname}/views/index-mini.html`)

  miniWindow.on('closed', function () {
    miniWindow = null
  })
}

function createSettingsWindow() {
  settingsWindow = new BrowserWindow({ width: 500, height: 500, frame: false })
  settingsWindow.setMenu(null)
  settingsWindow.loadURL(`file://${__dirname}/views/settings.html`)

  settingsWindow.on('closed', function () {
    settingsWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
  createWindow()
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const ipcMain = electron.ipcMain
ipcMain.on('close-player', function (event, args) {
  app.quit()
})
ipcMain.on('show-mini-player', function () {
  mainWindow.hide()
  createMiniWindow()
})
ipcMain.on('show-player', function () {
  miniWindow.close()
  mainWindow.show()
})
ipcMain.on('show-settings', function() {
  createSettingsWindow()
})
ipcMain.on('close-settings', function() {
  settingsWindow.close()
})
