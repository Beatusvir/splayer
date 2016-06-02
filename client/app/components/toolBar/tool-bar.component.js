'use strict'
const ipcRenderer = require('electron').ipcRenderer

function ToolBarController() {
  var ctrl = this

  ctrl.togglePlayer = function () {
    ipcRenderer.send('toggle-player')
  }

  ctrl.showSettings = function () {
    ipcRenderer.send('show-settings')
  }

  ctrl.closePlayer = function () {
    ipcRenderer.send('close-player')
  }
}

app.component('toolBar', {
  templateUrl: '../components/toolBar/tool-bar.html',
  controller: ToolBarController
})