describe("Input service", function() {
	beforeEach(function() {
		module('Puts');
		inject(function($injector){
			Puts = $injector.get('Input');
		});
	});

	describe("getInputs()", function() {

	  it("should return an array of length 0", function() {
	    expect(Puts.getInputs().length).toEqual(0);
	  });
	});

	describe("when getNewInput is called", function() {

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
	});

	describe("when getNewInput is called twice", function() {

		beforeEach(function() {
			Input0 = new Puts.getNewInput('test');
			Input1 = new Puts.getNewInput('test');
		  
		});

		it("getNewInput should return an object with a name", function() {
			expect(Input.name).toEqual('test');
		});

		it("getNewInput should return an object with an id of 'input-0' and one of 'input-1", function() {
			expect(Input0.id).toEqual('input-0');    
			expect(Input1.id).toEqual('input-1');    

		});

		describe("getInputs()", function() {

		  it("should return an array of length 1", function() {
		    expect(Puts.getInputs().length).toEqual(2);
		  });
		});	  
	});


});