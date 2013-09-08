
'use strict';
/* global _ , jsPlumb */

var MidiIO = angular.module('MidiIO');

MidiIO.run(function (Inputs,Outputs) {

	var inputs = Inputs.getInputs();
	var outputs = Outputs.getOutputs();
	
	jsPlumb.ready(function(){

		jsPlumb.bind('connection', function(info) {

			var inputdevice = Inputs.getInput(info.sourceId);
			var outputdevice = Outputs.getOutput(info.targetId);
			outputdevice.subscribe(inputdevice);

		});

		jsPlumb.bind('connectionDetached', function(info) {

			var inputdevice = Inputs.getInput(info.sourceId);
			var outputdevice = Outputs.getOutput(info.targetId);
			outputdevice.unsubscribe[inputdevice.id]();
		});
	});
});
