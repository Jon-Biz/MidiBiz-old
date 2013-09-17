
'use strict';
/* global _ , Bacon, midiBridge */

var MidiIO = angular.module('MidiIO');

MidiIO.run(function ($timeout,Midiputs) {

	midiBridge.init(function(MIDIAccess){
		
		_.each(MIDIAccess.enumerateInputs(),function(device,index){

			var input = Bacon.fromEventTarget(MIDIAccess.getInput(device),'midimessage');

			var streamout = new Bacon.EventStream(function(subscriber){
				input.onValue(function(val){
					var midiobj = Midiputs.msgParse(val);
					subscriber(new Bacon.Next(midiobj));
				});
				return function(){};
			});

			var midiIn = new Midiputs.IO.getNewInput(device.DeviceName);
				
		});

		_.each(MIDIAccess.enumerateOutputs(),function(device,index){
//			if(device.deviceName === 'loopMIDI Port'){
			if(device.deviceName !== 'Microsoft GS Wavetable Synth'){

				var output = function(unreparsedNote){
					console.log('cmd',unreparsedNote)
					var note = Midiputs.msgReparse(unreparsedNote);

					var midinote = MIDIAccess.createMIDIMessage(note.CMD, note.CHAN, note.NOTE, note.VELOCITY);

					MIDIAccess.getOutput(device).sendMIDIMessage(midinote);
				}

				var midiOut = new Midiputs.IO.getNewOutput(device.DeviceName);

				midiOut.output = output;

				midiOut.$$streamin.onValue(function(val){
					output(val);
				});

				var midiMessage = {CMD:'NOTE_ON',CHAN:1,NOTE:48,VELOCITY:100};
				console.log("note: ",midiMessage.CMD )
				midiOut.$$streamin.push(midiMessage);



			}


		});

	});

});

