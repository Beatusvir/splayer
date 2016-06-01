//require('../../renderer.js')
const ipcRenderer = require('electron').ipcRenderer

app.controller('PlayerController', ['$scope', function ($scope) {
  $scope.showMiniPlayer = function(){
    ipcRenderer.send('show-mini-player')
  }

  $scope.showSettings = function(){
    ipcRenderer.send('show-settings')
  }

  $scope.closePlayer = function(){
    ipcRenderer.send('close-player')
  }

}])