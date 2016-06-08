'use strict'

let ipcRenderer = require('electron').ipcRenderer
let remote = require('electron').remote

app.factory('AppService', ['$rootScope', function ($rootScope) {
  ipcRenderer.on('show-file-dialog-callback', (event, args) => {
    $rootScope.folders = args
    $rootScope.$emit('folders-changed', args)
  })
  return {
    showSettings: () => {
      ipcRenderer.send('show-settings')
    },
    closeSettings: () => {
      ipcRenderer.send('close-settings')
    },
    closePlayer: () => {
      ipcRenderer.send('close-player')
    },
    togglePlayer: () => {
      ipcRenderer.send('toggle-player')
    },
    play: (song) => {
      ipcRenderer.send('play-pause', song)
    },
    log: (message) => {
      ipcRenderer.send('log', message)
    },setSongs: (songs) => {
      ipcRenderer.send('set-songs', songs)
    },
    getSongs: () => {
      return remote.getGlobal('songs')
    },
    showFileDialog: () => {
      ipcRenderer.send('show-file-dialog')
    }
  }
}])
