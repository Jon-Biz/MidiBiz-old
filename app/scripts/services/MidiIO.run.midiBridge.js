
'use strict';
/* global _ , Bacon, midiBridge */

var MidiIO = angular.module('MidiIO');

MidiIO.run(function ($timeout,Midiputs) {

	midiBridge.init(function(MIDIAccess){
		
		_.each(MIDIAccess.enumerateInputs(),function(device,index){
				
			var id = 'input-'+index;

			var streamin = Bacon.fromEventTarget(MIDIAccess.getInput(device),'midimessage');

			var streamout = new Bacon.EventStream(function(subscriber){
				streamin.onValue(function(val){
					console.log('hit');
					var midiobj = Midiputs.msgParse(val);
					subscriber(new Bacon.Next(midiobj));
				});
				return function(){};
			});
				
			var midiin = {
				'id':id,
				'name':device.deviceName,
				'streamout': streamout
			};

			Midiputs.addInput(midiin);
		});

		_.each(MIDIAccess.enumerateOutputs(),function(device,index){
//			if(device.deviceName === 'loopMIDI Port'){
			if(device.deviceName !== 'Microsoft GS Wavetable Synth'){

				var id = 'output-'+index;
				var streamin = new Bacon.Bus();

				streamin.onValue(function(val){
					output(val);
				});

				var output = function(unreparsedNote){
					console.log('trigger');
					var note = Midiputs.msgReparse(unreparsedNote);
					var midinote = MIDIAccess.createMIDIMessage(note.CMD, 1, note.NOTE, note.VELOCITY);
					MIDIAccess.getOutput(device).sendMIDIMessage(midinote);
				};

				var	midiout = {
					'id':id,
					'name':device.deviceName,
					'output' : output,
					'streamin':streamin,
					'unsubscribe':{}
				};

				var midiMessage = ({CMD:'NOTE_ON',CHAN:1,NOTE:48,VELOCITY:100});
				midiout.streamin.push(midiMessage);

				Midiputs.addOutput(midiout);

			}


		});

	});

});

