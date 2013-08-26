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

	describe('MidiService.getInputs', function() {
	  it('should return an array', function() {
	    expect(MidiService.getInputs()).toEqual([]);
	  });
	});  

	describe('MidiService.getOutputs', function() {
	  it('should return an array', function() {
	    expect(MidiService.getOutputs()).toEqual([]);
	  });
	});  

});
