'strict mode'
const ipcRenderer = require('electron').ipcRenderer
// If using in renderer process
const {dialog} = require('electron').remote
const fs = require('fs')

const extensions = ['MP3', 'FLAC']

let totalFiles = 0
let songs = []

let menu = document.querySelector('.items')
menu.addEventListener('click', function(e) {
  showContent(e.target.id)
})

showContent = function(id) {
  let items = document.querySelectorAll('.items li')
  for (let i = 0; i < items.length; i++) {
    document.querySelector('#' + items[i].id + '-content').style.display = 'none'
    document.querySelector('#' + items[i].id).style.borderBottom = '5px solid transparent'
    document.querySelector('#' + items[i].id).style.transition = 'all 0.5s ease'
  }
  document.querySelector('#' + id + '-content').style.display = 'block'
  document.querySelector('#' + id).style.borderBottom = '5px solid cyan'
  document.querySelector('#' + id).style.transition = 'all 0.5s ease'
}

let closeSettings = document.getElementById('close-settings')
closeSettings.addEventListener('click', function() {
  ipcRenderer.send('close-settings')
})

let buttonAdd = document.getElementById('buttonAdd')
buttonAdd.addEventListener('click', function() {
    showFileDialog()
})

function showFileDialog(){
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory', 'multiSelections']
  }, function(result) {
    addFolders(result)
  })
}

function addFolders(folders) {
  var folderList = document.querySelector('.folders-list')
  for (let i = 0; i < folders.length; i++) {
    let newItem = document.createElement('li')
    newItem.innerHTML = folders[i]
    newItem.id = 'folder-' + i
    newItem.setAttribute('title', folders[i])
    folderList.appendChild(newItem)
  }
  updateSongs(folders)
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
  var files = fs.readdir(folder, function(err, files) {
    for (var index in files) {
      try {
        var currentFile = folder + folderSeparator + files[index]
        if (fs.lstatSync(currentFile).isDirectory()) {
          processFolder(currentFile)
        } else {
          if (extensions.indexOf(getExtension(currentFile).toUpperCase()) >= 0) {
            songs.push(currentFile)
          }
        }
      } catch (err) {
        ipcRenderer.send('log', err.message)
      }
    }
    document.getElementById('total-songs').innerHTML = 'Total songs (' + songs.length + ')'
  })
  document.getElementById('total-songs').innerHTML = 'Total songs (' + songs.length + ')'
}

function getExtension(file) {
  return file.substr(file.lastIndexOf('.') + 1).trim()
}

document.querySelector('.folders-list').addEventListener('click', function(e) {
  if (e.target && e.target.nodeName === 'LI') {
    toggleSelected(e.target.id)
  }
})

function toggleSelected(element) {
  var currentItem = document.getElementById(element)
  if (currentItem.className == 'selected') {
    currentItem.className = ''
  } else {
    currentItem.className = 'selected'
  }
}

let removeButton = document.getElementById('buttonRemove')
removeButton.addEventListener('click', function() {
  var items = document.querySelectorAll('.folders-list li.selected')
  for (let i = items.length - 1; i >= 0; i--) {
    if (items[i].className == 'selected') {
      document.querySelector('.folders-list').removeChild(items[i])
    }
  }
})
