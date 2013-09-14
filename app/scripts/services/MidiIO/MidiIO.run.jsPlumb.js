
'use strict';
/* global _ , jsPlumb */

var MidiIO = angular.module('MidiIO');

MidiIO.run(function (PutService) {

	var Inputs = PutService.Inputs;
	var Outputs = PutService.Outputs;
	
	jsPlumb.ready(function(){

		jsPlumb.bind('connection', function(info) {

			var inputdevice = PutService.getInput(info.sourceId);
			var outputdevice = PutService.getOutput(info.targetId);
			outputdevice.subscribe(inputdevice);

		});

		jsPlumb.bind('connectionDetached', function(info) {

			var inputdevice = PutService.getInput(info.sourceId);
			var outputdevice = PutService.getOutput(info.targetId);
			outputdevice.unsubscribe[inputdevice.id]();
		});
	});
});
