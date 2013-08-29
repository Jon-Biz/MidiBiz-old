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
			template:'<div id="{{input.id}}"></div>',
			replace:'false',
			link:{
				post: function($scope){
					var scope = $scope;
					jsPlumb.ready(function () {
//TODO - replace with proper callback
						window.setTimeout(function () {
							jsPlumb.addEndpoint(scope.input.id,{
								endpoint:'Dot',
								anchor:'Right',
								paintStyle:{ width:10, height:10, fillStyle:'#666' },
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
			template:'<div id="{{output.id}}"></div>',
			replace:'false',
			link:{
				post: function($scope){
					var scope = $scope;
					jsPlumb.ready(function () {
//TODO - replace with proper callback
						window.setTimeout(function () {
							jsPlumb.addEndpoint(scope.output.id,{
								endpoint:'Dot',
								anchor:'Left',
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

