'use strict';

describe("Puts service", function() {
	var PutService;
	var mockInputs;

	beforeEach(function() {
		module('Puts');

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

			var Input;

			beforeEach(function() {
				Input = Puts.getNewInput('test','');			  
			});

			describe("getNewInput should return an object ", function() {

				it("with a name", function() {
					expect(Input.name).toEqual('test');
				});

				it("with an id of 'input-0'", function() {
					expect(Input.id).toEqual('input-0');    
				});
			  
			});

			describe("getInput('input-0')", function() {
			    it("should return the Input",function () {
			    	expect(Puts.getInput('input-0')).toEqual(Input);
			    })
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

			describe("getInput('input-0' called on it", function() {
			  it("should return the input we created", function() {
			    expect(Puts.getInput('input-0')).toEqual(Input);
			  });
			});

			describe("and PutService.getInput('input-0')", function() {
			  it("should return the input we created", function() {
			    expect(PutService.getInput('input-0')).toEqual(Input);
			  });
			});

	  	});

		describe("when getNewInput is called twice", function() {

			var Input0,Input1;


			beforeEach(function() {
				Input0 = new Puts.getNewInput('test');
				Input1 = new Puts.getNewInput('test');
			  
			});

			it("getNewInput should return an object with an id of 'input-0' and one of 'input-1", function() {
				expect(Input0.id).toEqual('input-0');    
				expect(Input1.id).toEqual('input-1');    

			});

			describe("Puts.Inputs", function() {

			  it("should be length 2", function() {
			    expect(Puts.Inputs.length).toEqual(2);
			  });
			});	  
		});

		describe("getNewOutput('test','') called on it", function() {

			var Output;

			beforeEach(function() {
				Output = Puts.getNewOutput('test','');			  
			});


			it("getNewOutput should return an object with a name", function() {
				expect(Output.name).toEqual('test');
			});

			it("getNewOutput should return an object with an id of 'Output-0'", function() {
				expect(Output.id).toEqual('Output-0');    
			});

			describe("Puts.Outputs", function() {

			  it("should be an array of length 1", function() {
			    expect(Puts.Outputs instanceof Array).toBeTruthy();
			    expect(Puts.Outputs.length).toEqual(1);
			  });
			});

			describe("getOutput('Output-0')", function() {
			    it("should return the Output",function () {
			    	expect(Puts.getOutput('Output-0')).toEqual(Output);
			    })
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

			describe("getOutput('Output-0' called on it", function() {
			  it("should return the Output we created", function() {
			    expect(Puts.getOutput('Output-0')).toEqual(Output);
			  });
			});

			describe("and PutService.getOutput('Output-0')", function() {
			  it("should return the Output we created", function() {
			    expect(PutService.getOutput('Output-0')).toEqual(Output);
			  });
			});

	  	});

		describe("when getNewOutput is called twice", function() {

			var Output0,Output1;


			beforeEach(function() {
				Output0 = new Puts.getNewOutput('test');
				Output1 = new Puts.getNewOutput('test');
			  
			});

			it("getNewOutput should return an object with an id of 'Output-0' and one of 'Output-1", function() {
				expect(Output0.id).toEqual('Output-0');    
				expect(Output1.id).toEqual('Output-1');    

			});

			xdescribe("Puts.Outputs", function() {

			  it("should have a length of 2", function() {
			    expect(Puts.getputs().length).toEqual(2);
			  });
			});	  
		});
		

	});

});
