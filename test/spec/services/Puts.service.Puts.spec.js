'use strict';

describe("Puts service", function() {
	var PutService;
	var mockInputs;

	beforeEach(function() {
		module('Puts');

		inject(function($injector){
			var PutModule = $injector.get("PutService");
			PutService = PutModule.getPutService();
		});
	});

	describe("PutService", function() {
	  
		it("should contain master.Inputs and master.Outputs arrays", function() {
		  expect(PutService.Inputs instanceof Array).toBeTruthy();
		  expect(PutService.Outputs instanceof Array).toBeTruthy();
		});

		xdescribe(".addInput({'name':'test','streamout':{},'id':'1'})", function() {
			var Input;

			beforeEach(function() {
			  Input = PutService.addInput({'name':'test','streamout':{},'id':'1'});	
			});
			
		  it("should make the Inputs array should be length 1", function() {
		   expect(PutService.Inputs.length).toEqual(1);
		  });

		  it("should create an Input with name of 'test'",function(){
		  	expect(Input.name).toEqual('test');
		  })
		});

		describe(".addOutput('test',{},1')", function() {
			var Output;

			beforeEach(function() {
			  Output = PutService.addOutput('test',{},1);	
			});
			
		  it("should make the Outputs array should be length 1", function() {
		   expect(PutService.Outputs.length).toEqual(1);
		  });		  
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

		describe(".addInput('test',{},1')", function() {
			var Input;

			beforeEach(function() {
			  Input = Puts.addInput('test',{},1);	
			});
			
		  it("should make the PutService Inputs array should be length 1", function() {
		   expect(PutService.Inputs.length).toEqual(1);
		  });

		  it("should add an Input, name 'test' to the PutService", function() {
		    expect(PutService.Inputs[0].name).toEqual('test');
		  });
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

				it("with an id of 'Input-0'", function() {
					expect(Input.id).toEqual('Input-0');    
				});
			  
			});

			describe("getInput('Input-0')", function() {
			    it("should return the Input",function () {
			    	expect(Puts.getInput('Input-0')).toEqual(Input);
			    })
			});  

			it("should add one to the length of the Puts.inputs", function() {
				expect(Puts.Inputs.length).toEqual(1);
			});

			it("should add one to the length of the PutService.master.inputs", function() {
				expect(PutService.Inputs.length).toEqual(1);
			});

			it("the input in Puts.inputs should have the name 'test'", function() {
				expect(Puts.Inputs[0].name).toEqual('test');
			});

			describe("getInput('Input-0' called on it", function() {
			  it("should return the input we created", function() {
			    expect(Puts.getInput('Input-0')).toEqual(Input);
			  });
			});

			describe("and PutService.getInput('Input-0')", function() {
			  it("should return the input we created", function() {
			    expect(PutService.getInput('Input-0')).toEqual(Input);
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
				expect(Input0.id).toEqual('Input-0');    
				expect(Input1.id).toEqual('Input-1');    

			});

			describe("Puts.Inputs", function() {

			  it("should be length 2", function() {
			    expect(Puts.Inputs.length).toEqual(2);
			  });
			});	  
		});

		describe(".addOutput('test',{},1')", function() {
			var Output;

			beforeEach(function() {
			  Output = Puts.addOutput('test',{},1);	
			});
			
		  it("should make the PutService Outputs array should be length 1", function() {
		   expect(PutService.Outputs.length).toEqual(1);
		  });

		  it("should add an Output, name 'test' to the PutService", function() {
		    expect(PutService.Outputs[0].name).toEqual('test');
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

			it("should add one to the length of the PutService.master.Outputs", function() {
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

			describe("Puts.Outputs", function() {

			  it("should have a length of 2", function() {
			    expect(Puts.Outputs.length).toEqual(2);
			  });
			});	  
		});
		

	});

});
