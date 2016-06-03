const ipcRenderer = require('electron').ipcRenderer
const {dialog} = require('electron').remote
const fs = require('fs')

app.factory('SettingsFactory', function(){
  closeSettings = function () {
    ipcRenderer.send('close-settings')
  }

  showFileDialog = function () {
    dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory', 'multiSelections']
    }, function (result) {
      addFolders(result)
    })
  }

  function updateSongs(folders) {
    for (let i = 0; i < folders.length; i++) {
      processFolder(folders[i])
    }
  }

  function processFolder(folder) {
    var folderSeparator = ''
    if (folder.indexOf('/') >= 0) {
      folderSeparator = '/'
    } else {
      folderSeparator = '\\'
    }
    var files = fs.readdir(folder, function (err, files) {
      for (var index in files) {
        try {
          var currentFile = folder + folderSeparator + files[index]
          if (fs.lstatSync(currentFile).isDirectory()) {
            processFolder(currentFile)
          } else {
            if ($scope.extensions.indexOf(getExtension(currentFile).toUpperCase()) >= 0) {
              $scope.songs.push(currentFile)
            }
          }
          $scope.$apply()
        } catch (err) {
          ipcRenderer.send('log', err.message)
        }
      }
    })
  }

  function getExtension(file) {
    return file.substr(file.lastIndexOf('.') + 1).trim()
  }
})