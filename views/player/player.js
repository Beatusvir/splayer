require('../../renderer.js')
const ipcRenderer = require('electron').ipcRenderer

let miniPlayerButton = document.getElementById('show-mini-player')
miniPlayerButton.addEventListener('click', function () {
  ipcRenderer.send('show-mini-player')
})

let closeButton = document.getElementById('close-player')
closeButton.addEventListener('click', function () {
  ipcRenderer.send('close-player')
})

let settingsButton = document.getElementById('show-settings')
settingsButton.addEventListener('click', function () {
  ipcRenderer.send('show-settings')
})
