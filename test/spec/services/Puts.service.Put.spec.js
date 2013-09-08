describe("the Input service", function() {
  beforeEach(function() {
	module('Puts');
   	inject(function($injector){
		Puts = $injector.get('Input');
	});

  });

  it("should return an object with a name", function() {
  	Input = new Puts.getInput('test');
    expect(Input.name).toEqual('test');
  });

  describe("getInputs()", function() {
    
    describe("when an input is created", function() {
      it("should return an array of length 1", function() {

        expect(Puts.getInputs().length).toEqual(0);
      	Puts.getnewInput();
        expect(Puts.getInputs().length).toEqual(1);
      });
    });
  });

});