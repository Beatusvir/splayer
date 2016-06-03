'use strict'

let ipcRenderer = require('electron').ipcRenderer
let remote = require('electron').remote

app.service('AppService', [function(){
  this.showSettings = function(){
    ipcRenderer.send('show-settings')
  }

  this.closeSettings = function() {
    ipcRenderer.send('close-settings')
  }

  this.closePlayer = function() {
    ipcRenderer.send('close-player')
  }

  this.togglePlayer = function() {
    ipcRenderer.send('toggle-player')
  }

  this.play = function(song){
    ipcRenderer.send('play-pause', song)
  }

  this.log = function(message){
    ipcRenderer.send('log', message)
  }

  this.setSongs = function(songs){
    ipcRenderer.send('set-songs', songs)
  }

  this.getSongs = function(){
    return remote.getGlobal('songs')
  }

}])