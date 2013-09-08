
'use strict';
/* global _ , Bacon, midiBridge */

var MidiIO = angular.module('MidiIO');

MidiIO.run(function ($timeout,Midiputs,Inputs,Outputs) {

	midiBridge.init(function(MIDIAccess){
		
		_.each(MIDIAccess.enumerateInputs(),function(device,index){

			var id = 'input-'+index;

			var input = Bacon.fromEventTarget(MIDIAccess.getInput(device),'midimessage');

			var streamout = new Bacon.EventStream(function(subscriber){
				input.onValue(function(val){
					var midiobj = Midiputs.msgParse(val);
					subscriber(new Bacon.Next(midiobj));
				});
				return function(){};
			});

			var midiIn = new Inputs.getNewInput(device.DeviceName,streamout);
				
			Midiputs.addInput(midiIn);
		});

		_.each(MIDIAccess.enumerateOutputs(),function(device,index){
//			if(device.deviceName === 'loopMIDI Port'){
			if(device.deviceName !== 'Microsoft GS Wavetable Synth'){

				var output = function(unreparsedNote){
					var note = Midiputs.msgReparse(unreparsedNote);
					var midinote = MIDIAccess.createMIDIMessage(note.CMD, 1, note.NOTE, note.VELOCITY);
					MIDIAccess.getOutput(device).sendMIDIMessage(midinote);
				};

				var midiOut = new Outputs.getNewOutput(device.DeviceName,output);

				var midiMessage = ({CMD:'NOTE_ON',CHAN:1,NOTE:48,VELOCITY:100});
				midiOut.streamin.push(midiMessage);


				Midiputs.addOutput(midiOut);

			}


		});

	});

});

