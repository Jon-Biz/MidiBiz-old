'use strict';

/**
*  Provides midiInput directive
*
* Description
*/

angular.module('midiInput')
	.directive('midiinputlabel',function(){

		return{
			restrict:'C',
			template:'<div id="label-{{input.id}}">{{input.name}}</div>',
			replace:'false'
		};
	})
	.directive('midioutputlabel',function(){
		return{
			restrict:'C',
			template:'<div id="label-{{output.id}}">{{output.name}}</div>',
			replace:'false'
		};
	});

