
'use strict';
/* global _ , jsPlumb */

var MidiIO = angular.module('MidiIO');

MidiIO.run(function (Midiputs) {

	var inputs = Midiputs.inputs;
	var outputs = Midiputs.outputs;
	
	jsPlumb.ready(function(){

		jsPlumb.bind('connection', function(info) {

			var inputdevice = _.find(inputs,function(input){
				return (input.id === info.sourceId);
			});

			var outputdevice = _.find(outputs,function(output){
				return (output.id === info.targetId);
			});

			outputdevice.unsubscribe[inputdevice.id] = inputdevice.stream.subscribe(function(event){
				outputdevice.output(event.value());
			});
		});

		jsPlumb.bind('connectionDetached', function(info) {

			var inputdevice = _.find(inputs,function(input){
				return (input.id === info.sourceId);
			});

			var outputdevice = _.find(outputs,function(output){
				return (output.id === info.targetId);
			});

			outputdevice.unsubscribe[inputdevice.id]();
		});
	});
});
