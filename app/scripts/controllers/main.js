'use strict';

angular.module('angularApp')
  .controller('MainCtrl', ['$scope','Midiputs', function ($scope,midiputs) {

	$scope.midiInputs = midiputs.inputs;
	$scope.midiOutputs = midiputs.outputs;
	$scope.widgets = [{
		id: "widget-1",
		name:"midiwidget"
	}];

}]);