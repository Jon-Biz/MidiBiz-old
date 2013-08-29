'use strict';

/* global jsPlumb */


/**
*  Provides midiInput directive
*
* Description
*/

angular.module('midiInput',[])
	.directive('midiinput',function(){
		return{
			restrict:'C',
			template:'<div id="{{input.id}}">Input</div>',
			replace:'false',
			link:{
				post: function($scope){
					var scope = $scope;
					jsPlumb.ready(function () {
//TODO - replace with proper callback
						window.setTimeout(function () {
							jsPlumb.draggable(scope.input.id);
							jsPlumb.addEndpoint(scope.input.id,{
								endpoint:'Rectangle',
								paintStyle:{ width:25, height:21, fillStyle:'#666' },
								connectorStyle : { strokeStyle:'#666' },
								isSource:true
							});
						},100);
					});
				}
			}
		};
	})
	.directive('midioutput',function(){
		return{
			restrict:'C',
			template:'<div id="{{output.id}}">Output</div>',
			replace:'false',
			link:{
				post: function($scope){
					var scope = $scope;
					jsPlumb.ready(function () {
//TODO - replace with proper callback
						window.setTimeout(function () {
							jsPlumb.draggable(scope.output.id);
							jsPlumb.addEndpoint(scope.output.id,{
								endpoint:'Rectangle',
								paintStyle:{ width:25, height:21, fillStyle:'#666' },
								connectorStyle : { strokeStyle:'#666' },
								isTarget:true
							});
						},100);
					});
				}
			}
		};
	});
