'use strict';

angular.module('angularApp')
  .controller('MainCtrl', ['$scope','midiservice', function ($scope,midiservice) {

	$scope.midiInputs = midiservice.inputs;
	$scope.midiOutputs = midiservice.outputs;

    }]);