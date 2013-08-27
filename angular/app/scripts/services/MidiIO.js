'use strict';

var MidiIO = angular.module('MidiIO',[]);

MidiIO.config(function () {
	

});

MidiIO.factory('midiservice',function ($timeout) {

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
			var id = 'input-'+replacespace(device.deviceName);

			update_inputs({
				'id':id,
				'name':device.deviceName
			});
		});

		_.each(MIDIAccess.enumerateOutputs(),function(device,index){
			if(device.deviceName != "Microsoft GS Wavetable Synth"){


				var id = 'output-'+replacespace(device.deviceName);

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

//		devices.innerHTML += "<div>Output length is "+MIDIAccess.enumerateOutputs().length+"</div>";
		
		function replacespace (name) {
			var namesplit = name;
			var name = "";
			for(var i=0;i<namesplit.length;i++){
				if(namesplit[i]!=" "){
				name = name + namesplit[i];
				}else{				
				name = name + "_";
				};
			};
			return name;
		}

	});

	return Midi;

});

