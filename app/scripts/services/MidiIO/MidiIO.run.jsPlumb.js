
'use strict';
/* global _ , jsPlumb */

var MidiIO = angular.module("MainEngine");

MidiIO.run(function (mainEngine) {

	var Inputs = mainEngine.$$master.Inputs;
	var Outputs = mainEngine.$$master.Outputs;
	
	// jsPlumb.ready(function(){

	// 	jsPlumb.bind('connection', function(info) {

	// 		var inputdevice = Inputs.getInput(info.sourceId);
	// 		var outputdevice = Outputs.getOutput(info.targetId);
	// 		outputdevice.subscribe(inputdevice);

	// 	});

	// 	jsPlumb.bind('connectionDetached', function(info) {

	// 		var inputdevice = Inputs.getInput(info.sourceId);
	// 		var outputdevice = Outputs.getOutput(info.targetId);
	// 		outputdevice.unsubscribe[inputdevice.id]();
	// 	});
	//	});
});
