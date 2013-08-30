
'use strict';
/* global _ , jsPlumb */

var MidiIO = angular.module('MidiIO');

MidiIO.run(function (Puts) {

	var inputs = Puts.inputs;
	var outputs = Puts.outputs;
	
	jsPlumb.ready(function(){

		jsPlumb.bind('connection', function(info) {

			var inputdevice = _.find(inputs,function(input){
				return (input.id === info.sourceId);
			});

			var outputdevice = _.find(outputs,function(output){

				return (output.id === info.targetId);
			});

			outputdevice.unsubscribe[inputdevice.id] = outputdevice.streamin.plug(inputdevice.streamout);

		});

		jsPlumb.bind('connectionDetached', function(info) {

			var inputdevice = _.find(inputs,function(input){
				return (input.id === info.sourceId);
			});

			var outputdevice = _.find(outputs,function(output){
				console.log('checking '+output.id);
				console.log('for '+info.targetId);

				return (output.id === info.targetId);
			});

			outputdevice.unsubscribe[inputdevice.id]();
		});
	});
});
