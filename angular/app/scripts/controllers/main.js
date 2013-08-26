'use strict';

angular.module('angularApp')
  .controller('MainCtrl', ['$scope','midiservice', function ($scope,midiservice) {
      $scope.midiInputs = midiservice.getInputs();
      $scope.midiOutputs = midiservice.getOutputs();
    }]);