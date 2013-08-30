'use strict';

angular.module('angularApp')
  .controller('MainCtrl', ['$scope','Midiputs', 'widgets',function ($scope,midiputs,widgets) {

	$scope.midiInputs = midiputs.inputs;
	$scope.midiOutputs = midiputs.outputs;
	$scope.widgets = widgets.widgets;

}]);