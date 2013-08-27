'use strict';

/**
*  Provides midiInput directive
*
* Description
*/

angular.module('midiInput', [])
	.directive('midiinput',function(){
		return{
			restrict:'C',
			template:'<div id="{{input.name}}">Midi Input:{{input.name}}</div>',
			replace:'false',
			link:{
				post: function($scope,element,attrs){
					var scope = $scope;
					jsPlumb.ready(function () {
//TODO - replace with proper callback
						window.setTimeout(function () {
							jsPlumb.draggable(scope.input.name);
							jsPlumb.addEndpoint(scope.input.name,{
								endpoint:"Rectangle",
							    paintStyle:{ width:25, height:21, fillStyle:'#666' },
							    connectorStyle : { strokeStyle:"#666" },
							    isSource:true });
						},100)
					})
				}
			}
		};
	})
	.directive('midioutput',function(){
		return{
			restrict:'C',
			template:'<div id="{{output.name}}">Midi Output:{{output.name}}</div>',
			replace:'false',
			link:{
				post: function($scope,element,attrs){
					var scope = $scope;
					jsPlumb.ready(function () {
//TODO - replace with proper callback
						window.setTimeout(function () {
							jsPlumb.draggable(scope.output.name);
							jsPlumb.addEndpoint(scope.output.name,{
								endpoint:"Rectangle",
							    paintStyle:{ width:25, height:21, fillStyle:'#666' },
							    connectorStyle : { strokeStyle:"#666" },
							    isTarget:true });
						},100)
					})
				}
			}
		};
	});

