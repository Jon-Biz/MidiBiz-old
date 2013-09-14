'use strict';

angular.module('angularApp')
  .controller('MainCtrl', ['$scope','Midiputs', 'widgets',function ($scope,midiputs,widgets) {

	$scope.midiInputs = midiputs.Inputs;
	$scope.midiOutputs = midiputs.Outputs;
	$scope.widgets = widgets.widgets;

}]);