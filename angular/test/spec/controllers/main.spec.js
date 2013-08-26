'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module

  beforeEach(module('angularApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it("should attach a midiInputs array to the scope", function() {
    expect(scope.midiInputs).toBeDefined();
  });

  it("should attach a midiOutputs array to the scope", function() {
    expect(scope.midiOutputs).toBeDefined();
  });

});
