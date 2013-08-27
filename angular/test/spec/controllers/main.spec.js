'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module

  beforeEach(module('angularApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and mocks
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      midiservice: midiservicemock
    });
  }));

  it("should attach a midiInputs array to the scope", function() {
    expect(scope.midiInputs).toBeDefined();
  });

  describe("scope.midiInputs", function() {
    it("should have length 1 (from stub)", function() {
      expect(scope.midiInputs.length).toEqual(1);
    });
  });

  it("should attach a midiOutputs array to the scope", function() {
    expect(scope.midiOutputs).toBeDefined();
  });

});
