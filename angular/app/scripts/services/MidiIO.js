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

				outputdevice.unsubscribe[inputdevice.id] = inputdevice.stream.subscribe(function(event){
					outputdevice.output(event.value());
				})
			});

			jsPlumb.bind("connectionDetached", function(info) { 

				var inputdevice = _.find(inputs,function(input){
					return (input.id == info.sourceId);
				});

				var outputdevice = _.find(outputs,function(output){
					return (output.id == info.targetId);
				});

				outputdevice.unsubscribe[inputdevice.id]();
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
						var midicommand = Midi.reparseMidiCMD(note.CMD)						
						var midinote = MIDIAccess.createMIDIMessage(midicommand, 1, note.NOTE, note.VELOCITY)
						MIDIAccess.getOutput(device).sendMIDIMessage(midinote)
					},
					'unsubscribe':{}
				}

				var midiMessage = ({CMD:'NOTE_ON',CHAN:1,NOTE:48,VELOCITY:100});
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

			var midicommand;

			switch(command)
				{
				case "NOTE_OFF":
					midicommand = midiBridge.NOTE_OFF;
					break;
			    case "NOTE_ON":
		        	midicommand = midiBridge.NOTE_ON;
					break;
		        case "POLY_PRESSURE":
		        	midicommand = midiBridge.POLY_PRESSURE;
					break;
		        case "CONTROL_CHANGE":
		        	midicommand = midiBridge.CONTROL_CHANGE;
					break;
		        case "PROGRAM_CHANGE":
		        	midicommand = midiBridge.PROGRAM_CHANGE;
					break;
		        case "CHANNEL_PRESSURE":
		        	midicommand = midiBridge.CHANNEL_PRESSURE;
					break;
		        case "PITCH_BEND":
		        	midicommand = midiBridge.PITCH_BEND;
					break;
		        case "SYSTEM_EXCLUSIVE":
		        	midicommand = midiBridge.SYSTEM_EXCLUSIVE;
					break;
		        case "MIDI_TIMECODE":
		        	midicommand = midiBridge.MIDI_TIMECODE;
					break;
		        case "SONG_POSITION":
		        	midicommand = midiBridge.SONG_POSITION;
					break;
		        case "SONG_SELECT":
		        	midicommand = midiBridge.SONG_SELECT;
					break;
		        case "TUNE_REQUEST":
		        	midicommand = midiBridge.TUNE_REQUEST;
					break;
		        case "EOX":
		        	midicommand = midiBridge.EOX;
					break;
		        case "TIMING_CLOCK":
		        	midicommand = midiBridge.TIMING_CLOCK;
					break;
		        case "START":
		        	midicommand = midiBridge.START;
					break;
		        case "CONTINUE":
		        	midicommand = midiBridge.CONTINUE;
					break;
		        case "STOP":
		        	midicommand = midiBridge.STOP;
					break;
		        case "ACTIVE_SENSING":
		        	midicommand = midiBridge.ACTIVE_SENSING;
					break;
		        case "SYSTEM_RESET":
		        	midicommand = midiBridge.SYSTEM_RESET;	
					break;
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

