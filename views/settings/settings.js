'strict mode'
const ipcRenderer = require('electron').ipcRenderer
// If using in renderer process
const {dialog} = require('electron').remote

let menu = document.querySelector('.items')
menu.addEventListener('click', function(e){
  showContent(e.target.id)
})

showContent = function(id){
  let items = document.getElementsByTagName('li')
  for(let i = 0; i < items.length; i++){
    document.querySelector('#' + items[i].id + '-content').style.display = 'none'
    document.querySelector('#' + items[i].id).style.borderBottom = 'none'
  }
  document.querySelector('#' + id + '-content').style.display = 'block'
  document.querySelector('#' + id).style.borderBottom = '5px solid cyan'
}

let closeSettings = document.getElementById('close-settings')
closeSettings.addEventListener('click', function () {
  ipcRenderer.send('close-settings')
})

let buttonAdd = document.getElementById('buttonAdd')
buttonAdd.addEventListener('click', function() {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory', 'multiSelections']
  }, function(result){
    addFolders(result)
  })
})

function addFolders(folders){
  var folderList = document.querySelector('.folders-list')
  for(let i = 0; i < folders.length; i++){
    let newItem = document.createElement('li')
    newItem.innerHTML = folders[i]
    newItem.id = 'folder-' + i
    newItem.setAttribute('title', folders[i])
    folderList.appendChild(newItem)
  }
}

document.querySelector('.folders-list').addEventListener('click', function(e){
  if (e.target && e.target.nodeName === 'LI'){
    toggleSelected(e.target.id)
  }
})

function toggleSelected(element){
  var currentItem = document.getElementById(element)
  if(currentItem.className == 'selected'){
    currentItem.className = ''
  }else{
    currentItem.className = 'selected'
  }
}

let removeButton = document.getElementById('buttonRemove')
removeButton.addEventListener('click', function(){
  var items = document.querySelectorAll('.folders-list li.selected')
  for(let i = items.length - 1; i >= 0; i--){
    if (items[i].className == 'selected'){
      document.querySelector('.folders-list').removeChild(items[i])
    }
  }
})
