
'use strict';
/* global _ , jsPlumb */

var MidiIO = angular.module('MidiIO');

MidiIO.run(function (Inputs,Outputs) {

	var inputs = Inputs.getInputs();
	var outputs = Outputs.getOutputs();
	
	jsPlumb.ready(function(){

		jsPlumb.bind('connection', function(info) {

			console.log('connecting to -',info.sourceId)

			var inputdevice = Inputs.getInput(info.sourceId);

			var outputdevice = Outputs.getOutput(info.sourceId);

			outputdevice.subscribe(inputdevice);

		});

		jsPlumb.bind('connectionDetached', function(info) {

			var inputdevice = Inputs.getInput(info.sourceId);

			var outputdevice = _.find(outputs,function(output){
				return (output.id === info.targetId);
			});

			outputdevice.unsubscribe[inputdevice.id]();
		});
	});
});
