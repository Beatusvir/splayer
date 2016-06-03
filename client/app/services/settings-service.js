app.service('SettingsService', ['AppService', function(AppService){
  this.setSongs = function(newSongs){
    AppService.setSongs(newSongs)
  }

  this.getSongs = function(){
    return AppService.getSongs()
  }
}])