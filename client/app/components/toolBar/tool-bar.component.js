'use strict'

function ToolBarController(AppService) {
  var ctrl = this

  ctrl.togglePlayer = function () {
    AppService.togglePlayer()
  }

  ctrl.showSettings = function () {
    AppService.showSettings()
  }

  ctrl.closePlayer = function () {
    AppService.closePlayer()
  }
}

app.component('toolBar', {
  templateUrl: '../components/toolBar/tool-bar.html',
  controller: ToolBarController
})