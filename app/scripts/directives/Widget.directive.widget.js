'use strict';

angular.module('Widgets',[])
	.directive('widget',function () {
		return{
			restrict: 'C',
			template: '<div id="{{widget.id}}">{{widget.name}}</div>',
			replace: 'false',
			link:{
				post: function($scope){
					var scope = $scope;
					jsPlumb.ready(function(){
						window.setTimeout(function(){
							jsPlumb.draggable(scope.widget.id);

							jsPlumb.addEndpoint(scope.widget.id,{
								endpoint:'Dot',
								anchor:'Right',
								paintStyle:{ width:10, height:10, fillStyle:'#666' },
								connectorStyle : { strokeStyle:'#666' },
								isSource:true
							});
							
							jsPlumb.addEndpoint(scope.widget.id,{
								endpoint:'Dot',
								anchor:'Left',
								paintStyle:{ width:25, height:21, fillStyle:'#666' },
								connectorStyle : { strokeStyle:'#666' },
								isTarget:true
							});
						},100);
					})
				}
			}
		}
	});
