const electron = require('electron')
require('electron-debug')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const dialog = electron.dialog

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let miniWindow
let settingsWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 250,
    height: 250,
    frame: false,
    maximizable: false,
    center: true
  })
  mainWindow.setMenu(null)
  mainWindow.loadURL(`file://${__dirname}/client/app/viewPlayer/player.html`)
  //mainWindow.openDevTools({ detach: true })

  mainWindow.on('closed', function () {
    mainWindow = null
  })
  mainWindow.on('move', function () {
    // let x = mainWindow.getBounds().x
    // let y = mainWindow.getBounds().y
    // Save position
  })
}

function createMiniWindow() {
  miniWindow = new BrowserWindow({
    width: 250,
    height: 75,
    frame: false,
    maximizable: false,
    center: true
  })
  miniWindow.setMenu(null)
  miniWindow.loadURL(`file://${__dirname}/client/app/viewMiniPlayer/mini-player.html`)
  //miniWindow.openDevTools({ detach: true })

  miniWindow.on('closed', function () {
    miniWindow = null
  })
}

function createSettingsWindow() {
  settingsWindow = new BrowserWindow({
    width: 500,
    height: 500,
    frame: false,
    maximizable: false,
    center: true
  })
  settingsWindow.setMenu(null)
  settingsWindow.loadURL(`file://${__dirname}/client/app/viewSettings/settings.html`)
  settingsWindow.openDevTools({ detach: true })

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
ipcMain.on('toggle-player', function () {
  var currentWindow = BrowserWindow.getFocusedWindow()
  if (currentWindow === mainWindow) {
    mainWindow.hide()
    createMiniWindow()
  } else if (currentWindow === miniWindow) {
    miniWindow.close()
    mainWindow.show()
  }
})
ipcMain.on('show-settings', function () {
  mainWindow.hide()
  createSettingsWindow()
})
ipcMain.on('close-settings', function () {
  settingsWindow.close()
  mainWindow.show()
})
ipcMain.on('log', function (event, args) {
  console.log(args)
})
ipcMain.on('play-pause', function(){

})
ipcMain.on('previous', function(){

})
ipcMain.on('next', function(){

})
ipcMain.on('stop', function(){

})