
'use strict';

var MidiIO = angular.module('MidiIO');

MidiIO.run(function ($timeout,Midiputs) {

	var inputs = Midiputs.inputs;
	var outputs = Midiputs.outputs;

	midiBridge.init(function(MIDIAccess){
		
		_.each(MIDIAccess.enumerateInputs(),function(device,index){
			if(device.deviceName.match('AXIS')){
				var id = 'input-'+index;

				var streamin = Bacon.fromEventTarget(MIDIAccess.getInput(device),'midimessage');

				var stream = new Bacon.EventStream(function(subscriber){
					streamin.onValue(function(val){
						var midiobj = Midiputs.msg_parse(val);
						subscriber(new Bacon.Next(midiobj));
					});
					return function(){};
				});
					
				var midiin = {
					'id':id,
					'name':device.deviceName,
					'stream': stream
				};

				Midiputs.add_input(midiin);
			}
		});

		_.each(MIDIAccess.enumerateOutputs(),function(device,index){
			if(device.deviceName == 'loopMIDI Port'){
//			if(device.deviceName != "Microsoft GS Wavetable Synth"){

				var id = 'output-'+index;

				var	midiout = {
					'id':id,
					'name':device.deviceName,
					'output' : function(unreparsed_note){
						var note = Midiputs.msg_reparse(unreparsed_note);	
						var midinote = MIDIAccess.createMIDIMessage(note.CMD, 1, note.NOTE, note.VELOCITY)
						MIDIAccess.getOutput(device).sendMIDIMessage(midinote)
					},
					'unsubscribe':{}
				}

				var midiMessage = ({CMD:'NOTE_ON',CHAN:1,NOTE:48,VELOCITY:100});
				midiout.output(midiMessage);

				Midiputs.add_output(midiout);	

			}


		});

	});

});

