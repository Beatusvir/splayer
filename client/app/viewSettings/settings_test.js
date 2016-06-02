// const settings = require('settings.js')
describe('Calculator', function() {

  beforeEach(module('sPlayer'))

	it('should create extensions', inject(function($controller){
    var scope = {}
    var ctrl = $controller('SettingsController', {$scope: scope})

    expect(scope.extensions.length).toBe(2)

  }))

})
