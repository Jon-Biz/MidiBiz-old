'use strict';

angular.module('angularApp')
  .controller('MainCtrl', ['$scope','mainEngine',function ($scope,mainEngine) {

	$scope.midiInputs = mainEngine.IO.Inputs;
	$scope.midiOutputs = mainEngine.IO.Outputs;
	$scope.widgets = mainEngine.machines;

}]);