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

});
