'use strict';

describe("MidiService", function() {

var MidiService;

	beforeEach(function() {
		module('MidiIO');
		inject(function($injector){
			MidiService = $injector.get('midiservice');
		});
	});

	it("should be defined", function() {
	  expect(MidiService).toBeDefined();
	});

	describe('MidiService.inputs', function() {
	  it('should be an array', function() {
	    expect(MidiService.inputs instanceof Array).toBeTruthy();
	  });
	});  

	describe('MidiService.outputs', function() {
	  it('should be an array', function() {
	    expect(MidiService.outputs instanceof Array).toBeTruthy();
	  });
	});  

	describe("parseMidi", function() {
	  
	  it("should return an object literal", function() {
	  	expect(MidiService.parseMidi("test") instanceof Object).toBeTruthy({});
	  });

		describe("when sent message CMD:NOTE_OFF CHAN:0 NOTE:64 VELOCITY:0 TIME:202845000", function() {
	  	
	  	var note = 'CMD:NOTE_OFF CHAN:0 NOTE:64 VELOCITY:0 TIME:202845000';

	  	it("should return an object with a CMD value of NOTE_OFF ", function() {
		  	var parseValue = MidiService.parseMidi(note);

	  		expect(parseValue.CMD).toEqual("NOTE_OFF");  
	  	});
	  	it("should return object with CHAN of 0", function() {
			var parseValue = MidiService.parseMidi(note);
	  		expect(parseValue.CHAN).toEqual(0);
	  	});

	  	it("should return object with NOTE of 64", function() {
			var parseValue = MidiService.parseMidi(note);
	  		expect(parseValue.NOTE).toEqual(64);
	  	});

	  	it("should return object with VELOCITY of 0", function() {
			var parseValue = MidiService.parseMidi(note);
	  		expect(parseValue.VELOCITY).toEqual(0);
	  	});
	   
	  });


		describe("when sent message 'CMD:NOTE_ON CHAN:0 NOTE:63 VELOCITY:1 TIME:856523000 ' ", function() {
		  	var note = 'CMD:NOTE_ON CHAN:0 NOTE:63 VELOCITY:1 TIME:856523000 ';

		  	it("should return an object with a CMD value of NOTE_OFF ", function() {
			  	var parseValue = MidiService.parseMidi(note);

		  		expect(parseValue.CMD).toEqual("NOTE_ON");  
		  	});
		  	it("should return object with CHAN of 0", function() {
				var parseValue = MidiService.parseMidi(note);
		  		expect(parseValue.CHAN).toEqual(0);
		  	});

		  	it("should return object with NOTE of 63", function() {
				var parseValue = MidiService.parseMidi(note);
		  		expect(parseValue.NOTE).toEqual(63);
		  	});

		  	it("should return object with VELOCITY of 1", function() {
				var parseValue = MidiService.parseMidi(note);
		  		expect(parseValue.VELOCITY).toEqual(1);
		  	});

		  	it("should return object with TIME of 856523000", function() {
				var parseValue = MidiService.parseMidi(note);
		  		expect(parseValue.TIME).toEqual(856523000);
		  	});
			});
	});

	describe("reparsetMidiCMD",function(){
	
		var note = {
			CMD:'NOTE_ON',
			CHAN:0,
			NOTE:63,
			VELOCITY:1,
			TIME:856523000
		};

		describe("when sent a note object", function() {
		 it("should return midiBridge.NOTE_ON", function() {
		 	var concatValue = MidiService.concatMidi(note);	
		    expect(concatValue).toEqual(midiBridge.NOTE_ON);
		  }); 
		});
	})

	describe("reparseMidi", function() {
		var note = {
			CMD:'NOTE_ON',
			CHAN:0,
			NOTE:63,
			VELOCITY:1,
			TIME:856523000
		};

		describe("when sent a note object", function() {
		 it("should return midimessage from it", function() {
		 	var repackedMsg = MidiService.parseMidi(note);	
		    expect(repackedMsg).toEqual(MIDIAccess.createMIDIMessage(midiBridge.NOTE_ON, 0, 63, 1));
		  }); 
		});

	});
});
