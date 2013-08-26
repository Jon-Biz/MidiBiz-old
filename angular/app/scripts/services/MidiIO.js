'use strict';

var MidiIO = angular.module('MidiIO',[]);

MidiIO.factory('midiservice',function () {

	var Midi;

	Midi = {
		'getInputs':function(){
			return [];
		},
		'getOutputs':function () {
			return [];
		}
	};
	return Midi;
});

