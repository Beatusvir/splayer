'use strict'

function PlayControlsController(AppService, SettingsService) {
  var ctrl = this
  ctrl.play = function() {
    console.log('play clicked')
    var songs = SettingsService.getSongs()
    console.log(songs[0])
    AppService.play(songs[0])
  }

  ctrl.previous = function(){
    console.log('previous clicked')
  }

  ctrl.stop = function(){
    console.log('stop clicked')
  }

  ctrl.next = function(){
    console.log('next clicked')
  }
}

app.component('playControls', {
  templateUrl: '../components/playControls/play-controls.html',
  controller: PlayControlsController
})