require('../../renderer.js')
const ipcRenderer = require('electron').ipcRenderer

let restorePlayerButton = document.getElementById('show-player')
restorePlayerButton.addEventListener('click', function () {
  ipcRenderer.send('show-player')
})

let closeButton = document.getElementById('close-mini-player')
closeButton.addEventListener('click', function () {
  ipcRenderer.send('close-player')
})
