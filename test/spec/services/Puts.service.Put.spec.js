describe("Input service", function() {
	var Puts
	beforeEach(function() {
		module('Puts');
		inject(function($injector){
			Puts = $injector.get('Inputs');
		});
	});

	describe("getInputs()", function() {

	  it("should return an array of length 0", function() {
	    expect(Puts.getInputs().length).toEqual(0);
	  });
	});

	describe("when getNewInput is called", function() {

		var Input;

		beforeEach(function() {
			Input = new Puts.getNewInput('test');
		  
		});

		it("getNewInput should return an object with a name", function() {
			expect(Input.name).toEqual('test');
		});

		it("getNewInput should return an object with an id of 'input-0'", function() {
			expect(Input.id).toEqual('input-0');    
		});

		describe("getInputs()", function() {

		  it("should return an array of length 1", function() {
		    expect(Puts.getInputs().length).toEqual(1);
		  });
		});	

		describe("getInput('input-0')", function() {
		    it("should return the Input",function () {
		    	expect(Puts.getInput('input-0')).toEqual(Input);
		    })
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

		describe("getInputs()", function() {

		  it("should return an array of length 2", function() {
		    expect(Puts.getInputs().length).toEqual(2);
		  });
		});	  
	});

});

describe("Output service", function() {
	beforeEach(function() {
		module('Puts');
		inject(function($injector){
			OutPuts = $injector.get('Outputs');
		});
	});

	describe("when getNewOutput is called", function() {

		var Output;

		beforeEach(function() {
			Output = new OutPuts.getNewOutput('test');
		  
		});

		it("getNewOutput should return an object with a name", function() {
			expect(Output.name).toEqual('test');
		});

		it("getNewOutput should return an object with an id of 'Output-0'", function() {
			expect(Output.id).toEqual('Output-0');    
		});

		describe("getOutputs()", function() {

		  it("should return an array of length 1", function() {
		    expect(OutPuts.getOutputs().length).toEqual(1);
		  });
		});

		describe("getOutput('Output-0')", function() {
		    it("should return the Output",function () {
		    	expect(OutPuts.getOutput('Output-0')).toEqual(Output);
		    })
		});  
	  
	});

	describe("when getNewOutput is called twice", function() {

		var Output0,Output1;


		beforeEach(function() {
			Output0 = new OutPuts.getNewOutput('test');
			Output1 = new OutPuts.getNewOutput('test');
		  
		});

		it("getNewOutput should return an object with an id of 'Output-0' and one of 'Output-1", function() {
			expect(Output0.id).toEqual('Output-0');    
			expect(Output1.id).toEqual('Output-1');    

		});

		xdescribe("getOutputs()", function() {

		  it("should return an array of length 2", function() {
		    expect(OutPuts.getOutputs().length).toEqual(2);
		  });
		});	  
	});
});