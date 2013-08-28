'use strict';

var MidiIO = angular.module('MidiIO',[]);

MidiIO.config(function () {
	

});

MidiIO.factory('midiservice',function ($timeout) {

	var inputs = [];
	var outputs = [];

	var Midi;

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

		var MIDIAccess = MIDIAccess;
		var input = input;
		var output = output;

		jsPlumb.ready(function(){
			jsPlumb.bind("connection", function(info) { 

				var inputdevice = _.find(inputs,function(input){
					return (input.id == info.sourceId);
				})

				var outputdevice = _.find(outputs,function(output){
					return (output.id == info.targetId);
				});

				outputdevice.unsubscribe = inputdevice.stream.subscribe(function(event){
					outputdevice.output(event.value());
				})
			});

			jsPlumb.bind("connectionDetached", function(info) { 

				var outputdevice = _.find(outputs,function(output){
					return (output.id == info.targetId);
				});
				outputdevice.unsubscribe();
			});
		});
		
		_.each(MIDIAccess.enumerateInputs(),function(device,index){
			if(device.deviceName.match('AXIS')){
				var id = 'input-'+index;

				var streamin = Bacon.fromEventTarget(MIDIAccess.getInput(device),'midimessage');

				var stream = new Bacon.EventStream(function(subscriber){
					streamin.onValue(function(val){
						var midiobj = Midi.msg_parse(val);
						subscriber(new Bacon.Next(midiobj));
					});
					return function(){};
				});
					
				var midiin = {
					'id':id,
					'name':device.deviceName,
					'stream': stream
				};

				update_inputs(midiin);
			}
		});

		_.each(MIDIAccess.enumerateOutputs(),function(device,index){
			if(device.deviceName == 'loopMIDI Port'){
//			if(device.deviceName != "Microsoft GS Wavetable Synth"){

				var id = 'output-'+index;

				var	midiout = {
					'id':id,
					'name':device.deviceName,
					'output' : function(note){
						var midinote = MIDIAccess.createMIDIMessage(midiBridge.NOTE_ON, 1, note.NOTE, note.VELOCITY)
						MIDIAccess.getOutput(device).sendMIDIMessage(midinote);
					}
				}

				var midiMessage = ({CMD:midiBridge.NOTE_ON,CHAN:1,NOTE:48,VELOCITY:100});
				midiout.output(midiMessage);

				update_outputs(midiout);	

			}


		});

	});

	Midi = {
		'inputs':inputs,
		'outputs':outputs,
		msg_parse: function (msg) {

			var parsedmsg = {};

			var splitmsg = msg.toString().split(" ");

			for (var i = splitmsg.length - 1; i >= 0; i--) {
				var midiparam = splitmsg[i].split(":");
				parsedmsg[midiparam[0]] = midiparam[1];
			};

			if(parsedmsg.CHAN){ parsedmsg.CHAN = parseInt(parsedmsg.CHAN);}
			if(parsedmsg.NOTE){ parsedmsg.NOTE = parseInt(parsedmsg.NOTE);}
			if(parsedmsg.VELOCITY){ parsedmsg.VELOCITY = parseInt(parsedmsg.VELOCITY);}
			if(parsedmsg.TIME){ parsedmsg.TIME = parseInt(parsedmsg.TIME);}

			return parsedmsg;

		},
		reparseMidiCMD:function(command){

			console.log(command);
			var midicommand;

			switch(command)
				{
				case "NOTE_OFF":
					midicommand = midiBridge.NOTE_OFF;
			    case "NOTE_ON":
		        	midicommand = midiBridge.NOTE_ON;
		        case "POLY_PRESSURE":
		        	midicommand = midiBridge.POLY_PRESSURE;
		        case "CONTROL_CHANGE":
		        	midicommand = midiBridge.CONTROL_CHANGE;
		        case "PROGRAM_CHANGE":
		        	midicommand = midiBridge.PROGRAM_CHANGE;
		        case "CHANNEL_PRESSURE":
		        	midicommand = midiBridge.CHANNEL_PRESSURE;
		        case "PITCH_BEND":
		        	midicommand = midiBridge.PITCH_BEND;
		        case "SYSTEM_EXCLUSIVE":
		        	midicommand = midiBridge.SYSTEM_EXCLUSIVE;
		        case "MIDI_TIMECODE":
		        	midicommand = midiBridge.MIDI_TIMECODE;
		        case "SONG_POSITION":
		        	midicommand = midiBridge.SONG_POSITION;
		        case "SONG_SELECT":
		        	midicommand = midiBridge.SONG_SELECT;
		        case "TUNE_REQUEST":
		        	midicommand = midiBridge.TUNE_REQUEST;
		        case "EOX":
		        	midicommand = midiBridge.EOX;
		        case "TIMING_CLOCK":
		        	midicommand = midiBridge.TIMING_CLOCK;
		        case "START":
		        	midicommand = midiBridge.START;
		        case "CONTINUE":
		        	midicommand = midiBridge.CONTINUE;
		        case "STOP":
		        	midicommand = midiBridge.STOP;
		        case "ACTIVE_SENSING":
		        	midicommand = midiBridge.ACTIVE_SENSING;
		        case "SYSTEM_RESET":
		        	midicommand = midiBridge.SYSTEM_RESET;	
				}

				return midicommand;
		},
		reparseMidi:function (noteobj) {
			var CMD = this.reparseMidiCMD(noteobj.CMD);
			MIDIAccess.createMIDIMessage(CMD,noteobj.CHAN,noteobj.NOTE,noteobj.VELOCITY);
		}

	};

	return Midi;

});

