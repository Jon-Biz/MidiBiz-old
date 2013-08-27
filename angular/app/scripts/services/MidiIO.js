'use strict';

var MidiIO = angular.module('MidiIO',[]);

MidiIO.config(function () {
	

});

MidiIO.factory('midiservice',function ($timeout) {

	jsPlumb.ready(function(){
		jsPlumb.bind("connection", function(info) { 
			console.log('connection!') 
			console.log(info.sourceId);
			console.log(info.targetId);
		});

		jsPlumb.bind("connectionDetached", function(info) { 
			console.log('end connection!') 
			console.log(info.sourceId);
			console.log(info.targetId);
		});
	})

	var inputs = [];
	var outputs = [];

	var Midi;

	Midi = {
		'inputs':inputs,
		'outputs':outputs
	};

	function update_inputs (input) {
		$timeout(function () {
			inputs.push(input);
		},100);
	};

	function update_outputs (output) {
		$timeout(function () {
			outputs.push(output);
		},100);
	};

	midiBridge.init(function(MIDIAccess){
		
		_.each(MIDIAccess.enumerateInputs(),function(device,index){

			var id = 'input-'+index;

			var stream = Bacon.fromEventTarget(MIDIAccess.getInput(device),'midimessage');

			var midiin = {
				'id':id,
				'name':device.deviceName,
				'stream': stream
			};

			stream.onValue(function(val){
				console.log(val.toString());
			})

			update_inputs(midiin);

		});

		_.each(MIDIAccess.enumerateOutputs(),function(device,index){
			if(device.deviceName != "Microsoft GS Wavetable Synth"){

				var id = 'output-'+index;

				var	midiout = {
					'id':id,
					'name':device.deviceName,
					'output': MIDIAccess.getOutput(device)
				}

				var midiMessage = MIDIAccess.createMIDIMessage(midiBridge.NOTE_ON, 1, 48, 100);
				midiout.output.sendMIDIMessage(midiMessage);

				update_outputs(midiout);

			}


		});

	});

	return Midi;

});

