'use strict';

describe("Puts service", function() {
	var PutService;
	var mockInputs;

	beforeEach(function() {
		module('OnPuts');

		inject(function($injector){
			PutService = $injector.get("PutService");
		});
	});

	describe("getNewPutCollection()", function() {
		var Puts;
 
		beforeEach(function() {

			Puts = PutService.getNewPutsCollection();
		});

		it("should return an object containing input and output arrays", function() {

			expect(Puts instanceof Object).toBeTruthy();
			expect(Puts.Inputs instanceof Array).toBeTruthy();
			expect(Puts.Outputs instanceof Array).toBeTruthy();
		});

		it("The input array should be empty", function() {
  			expect(Puts.Inputs.length).toEqual(0);
		});

		describe("getNewInput('test','') called on it", function() {

			var input;

			beforeEach(function() {
				input = Puts.getNewInput('test','');			  
			});

			it("should add one to the length of the Puts.inputs", function() {
				expect(Puts.Inputs.length).toEqual(1);
			});

			it("should add one to the length of the PutService.inputs", function() {
				expect(PutService.Inputs.length).toEqual(1);
			});

			it("the input in Puts.inputs should have the name 'test'", function() {
				expect(Puts.Inputs[0].name).toEqual('test');
			});

			it("should call Inputs.getNewInput()", function() {
				var input = Puts.getNewInput();
			});

			describe("getInput('input-0' called on it", function() {
			  it("should return the input we created", function() {
			    expect(Puts.getInput('input-0')).toEqual(input);
			  });
			});

			describe("and PutService.getInput('input-0')", function() {
			  it("should return the input we created", function() {
			    expect(PutService.getInput('input-0')).toEqual(input);
			  });
			});

	  	});

		describe("getNewOutput('test','') called on it", function() {

			var output;

			beforeEach(function() {
				output = Puts.getNewOutput('test','');			  
			});

			it("should add one to the length of the Puts.Outputs", function() {
				expect(Puts.Outputs.length).toEqual(1);
			});

			it("should add one to the length of the PutService.Outputs", function() {
				expect(PutService.Outputs.length).toEqual(1);
			});

			it("the Output in Puts.Outputs should have the name 'test'", function() {
				expect(Puts.Outputs[0].name).toEqual('test');
			});

			it("should call Outputs.getNewOutput()", function() {
				var Output = Puts.getNewOutput();
			});

			describe("getOutput('Output-0' called on it", function() {
			  it("should return the Output we created", function() {
			    expect(Puts.getOutput('Output-0')).toEqual(output);
			  });
			});

			describe("and PutService.getOutput('Output-0')", function() {
			  it("should return the Output we created", function() {
			    expect(PutService.getOutput('Output-0')).toEqual(output);
			  });
			});

	  	});

	});

});