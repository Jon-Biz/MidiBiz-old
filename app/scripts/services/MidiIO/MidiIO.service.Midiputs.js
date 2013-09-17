
'use strict';
/*global midiBridge*/

angular.module('MidiIO')

.service('Midiputs',function (PutService) {
	var that = PutService.getPutService();
	that.IO = that.getNewPutsCollection();

	that.msgParse = function (msg) {

		var parsedmsg = {};

		var splitmsg = msg.toString().split(' ');

		for (var i = splitmsg.length - 1; i >= 0; i--) {
			var midiparam = splitmsg[i].split(':');
			parsedmsg[midiparam[0]] = midiparam[1];
		}

		if(parsedmsg.CHAN){ parsedmsg.CHAN = parseInt(parsedmsg.CHAN,10);}
		if(parsedmsg.NOTE){ parsedmsg.NOTE = parseInt(parsedmsg.NOTE,10);}
		if(parsedmsg.VELOCITY){ parsedmsg.VELOCITY = parseInt(parsedmsg.VELOCITY,10);}
		if(parsedmsg.TIME){ parsedmsg.TIME = parseInt(parsedmsg.TIME,10);}

		return parsedmsg;

	};

	that.msgReparse = function (noteobj) {
		noteobj.CMD = this.reparseMidiCMD(noteobj.CMD);
		return noteobj;
	};

	that.reparseMidiCMD = function(command){

		var midicommand;

		switch(command)
			{
		case 'NOTE_OFF':
			midicommand = 0x80;
			break;
		case 'NOTE_ON':
			midicommand = 0x90;
			break;
		case 'POLY_PRESSURE':
			midicommand = 0xA0;
			break;
		case 'CONTROL_CHANGE':
			midicommand = 0xB0;
			break;
		case 'PROGRAM_CHANGE':
			midicommand = 0xC0;
			break;
		case 'CHANNEL_PRESSURE':
			midicommand = 0xD0;
			break;
		case 'PITCH_BEND':
			midicommand = 0xE0;
			break;
		case 'SYSTEM_EXCLUSIVE':
			midicommand = 0xF0;
			break;
		case 'MIDI_TIMECODE':
			midicommand = 241;
			break;
		case 'SONG_POSITION':
			midicommand = 242;
			break;
		case 'SONG_SELECT':
			midicommand = 243;
			break;
		case 'TUNE_REQUEST':
			midicommand = 246;
			break;
		case 'EOX':
			midicommand = 247;
			break;
		case 'TIMING_CLOCK':
			midicommand = 248;
			break;
		case 'START':
			midicommand = 250;
			break;
		case 'CONTINUE':
			midicommand = 251;
			break;
		case 'STOP':
			midicommand = 252;
			break;
		case 'ACTIVE_SENSING':
			midicommand = 254;
			break;
		case 'SYSTEM_RESET':
			midicommand = 255;
			break;
		}
        
  //       //other statics
  //       NOTE_NAMES_SHARP : "sharp",
  //       NOTE_NAMES_FLAT : "flat",
  //       NOTE_NAMES_SOUNDFONT : "soundfont",
  //       NOTE_NAMES_ENHARMONIC_SHARP : "enh-sharp",
  //       NOTE_NAMES_ENHARMONIC_FLAT : "enh-flat",
        return midicommand;

	};

	return that;
});
