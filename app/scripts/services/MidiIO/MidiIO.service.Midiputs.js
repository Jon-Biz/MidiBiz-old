
'use strict';
/*global midiBridge*/

var MidiIO = angular.module('MidiIO',['Puts']);

MidiIO.factory('Midiputs',function (PutService) {

	var IO = PutService.getNewPutsCollection();

	IO.msgParse = function (msg) {

		var parsedmsg = {};

		var splitmsg = msg.toString().split(' ');

		for (var i = splitmsg.length - 1; i >= 0; i--) {
			var midiparam = splitmsg[i].split(':');
			parsedmsg[midiparam[0]] = midiparam[1];
			console.log(midiparam[0]+' '+midiparam[1]);
		}

		if(parsedmsg.CHAN){ parsedmsg.CHAN = parseInt(parsedmsg.CHAN,10);}
		if(parsedmsg.NOTE){ parsedmsg.NOTE = parseInt(parsedmsg.NOTE,10);}
		if(parsedmsg.VELOCITY){ parsedmsg.VELOCITY = parseInt(parsedmsg.VELOCITY,10);}
		if(parsedmsg.TIME){ parsedmsg.TIME = parseInt(parsedmsg.TIME,10);}

		return parsedmsg;

	};

	IO.msgReparse = function (noteobj) {
		noteobj.CMD = this.reparseMidiCMD(noteobj.CMD);
		return noteobj;
	};

	IO.reparseMidiCMD = function(command){

		var midicommand;

		switch(command)
			{
		case 'NOTE_OFF':
			midicommand = midiBridge.NOTE_OFF;
			break;
		case 'NOTE_ON':
			midicommand = midiBridge.NOTE_ON;
			break;
		case 'POLY_PRESSURE':
			midicommand = midiBridge.POLY_PRESSURE;
			break;
		case 'CONTROL_CHANGE':
			midicommand = midiBridge.CONTROL_CHANGE;
			break;
		case 'PROGRAM_CHANGE':
			midicommand = midiBridge.PROGRAM_CHANGE;
			break;
		case 'CHANNEL_PRESSURE':
			midicommand = midiBridge.CHANNEL_PRESSURE;
			break;
		case 'PITCH_BEND':
			midicommand = midiBridge.PITCH_BEND;
			break;
		case 'SYSTEM_EXCLUSIVE':
			midicommand = midiBridge.SYSTEM_EXCLUSIVE;
			break;
		case 'MIDI_TIMECODE':
			midicommand = midiBridge.MIDI_TIMECODE;
			break;
		case 'SONG_POSITION':
			midicommand = midiBridge.SONG_POSITION;
			break;
		case 'SONG_SELECT':
			midicommand = midiBridge.SONG_SELECT;
			break;
		case 'TUNE_REQUEST':
			midicommand = midiBridge.TUNE_REQUEST;
			break;
		case 'EOX':
			midicommand = midiBridge.EOX;
			break;
		case 'TIMING_CLOCK':
			midicommand = midiBridge.TIMING_CLOCK;
			break;
		case 'START':
			midicommand = midiBridge.START;
			break;
		case 'CONTINUE':
			midicommand = midiBridge.CONTINUE;
			break;
		case 'STOP':
			midicommand = midiBridge.STOP;
			break;
		case 'ACTIVE_SENSING':
			midicommand = midiBridge.ACTIVE_SENSING;
			break;
		case 'SYSTEM_RESET':
			midicommand = midiBridge.SYSTEM_RESET;
			break;
		}

		return midicommand;
	};

	return IO;
});
