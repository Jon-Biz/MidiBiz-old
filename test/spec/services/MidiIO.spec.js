'use strict';

describe("MidiService", function() {

var MidiService;

	beforeEach(function() {
		module('MidiIO');
		inject(function($injector){
			MidiService = $injector.get('Midiputs');
		});
	});

	it("should be defined", function() {
	  expect(MidiService).toBeDefined();
	});

	describe('MidiService.Inputs, Outputs', function() {
	  it('should be an array', function() {
	    expect(MidiService.Inputs instanceof Array).toBeTruthy();
	    expect(MidiService.Outputs instanceof Array).toBeTruthy();

	  });
	});  

	describe("msgParse", function() {
	  
	  it("should return an object literal", function() {
	  	expect(MidiService.msgParse("test") instanceof Object).toBeTruthy({});
	  });

		describe("when sent message CMD:NOTE_OFF CHAN:0 NOTE:64 VELOCITY:0 TIME:202845000", function() {
		  	
		  	var note = 'CMD:NOTE_OFF CHAN:0 NOTE:64 VELOCITY:0 TIME:202845000';

		  	it("should return an object with a CMD value of NOTE_OFF ", function() {
			  	var parseValue = MidiService.msgParse(note);

		  		expect(parseValue.CMD).toEqual("NOTE_OFF");  
		  	});
		  	it("should return object with CHAN of 0", function() {
				var parseValue = MidiService.msgParse(note);
		  		expect(parseValue.CHAN).toEqual(0);
		  	});

		  	it("should return object with NOTE of 64", function() {
				var parseValue = MidiService.msgParse(note);
		  		expect(parseValue.NOTE).toEqual(64);
		  	});

		  	it("should return object with VELOCITY of 0", function() {
				var parseValue = MidiService.msgParse(note);
		  		expect(parseValue.VELOCITY).toEqual(0);
		  	});
		   
		});


		describe("when sent message 'CMD:NOTE_ON CHAN:0 NOTE:63 VELOCITY:1 TIME:856523000 ' ", function() {
		  	var note = 'CMD:NOTE_ON CHAN:0 NOTE:63 VELOCITY:1 TIME:856523000 ';

		  	it("should return an object with a CMD value of NOTE_OFF ", function() {
			  	var parseValue = MidiService.msgParse(note);

		  		expect(parseValue.CMD).toEqual("NOTE_ON");  
		  	});
		  	it("should return object with CHAN of 0", function() {
				var parseValue = MidiService.msgParse(note);
		  		expect(parseValue.CHAN).toEqual(0);
		  	});

		  	it("should return object with NOTE of 63", function() {
				var parseValue = MidiService.msgParse(note);
		  		expect(parseValue.NOTE).toEqual(63);
		  	});

		  	it("should return object with VELOCITY of 1", function() {
				var parseValue = MidiService.msgParse(note);
		  		expect(parseValue.VELOCITY).toEqual(1);
		  	});

		  	it("should return object with TIME of 856523000", function() {
				var parseValue = MidiService.msgParse(note);
		  		expect(parseValue.TIME).toEqual(856523000);
		  	});
			});
	});

	describe("reparsetMidiCMD",function(){
	
		describe("when sent a note on CMD", function() {
		 it("should return midiBridge.NOTE_ON", function() {
		 	var concatValue = MidiService.reparseMidiCMD(note_on.cmd);	
		    expect(concatValue).toEqual(midiBridge.NOTE_ON);
		  }); 
		});

		describe("when sent a note CMD", function() {
		 it("should return midimessage from it", function() {
		 	var repackedMsg = MidiService.reparseMidiCMD(note_off.cmd);	
		    expect(repackedMsg).toEqual(midiBridge.NOTE_OFF);
		  }); 
		});

		describe("when sent 'NOTE_ON'", function() {
		  it("should return 0x90 ", function() {
		    expect(MidiService.reparseMidiCMD('NOTE_ON')).toEqual(0x90);
		  });
		});

	})

	describe("msgReparse", function() {
	  
	  describe("when given param {CMD:'NOTE_ON',CHAN:1,NOTE:48,VELOCITY:100}", function() {

	  	it("should return a object with value CMD an integer", function() {
	  		var noteobj = {CMD:'NOTE_ON',CHAN:1,NOTE:48,VELOCITY:100}
			expect(noteobj.CMD).toEqual('NOTE_ON');

			var note =  MidiService.msgReparse(noteobj)
			expect(note.CMD).toEqual(0x90);
	  	});
	  });
	});

});
