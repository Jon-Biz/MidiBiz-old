'use strict';

var MidiIO = angular.module('MidiIO',[]);

MidiIO.config(function ($provide) {

	$provide.value('inputs',[{name:'input1'},{name:'input2'}]);
	$provide.value('outputs',[{name:'output'},{name:'output2'}]);

	midiBridge.init(function(MIDIAccess){
		console.log("Input length is "+MIDIAccess.enumerateInputs().length);
		console.log("Output length is "+MIDIAccess.enumerateOutputs().length);
	});
});

MidiIO.factory('midiservice',function (inputs,outputs) {

	var Midi;

	Midi = {
		'getInputs':function(){
			return inputs;
		},
		'getOutputs':function () {
			return outputs;
		}
	};
	return Midi;
});

