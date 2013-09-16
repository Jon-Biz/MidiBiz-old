xdescribe("MidiIO config", function() {
  var Midiputs;
  var MidiService;

  beforeEach(function($provider) {

  	//TODO remove this dependency from the test
  	module('Puts');

	module('MidiIO');
	inject(function($injector,$timeout,PutService){
		Midiputs = $injector.get('Midiputs',PutService);
	});
  });

	describe("Midiputs", function() {

		it("should be an object containing an 'input' array and an 'output' array", function() {

//		    expect(Midiputs instanceof Object).toBeTruthy();
		    expect(Midiputs.IO.Inputs instanceof Array).toBeTruthy();
		    expect(Midiputs.IO.Outputs instanceof Array).toBeTruthy();

		   });

		describe("getNewInput()", function() {
		  it("should add an input to the input array", function() {
		    
		    Midiputs.getNewInput({'testinput':'test'});
		    expect(Midiputs.Inputs.length).toEqual(1);
		  });
		});

		describe("getNewOutput()", function() {
		  
		  it("should add an output to the output array", function() {
		    
		    Midiputs.getNewOutput({'testoutput':'test'});
		    expect(Midiputs.Outputs.length).toEqual(1);
		  });
		});

	});
});